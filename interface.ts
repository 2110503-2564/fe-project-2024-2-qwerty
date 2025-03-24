interface User {
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    createdAt: Date,
    __v: number
  }
  
  interface UserJson {
    success: boolean,
    data: User
  }

  interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }

interface AppointmentItem {
  _id: string,
  startTime: Date,
  endTime: Date,
  user: string,
  company: CompanyItem
  createdAt: Date
  __v: number
}

interface CompanyItem {
  _id: string,
  name: string,
  address: string,
  website: string,
  description: string,
  tel: string,
  __v: number,
  appointment: AppointmentItem[]
}

interface CompanyJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CompanyItem[]
}

interface AppointmentJson {
  success: boolean,
  count: number,
  data: AppointmentItem[]
}