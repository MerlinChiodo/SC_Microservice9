import { PrismaClient, Prisma, Post } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

const file: Buffer = readFileSync('prisma/mock_data/mock_data.pdf');

const addressData: Prisma.AddressCreateInput[] = [
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
    people_limit: 8,
    size: 200.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 1,
  },
  {
    housing_type: 'A114',
    people_limit: 4,
    size: 100.0,
    shared_bathroom: true,
    rooms: 4,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 2,
  },
  {
    housing_type: 'X99',
    people_limit: 1,
    size: 20.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 3,
  },
  {
    housing_type: 'X98',
    people_limit: 1,
    size: 20.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 3,
  },
  {
    housing_type: 'X86',
    people_limit: 1,
    size: 20.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 3,
  },
  {
    housing_type: 'X87',
    people_limit: 1,
    size: 20.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 3,
  },
  {
    housing_type: 'X117',
    people_limit: 1,
    size: 20.0,
    shared_bathroom: false,
    rooms: 1,
    rent: 0.0,
    info: 'Public Apartment from the city center',
    address_id: 3,
  },
];

const refugeeData: Prisma.RefugeeUncheckedCreateInput[] = [
  {
    firstname: 'Myron',
    lastname: 'Corder',
    email: 'mcorder0@hp.com',
    date_of_birth: new Date('1962-05-01'),
    nationality: 'Spain',
    qr_code: '123',
    document: file,
    phone: '410-936-6708',
  },
  {
    firstname: 'Garik',
    lastname: 'Buffin',
    email: 'gbuffin1@ask.com',
    date_of_birth: new Date('1963-08-01'),
    nationality: 'United States',
    document: file,
    phone: '856-719-1398',
  },
  {
    firstname: 'Arte',
    lastname: 'Arpino',
    email: 'aarpino2@shop-pro.jp',
    date_of_birth: new Date('1989-05-01'),
    nationality: 'Portugal',
    document: file,
    phone: '568-273-3445',
  },
  {
    firstname: 'Laureen',
    lastname: 'Youdell',
    email: 'lyoudell3@wix.com',
    date_of_birth: new Date('1977-05-01'),
    nationality: 'Portugal',
    document: file,
    phone: '624-866-2258',
  },
  {
    firstname: 'Anna-diana',
    lastname: 'Truitt',
    email: 'atruitt4@elegantthemes.com',
    date_of_birth: new Date('1978-05-01'),
    nationality: 'Sweden',
    document: file,
    phone: '904-160-5957',
  },
  {
    firstname: 'Gaylord',
    lastname: 'Goldstone',
    email: 'ggoldstone5@github.com',
    date_of_birth: new Date('1992-05-01'),
    nationality: 'Sweden',
    document: file,
    phone: '814-942-7392',
  },
  {
    firstname: 'Vale',
    lastname: 'Falkus',
    email: 'vfalkus6@yellowpages.com',
    date_of_birth: new Date('1974-05-01'),
    nationality: 'Portugal',
    document: file,
    phone: '594-923-2637',
  },
  {
    firstname: 'Nerti',
    lastname: 'Hasely',
    email: 'nhasely7@dot.gov',
    date_of_birth: new Date('1990-05-01'),
    nationality: 'United States',
    document: file,
    phone: '801-490-4941',
  },
  {
    firstname: 'Jonathan',
    lastname: 'Chalfant',
    email: 'jchalfant8@nature.com',
    date_of_birth: new Date('1982-10-01'),
    nationality: 'United States',
    document: file,
    phone: '415-295-4845',
  },
  {
    firstname: 'Ricoriki',
    lastname: 'Leyninye',
    date_of_birth: new Date('1988-05-01'),
    email: 'rleyninye9@bbc.co.uk',
    nationality: 'Finland',
    document: file,
    phone: '973-685-9561',
  },
];

const employeeData: Prisma.EmployeeUncheckedCreateInput[] = [
  {
    id: 1,
    firstname: 'Laura',
    lastname: 'Schröder',
    email: 'laura@afi.de',
    phone: '0251 999118',
    room: 'C118',
    avatar: '/avatar/laura_schroeder.jpg',
  },
  {
    id: 2,
    firstname: 'Stephanie',
    lastname: 'Dietrich',
    email: 'stephanie@afi.de',
    phone: '0251 999119',
    room: 'C119',
    avatar: '/avatar/stephanie_dietrich.jpg',
  },
  {
    id: 3,
    firstname: 'Celine',
    lastname: 'Adler',
    email: 'celine@afi.de',
    phone: '0251 9991200',
    room: 'C120',
    avatar: '/avatar/celine_adler.jpg',
  },
  {
    id: 4,
    firstname: 'Lukas',
    lastname: 'Frei',
    email: 'lukas@afi.de',
    phone: '0251 9991202',
    room: 'C120',
    avatar: '/avatar/lukas_frei.jpg',
  },
  {
    id: 5,
    firstname: 'Daniel',
    lastname: 'Neumann',
    email: 'daniel@afi.de',
    phone: '0251 9991202',
    room: 'C120',
    avatar: '/avatar/daniel_neumann.jpg',
  },
  {
    id: 6,
    firstname: 'Steffen',
    lastname: 'Schäfer',
    email: 'steffen@afi.de',
    phone: '0251 999115',
    room: 'C115',
    avatar: '/avatar/steffen_schaefer.jpg',
  },
  {
    id: 7,
    firstname: 'Jooske',
    lastname: 'Burgman',
    email: 'jooske@afi.de',
    phone: '0251 9991210',
    room: 'C121',
    avatar: '/avatar/jooske_burgman.jpg',
  },
  {
    id: 8,
    firstname: 'Sarah',
    lastname: 'Sommer',
    email: 'sarah@afi.de',
    phone: '0251 9991211',
    room: 'C121',
    avatar: '/avatar/sarah_sommer.jpg',
  },
  {
    id: 9,
    firstname: 'Christin',
    lastname: 'Fenstermacher',
    email: 'chirstin@afi.de',
    phone: '0251 9991212',
    room: 'C121',
    avatar: '/avatar/christin_fenstermacher.jpg',
  },
  {
    id: 10,
    firstname: 'Caro',
    lastname: 'Fuchs',
    email: 'caro@afi.de',
    phone: '0251 999122',
    room: 'C122',
    avatar: '/avatar/caro_fuchs.jpg',
  },
];

const postData: Prisma.PostUncheckedCreateInput[] = [
  {
    title: 'blog post 1010',
    short_description: 'short description',
    long_description: 'long description',
    employee_id: 1,
  },
  {
    title: 'some say',
    short_description: 'short description',
    long_description: 'long description',
    employee_id: 1,
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    short_description: 'short description',
    long_description: 'long description',
    employee_id: 2,
  },
  {
    title: 'Lorem next js 101',
    short_description: 'short description',
    long_description: 'long description',
    employee_id: 1,
  }
]

async function main() {
  console.log(`Start seeding ...`);
  for (const a of addressData) {
    const address = await prisma.address.create({
      data: a,
    });
    console.log(`Created addresse with id: ${address.id}`);
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
  for (const e of employeeData) {
    const refugee = await prisma.employee.create({
      data: e,
    });
    console.log(`Created employee with id: ${refugee.id}`);
  }
  for (const p of postData) {
    const post = await prisma.post.create({
      data: p,
    });
    console.log(`Created post with id: ${post.id}`);
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
