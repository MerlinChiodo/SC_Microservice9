export interface Donation {
  amount: number;
  citizen_id?: number;
}

export interface Housing {
  housing: {
    housing_type: string;
    people_assigned?: number;
    people_limit: number;
    size: number;
    shared_bathroom?: boolean;
    rooms?: number;
    rent: number;
    info?: string;
    citizen_id: number;
  };
  address: {
    house_number: number;
    street: string;
    city_code: number;
  };
}

export interface Kita {
  care_time: number;
  child: { citizen_id: number; refugee_id: number };
  parent: { citizen_id: number; refugee_id: number };
}

export interface Post {
  title: string;
  short_description: string;
  long_description?: string;
  picture_url?: string;
  employee_id: number;
}

export interface Refugee {
  firstname: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  family_tag?: string;
  phone?: string;
  nationality?: string;
  document?: Buffer;
}
