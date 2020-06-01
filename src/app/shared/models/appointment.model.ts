export interface AppointmentModel {
  userId: string,
  clinicId: string,
  doctorId: string,
  field: string,
  date: Date,
  type: string,
  hour: string
}

export interface AppointmentDisplayModel {
  user: { name: string, id: string };
  field: string;
  clinic: { name: string, id: string };
  doctor: { name: string, id: string };
  date: Date;
  hour: string;
  type: string;
}