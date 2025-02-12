export type CapturedPayment = {
    id: string;
    status: string;
    payer: {
        name: {
            given_name: string;
            surname: string;
        };
        email_address: string;
        payer_id: string;
        address: {
            country_code: string;
        };
    };
};
