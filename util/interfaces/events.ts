export interface Event {
  event_id: number;
  event_name: string;
  service_name: string;
  [specificEventDetails: string | number | symbol]: unknown;
}

export interface AboutUsUpdate {
  event_id: number;
  event_name: string;
  service_name: string;
  date: string;
  url: string;
  about_us?: string;
  picture?: string;
}

export interface AboutUsDelete {
  event_id: number;
  event_name: string;
  service_name: string;
  date: string;
}

export interface Donation {
  event_id: number;
  event_name: string;
  service_name: string;
  amount: number;
  citizen_id: number;
}

export interface Kita {
  event_id: number;
  event_name: string;
  service_name: string;
  care_time: number;
  child: { citizen_id: number };
  parent: { citizen_id: number };
}

export interface Post {
  event_id: number;
  event_name: string;
  service: string;
  title: string;
  short_description: string;
  long_description?: string;
  picture_url?: string | null;
  event_on?: string;
}

export interface Refugee {
  event_id: number;
  event_name: string;
  service_name: string;
  date: string;
  refugee: {
    firstname: string;
    lastname: string;
    date_of_birth: string;
    email: string;
  };
}

export interface Family {
  event_id: number;
  event_name: string;
  service_name: string;
  parents: {
    firstname: string;
    lastname: string;
    date_of_birth: string;
    email: string;
  }[];
  children: {
    firstname: string;
    lastname: string;
    date_of_birth: string;
    email: string;
  }[];
}
