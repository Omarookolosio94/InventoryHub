export type StoreObj = {
  employer: EmployerObj;
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string | null;
  email: string;
  gallery: string | null;
  openingTime: string | null;
  closingTime: string | null;
  openingDays: string | null;
  isActive: boolean;
  isWareHouse: boolean;
  addedBy: string;
  updatedBy: string;
  dateAdded: string;
  lastUpdated: string;
  ownerId: string;
};

export type EmployerObj = {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  about: string | null;
};

const storeDataSample: StoreObj[] = [
  {
    employer: {
      id: "85adf4d4-b200-4b7e-5fbd-08dbb0202956",
      name: "Matrix Web Inc",
      email: "omarookolosio94@gmail.com",
      logo: null,
      about: null,
    },
    id: "83effdb0-e731-4faa-43fb-08dbb020e089",
    name: "Matrix Software- Warri oil City",
    description: "",
    address: "Warri Delta",
    phone: null,
    email: "omarookolosio94@hotmail.com",
    gallery: null,
    openingTime: null,
    closingTime: null,
    openingDays: null,
    isActive: true,
    isWareHouse: false,
    addedBy: "Matrix Web Inc - CEO",
    updatedBy: "Matrix Web Inc CEO",
    dateAdded: "2023-09-08T05:05:45.5560104",
    lastUpdated: "2023-09-08T05:08:08.2353164",
    ownerId: "85adf4d4-b200-4b7e-5fbd-08dbb0202956",
  },
  {
    employer: {
      id: "85adf4d4-b200-4b7e-5fbd-08dbb0202956",
      name: "Matrix Web Inc",
      email: "omarookolosio94@gmail.com",
      logo: null,
      about: null,
    },
    id: "a8ff66bb-63cb-4450-a730-08dbb0203ee3",
    name: "Matrix Software- Suru",
    description: "",
    address: "Surulere Lagos",
    phone: "2347019069486",
    email: "omarookolosio94@mail.com",
    gallery: null,
    openingTime: null,
    closingTime: null,
    openingDays: null,
    isActive: false,
    isWareHouse: false,
    addedBy: null,
    updatedBy: "Matrix Web Inc (CEO)",
    dateAdded: "2023-09-08T05:01:14.358502",
    lastUpdated: "2023-09-08T21:31:10.8185674",
    ownerId: "85adf4d4-b200-4b7e-5fbd-08dbb0202956",
  },
];

export default storeDataSample;
