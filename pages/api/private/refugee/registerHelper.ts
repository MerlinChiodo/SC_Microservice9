import { prisma } from '../../../../lib/prisma';
import { registerRefugeeFamilyEventHandler } from './eventFamily';
import { RegisterRefugeeFamily } from './jsonSchema';

export function generateQRCode() {
  // TODO
  return Math.random().toString(36).substr(2, 10); //random string
}

export function assignHousing() {
  // TODO
  return 1;
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
  const housing_id = assignHousing();
  rf.parents.forEach((p, i) => {
    const qr_code = generateQRCode();
    const refugee = prisma.refugee
      .create({
        data: { ...p, qr_code: qr_code, housing_id: housing_id },
      })
      .catch((err) => new Error(err));
    parentsList.push(refugee);
  });
  rf.children.forEach((c, i) => {
    const qr_code = generateQRCode();
    const child = prisma.refugee
      .create({
        data: { ...c, qr_code: qr_code, housing_id: housing_id },
      })
      .catch((err) => new Error(err));
    childrenList.push(child);
  });
  registerRefugeeFamilyEventHandler(event).catch((err) => new Error(err));
  return { parents: parentsList, children: childrenList };
}
