import { Injectable } from '@angular/core';
import { Doctor, ScheduleSlot } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      email: 'sarah.johnson@hospital.com',
      phone: '555-0101',
      isAvailable: true,
      schedule: this.generateSchedule(1)
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Neurology',
      email: 'michael.chen@hospital.com',
      phone: '555-0102',
      isAvailable: true,
      schedule: this.generateSchedule(2)
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics',
      email: 'emily.davis@hospital.com',
      phone: '555-0103',
      isAvailable: true,
      schedule: this.generateSchedule(3)
    }
  ];

  private appointments: Appointment[] = [];

  constructor() {}

  private generateSchedule(doctorId: number): ScheduleSlot[] {
    return [
      {
        id: doctorId * 100 + 1,
        doctorId: doctorId,
        date: new Date('2026-03-10'),
        time: '10:00 AM',
        isBooked: false
      },
      {
        id: doctorId * 100 + 2,
        doctorId: doctorId,
        date: new Date('2026-03-10'),
        time: '11:00 AM',
        isBooked: false
      },
      {
        id: doctorId * 100 + 3,
        doctorId: doctorId,
        date: new Date('2026-03-11'),
        time: '02:00 PM',
        isBooked: false
      }
    ];
  }

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getAvailableSlots(doctorId: number): ScheduleSlot[] {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? doctor.schedule.filter(slot => !slot.isBooked) : [];
  }

  bookAppointment(appointment: Appointment): void {
  this.appointments.push(appointment);

  const doctor = this.doctors.find(d => d.id === appointment.doctorId);
  if (doctor) {
    const slot = doctor.schedule.find(s => s.id === appointment.scheduleSlotId);
    if (slot) {
      slot.isBooked = true;
    }
  }

  console.log('All appointments:', this.appointments);
}
  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getAppointmentsByDoctorId(doctorId: number): Appointment[] {
    return this.appointments.filter(app => app.doctorId === doctorId);
  }

  getAppointmentsByPatientEmail(email: string): Appointment[] {
    return this.appointments.filter(app => app.patientEmail === email);
  }

  updateAppointmentStatus(appointmentId: number, status: 'confirmed' | 'cancelled'): void {
    const appointment = this.appointments.find(app => app.id === appointmentId);
    if (appointment) {
      appointment.status = status;
    }
  }

  getDoctorById(id: number): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }
}
