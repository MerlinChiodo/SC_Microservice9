import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../../../lib/prisma';
import { registerRefugeeFamilyEventHandler } from './eventFamily';
import { RegisterRefugeeFamily } from './jsonSchema';

export function generateQRCode(firstname: string, lastname: string) {
  return firstname + '.' + lastname + '.' + uuidv4();
}

export function assignHousing(amount: number) {
  return new Promise<number>(async (resolve, reject) => {
    let housing: any =
      await prisma.$queryRaw`SELECT id FROM Housing WHERE ((people_limit - people_assigned) = ${amount}) LIMIT 1`;
    if (housing.length < 1) {
      housing =
        await prisma.$queryRaw`SELECT id FROM Housing WHERE (people_limit - people_assigned) = ${
          amount + 1
        } LIMIT 1`;
    }

    if (housing.length < 1) {
      housing =
        await prisma.$queryRaw`SELECT id FROM Housing WHERE (people_limit - people_assigned) = ${
          amount + 2
        } LIMIT 1`;
    }

    if (housing.length < 1) {
      housing =
        await prisma.$queryRaw`SELECT id FROM Housing WHERE (people_limit - people_assigned) >= ${amount} LIMIT 1`;
    }

    if (housing.length < 1) {
      reject('No housing available');
    } else {
      resolve(housing[0].id);
    }
  });
}

export function registerFamily(rf: RegisterRefugeeFamily) {
  const event = {
    event_id: 9001,
    event_name: 'Register New Refugee Family',
    service_name: 'integration',
    parents: rf.parents,
    children: rf.children,
  };
  const parentsList: any = [];
  const childrenList: any = [];
  let housing_id: number;
  assignHousing(rf.parents.length + rf.children.length)
    .then((id) => (housing_id = id))
    .catch((err) => new Error(err));
  rf.parents.forEach(async (p, i) => {
    const qr_code = generateQRCode(p.firstname, p.lastname);
    const refugee = await prisma.refugee
      .create({
        data: { ...p, qr_code: qr_code, housing_id: housing_id },
      })
      .catch((err) => new Error(err));
    parentsList.push(refugee);
  });
  rf.children.forEach(async (c, i) => {
    const qr_code = generateQRCode(c.firstname, c.lastname);
    const child = await prisma.refugee
      .create({
        data: { ...c, qr_code: qr_code, housing_id: housing_id },
      })
      .catch((err) => new Error(err));
    childrenList.push(child);
  });
  registerRefugeeFamilyEventHandler(event).catch((err) => new Error(err));
  return { parents: parentsList, children: childrenList };
}
