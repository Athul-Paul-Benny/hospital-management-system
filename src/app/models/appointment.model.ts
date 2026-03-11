export interface Appointment {
  id: number;
  patientId: number;

  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientCity: string;
  patientAddress: string;
  patientGender: string;

  doctorId: number;
  scheduleSlotId: number;
  date: Date;
  time: string;

  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  createdAt: Date;
}
