export interface DoctorModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  fields: string[];
  clinicIds: string[];
  profileImage: string;
  phone: string;
}

export interface DoctorRegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  clinicId: string;
  password: string;
  field: string;
}