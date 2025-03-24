interface VenueItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
  interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: VenueItem[]
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