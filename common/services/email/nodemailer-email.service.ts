import {Injectable} from '@nestjs/common';
import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import {ConfigService} from '@nestjs/config';

@Injectable()
export default class NodemailerEmailService {
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
    }

    async sendMail(options: Mail.Options) {
        try {
            return await this.nodemailerTransport.sendMail(options);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}