export interface User {
  username: string;
  citizen_id: number;
  [info: string | number | symbol]: unknown;
}

export interface Employee {
  firstname: string;
  lastname: string;
  username: string;
}
