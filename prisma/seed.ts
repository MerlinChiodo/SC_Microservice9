import { PrismaClient, Prisma } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

const file: Buffer = readFileSync('prisma/mock_data/mock_data.pdf');

const addresseData: Prisma.AddresseCreateInput[] = [
  {
    house_number: 5,
    street: 'Am Waldweg',
    city_code: 33231,
  },
  {
    house_number: 3,
    street: 'Am Waldweg',
    city_code: 33233,
  },
  {
    house_number: 9,
    street: 'Am Waldweg',
    city_code: 33231,
  },
];

const housingData: Prisma.HousingUncheckedCreateInput[] = [
  {
    housing_type: 'C117',
    number_of_people: 2,
    squaremeter: 50.0,
    shared_bathrooom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 1,
  },
  {
    housing_type: 'A114',
    number_of_people: 4,
    squaremeter: 100.0,
    shared_bathrooom: true,
    rooms: 4,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 2,
  },
  {
    housing_type: 'X99',
    number_of_people: 1,
    squaremeter: 20.0,
    shared_bathrooom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 3,
  },
  {
    housing_type: 'X98',
    number_of_people: 1,
    squaremeter: 20.0,
    shared_bathrooom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 3,
  },
  {
    housing_type: 'X86',
    number_of_people: 1,
    squaremeter: 20.0,
    shared_bathrooom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 3,
  },
  {
    housing_type: 'X87',
    number_of_people: 1,
    squaremeter: 20.0,
    shared_bathrooom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    addresse_id: 3,
  },
];

const refugeeData: Prisma.RefugeeUncheckedCreateInput[] = [
  {
    firstname: 'Myron',
    lastname: 'Corder',
    email: 'mcorder0@hp.com',
    nationality: 'Spain',
    language: 'Romanian',
    document: file,
    qr_code: '30faa907c26e43e05b85b7ab6ff73c94',
    phone: '410-936-6708',
    housing_id: 1,
  },
  {
    firstname: 'Garik',
    lastname: 'Buffin',
    email: 'gbuffin1@ask.com',
    nationality: 'United States',
    language: 'Luxembourgish',
    document: file,
    qr_code: '8f8ac43b04d7080b6644d6ccb4f9ca1d',
    phone: '856-719-1398',
    housing_id: 1,
  },
  {
    firstname: 'Arte',
    lastname: 'Arpino',
    email: 'aarpino2@shop-pro.jp',
    nationality: 'Portugal',
    language: 'Telugu',
    document: file,
    qr_code: '2593ebb5c8d410b1713c31c1cc4f316a',
    phone: '568-273-3445',
    housing_id: 2,
  },
  {
    firstname: 'Laureen',
    lastname: 'Youdell',
    email: 'lyoudell3@wix.com',
    nationality: 'Portugal',
    language: 'Pashto',
    document: file,
    qr_code: '7f277cf8f9fc6b6cd0217e9070ff756f',
    phone: '624-866-2258',
    housing_id: 2,
  },
  {
    firstname: 'Anna-diana',
    lastname: 'Truitt',
    email: 'atruitt4@elegantthemes.com',
    nationality: 'Sweden',
    language: 'Bengali',
    document: file,
    qr_code: '03c44d5cd5822f776ef0b7624b4721e0',
    phone: '904-160-5957',
    housing_id: 2,
  },
  {
    firstname: 'Gaylord',
    lastname: 'Goldstone',
    email: 'ggoldstone5@github.com',
    nationality: 'Sweden',
    language: 'Icelandic',
    document: file,
    qr_code: '471f8727876a2f154d66a360ef1f7b27',
    phone: '814-942-7392',
    housing_id: 2,
  },
  {
    firstname: 'Vale',
    lastname: 'Falkus',
    email: 'vfalkus6@yellowpages.com',
    nationality: 'Portugal',
    language: 'Sotho',
    document: file,
    qr_code: '57c663ff94f0bf3407e001d661d40fb8',
    phone: '594-923-2637',
    housing_id: 3,
  },
  {
    firstname: 'Nerti',
    lastname: 'Hasely',
    email: 'nhasely7@dot.gov',
    nationality: 'United States',
    language: 'Dzongkha',
    document: file,
    qr_code: 'c2c46e88f13db82f0ccdc7522bb18c0a',
    phone: '801-490-4941',
    housing_id: 4,
  },
  {
    firstname: 'Jonathan',
    lastname: 'Chalfant',
    email: 'jchalfant8@nature.com',
    nationality: 'United States',
    language: 'Moldovan',
    document: file,
    qr_code: '9bc7386b8e951386298115668b9ef498',
    phone: '415-295-4845',
    housing_id: 5,
  },
  {
    firstname: 'Ricoriki',
    lastname: 'Leyninye',
    email: 'rleyninye9@bbc.co.uk',
    nationality: 'Finland',
    language: 'Swahili',
    document: file,
    qr_code: '9256d1f2c8f8f4a73b7ca4fc6f1834f5',
    phone: '973-685-9561',
    housing_id: 6,
  },
];

const citizenData: Prisma.CitizenCreateInput[] = [
  { id: 'citizen_id_423948' },
  { id: 'citizen_id_222928' },
  { id: 'citizen_id_128848' },
  { id: 'citizen_id_721228' },
  { id: 'citizen_id_822927' },
  { id: 'citizen_id_323824' },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const a of addresseData) {
    const addresse = await prisma.addresse.create({
      data: a,
    });
    console.log(`Created addresse with id: ${addresse.id}`);
  }
  for (const h of housingData) {
    const housing = await prisma.housing.create({
      data: h,
    });
    console.log(`Created housing with id: ${housing.id}`);
  }
  for (const r of refugeeData) {
    const refugee = await prisma.refugee.create({
      data: r,
    });
    console.log(`Created refugee with id: ${refugee.id}`);
  }
  for (const c of citizenData) {
    const citizen = await prisma.citizen.create({
      data: c,
    });
    console.log(`Created citizen with id: ${citizen.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
