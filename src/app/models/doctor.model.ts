export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  schedule: ScheduleSlot[];
  isAvailable: boolean;
}

export interface ScheduleSlot {
  id: number;
  doctorId: number;
  date: Date;
  time: string;
  isBooked: boolean;
}
