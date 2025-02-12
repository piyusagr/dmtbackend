import {
  EnumBusinessNature,
  EnumTransferService,
  EnumUserRole,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/* TODO: Create make these actual users with real passwords */
const createUsers = async () => {
  const hasedPassword = await bcrypt.hash('password', 10);

  const USERS: Prisma.UserCreateInput[] = [
    {
      email: 'admin@gmail.com',
      password: hasedPassword,
      firstName: 'Admin',
      lastName: 'Admin',
      role: EnumUserRole.ADMIN,
    },
    {
      email: 'seller@gmail.com',
      password: hasedPassword,
      firstName: 'Seller',
      lastName: 'Seller',
      role: EnumUserRole.SELLER,
      country: 'Sri Lanka',
      isPhoneNumberConfirmed: true,
      isCountryConfirmed: true,
    },
    {
      email: 'buyer@gmail.com',
      password: hasedPassword,
      firstName: 'Buyer',
      lastName: 'Buyer',
      role: EnumUserRole.BUYER,
    },
  ];

  const transacation = await prisma.$transaction(
    USERS.map((user) => prisma.user.create({ data: user })),
  );

  console.log('[USERS] Users created');
  return { admin: transacation[0], seller: transacation[1] };
};

const createEventBoostedCategory = async () => {
  const eventBoostedCategory: Prisma.EventBoostedCategoryCreateManyInput[] = [
    {
      name: 'promoted',
      charge: 8,
    },
    {
      name: 'featured',
      charge: 4,
    },
  ];

  await prisma.$transaction(
    eventBoostedCategory.map((category) =>
      prisma.eventBoostedCategory.create({ data: category }),
    ),
  );
};

const createDefaultPaymentSetting = async () => {
  const data: Prisma.PaymentSettingCreateInput = {
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

// const createAssets = async () => {
//   const ASSETS: Prisma.AssetCreateInput[] = [
//     {
//       mimetype: 'image/png',
//       original_name: 'Terracepatio.webp',
//       file_key: 'user-images/caef45d3-a97d-4b01-a43d-b6fa353f68bd.webp',
//       uid: 'caef45d3-a97d-4b01-a43d-b6fa353f68bd',
//       url: 'https://dmtadventure.s3.amazonaws.com/user-images/caef45d3-a97d-4b01-a43d-b6fa353f68bd.webp',
//     },
//     {
//       mimetype: 'image/png',
//       original_name: 'outside_dinner.webp',
//       file_key: 'user-images/dd20b0e9-416f-4a27-a4de-5b954f40b462.webp',
//       uid: 'dd20b0e9-416f-4a27-a4de-5b954f40b462',
//       url: 'https://dmtadventure.s3.amazonaws.com/user-images/dd20b0e9-416f-4a27-a4de-5b954f40b462.webp',
//     },
//   ];

//   const transaction = await prisma.$transaction(
//     ASSETS.map((asset) => prisma.asset.create({ data: asset })),
//   );

//   return { hotelPhoto: transaction[0], outsideDinner: transaction[1] };
// };

const createPlaces = async (userId: number) => {
  const PLACES: Prisma.PlaceCreateManyInput[] = [
    {
      title: 'The Hilton Grand Hotel',
      city: 'Bundon',
      country: 'Nepal',
      description:
        "Hilton Hotels & Resorts is Hilton's flagship brand and one of the largest hotel brands in the world.",
      postal_code: '1A4912',
      province: 'Mondco',
      street: '1020 W Blvd',
      listing_status: 'ACTIVE',
      subtitle: 'The grand hotel resort',
      user_id: userId,
      latitude: 35.929673,
      longitude: 35.929673,
      businessNature: EnumBusinessNature.BUSINESS,
    },
    {
      title: 'Marriott Hotel & Suites Nepal',
      city: 'Kathmandu',
      country: 'Nepal',
      description:
        'Offering the most powerful portfolio in the industry, our 30 brands and 8,000+ properties across 139 countries',
      postal_code: '1A4912',
      province: 'Mondco',
      street: '4920 Longhill Dr',
      listing_status: 'ACTIVE',
      subtitle: 'A home away from home at the Marriott resorts.',
      user_id: userId,
      latitude: 35.929673,
      longitude: 35.929673,
      businessNature: EnumBusinessNature.BUSINESS,
    },
    {
      title: 'MovenPick Grand View',
      city: 'Kathmandu',
      country: 'Nepal',
      description:
        'Taste Mövenpick anytime, anywhere, with our tempting range of branded food and drinks. From decadent ice cream and the creamiest yogurts to aromatic coffee and ...',
      postal_code: '1A4912',
      province: 'Mondco',
      street: '1119 W View Lane',
      listing_status: 'DRAFT',
      subtitle: 'The best resort nepal has to offer',
      user_id: userId,
      latitude: 35.929673,
      longitude: 35.929673,
      businessNature: EnumBusinessNature.BUSINESS,
    },
  ];

  const places = prisma.$transaction(
    PLACES.map((place) => prisma.place.create({ data: place })),
  );

  return places;
};

const createRooms = async (places: [number, number]) => {
  const ROOMS: Prisma.RoomCreateManyInput[] = [
    {
      place_id: places[1],
      price: 100,
      room_type: 'suite',
      title: '2B Ocean View',
      stock: 10,
      isDiscountAvailable: false,
      transferService: EnumTransferService.INCLUDED,
    },
    {
      place_id: places[0],
      price: 200,
      room_type: 'standard',
      title: '3B JR Suite',
      stock: 5,
      isDiscountAvailable: true,
      discount: 50,
      transferService: EnumTransferService.EXTRA_COST,
      extraAmount: 20,
    },
    {
      place_id: places[1],
      price: 300,
      room_type: 'suite',
      title: 'Luxry Corner Suite',
      stock: 20,
      isDiscountAvailable: false,
      transferService: EnumTransferService.INCLUDED,
    },
  ];

  const rooms = await prisma.room.createMany({
    data: ROOMS,
  });

  return rooms;
};

interface DecRecordData {
  userId: number;
}

const createDevRecords = async (data: DecRecordData) => {
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
