"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const createUsers = async () => {
    const hasedPassword = await bcrypt.hash('password', 10);
    const USERS = [
        {
            email: 'admin@gmail.com',
            password: hasedPassword,
            firstName: 'Admin',
            lastName: 'Admin',
            role: client_1.EnumUserRole.ADMIN,
        },
        {
            email: 'seller@gmail.com',
            password: hasedPassword,
            firstName: 'Seller',
            lastName: 'Seller',
            role: client_1.EnumUserRole.SELLER,
            country: 'Sri Lanka',
            isPhoneNumberConfirmed: true,
            isCountryConfirmed: true,
        },
        {
            email: 'buyer@gmail.com',
            password: hasedPassword,
            firstName: 'Buyer',
            lastName: 'Buyer',
            role: client_1.EnumUserRole.BUYER,
        },
    ];
    const transacation = await prisma.$transaction(USERS.map((user) => prisma.user.create({ data: user })));
    console.log('[USERS] Users created');
    return { admin: transacation[0], seller: transacation[1] };
};
const createEventBoostedCategory = async () => {
    const eventBoostedCategory = [
        {
            name: 'promoted',
            charge: 8,
        },
        {
            name: 'featured',
            charge: 4,
        },
    ];
    await prisma.$transaction(eventBoostedCategory.map((category) => prisma.eventBoostedCategory.create({ data: category })));
};
const createDefaultPaymentSetting = async () => {
    const data = {
        platformCharge: 8,
        platformCurrency: 'USD',
        platformCountryCode: 'ID',
        currencyFixRate: 0.3,
        domesticTransactionFee: 3.4,
        internationalTransactionFee: 4.4,
        payoutDomesticFee: 2,
        payoutInternationalFee: 2,
    };
    await prisma.paymentSetting.create({ data });
};
const createPlaces = async (userId) => {
    const PLACES = [
        {
            title: 'The Hilton Grand Hotel',
            city: 'Bundon',
            country: 'Nepal',
            description: "Hilton Hotels & Resorts is Hilton's flagship brand and one of the largest hotel brands in the world.",
            postal_code: '1A4912',
            province: 'Mondco',
            street: '1020 W Blvd',
            listing_status: 'ACTIVE',
            subtitle: 'The grand hotel resort',
            user_id: userId,
            latitude: 35.929673,
            longitude: 35.929673,
            businessNature: client_1.EnumBusinessNature.BUSINESS,
        },
        {
            title: 'Marriott Hotel & Suites Nepal',
            city: 'Kathmandu',
            country: 'Nepal',
            description: 'Offering the most powerful portfolio in the industry, our 30 brands and 8,000+ properties across 139 countries',
            postal_code: '1A4912',
            province: 'Mondco',
            street: '4920 Longhill Dr',
            listing_status: 'ACTIVE',
            subtitle: 'A home away from home at the Marriott resorts.',
            user_id: userId,
            latitude: 35.929673,
            longitude: 35.929673,
            businessNature: client_1.EnumBusinessNature.BUSINESS,
        },
        {
            title: 'MovenPick Grand View',
            city: 'Kathmandu',
            country: 'Nepal',
            description: 'Taste Mövenpick anytime, anywhere, with our tempting range of branded food and drinks. From decadent ice cream and the creamiest yogurts to aromatic coffee and ...',
            postal_code: '1A4912',
            province: 'Mondco',
            street: '1119 W View Lane',
            listing_status: 'DRAFT',
            subtitle: 'The best resort nepal has to offer',
            user_id: userId,
            latitude: 35.929673,
            longitude: 35.929673,
            businessNature: client_1.EnumBusinessNature.BUSINESS,
        },
    ];
    const places = prisma.$transaction(PLACES.map((place) => prisma.place.create({ data: place })));
    return places;
};
const createRooms = async (places) => {
    const ROOMS = [
        {
            place_id: places[1],
            price: 100,
            room_type: 'suite',
            title: '2B Ocean View',
            stock: 10,
            isDiscountAvailable: false,
            transferService: client_1.EnumTransferService.INCLUDED,
        },
        {
            place_id: places[0],
            price: 200,
            room_type: 'standard',
            title: '3B JR Suite',
            stock: 5,
            isDiscountAvailable: true,
            discount: 50,
            transferService: client_1.EnumTransferService.EXTRA_COST,
            extraAmount: 20,
        },
        {
            place_id: places[1],
            price: 300,
            room_type: 'suite',
            title: 'Luxry Corner Suite',
            stock: 20,
            isDiscountAvailable: false,
            transferService: client_1.EnumTransferService.INCLUDED,
        },
    ];
    const rooms = await prisma.room.createMany({
        data: ROOMS,
    });
    return rooms;
};
const createDevRecords = async (data) => {
    const [place1, place2] = await createPlaces(data.userId);
    await createRooms([place1.id, place2.id]);
};
const main = async () => {
    const { seller } = await createUsers();
    await createEventBoostedCategory();
    await createDefaultPaymentSetting();
    createDevRecords({ userId: seller.id });
};
main();
//# sourceMappingURL=seed.js.map