import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css']
})
export class PatientDashboard implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments();
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.appointmentService.getDoctorById(doctorId);
    return doctor ? doctor.name : 'Unknown';
  }

  getDoctorSpecialization(doctorId: number): string {
    const doctor = this.appointmentService.getDoctorById(doctorId);
    return doctor ? doctor.specialization : 'Unknown';
  }

  getStatusClass(status: string): any {
    return {
      'bg-warning': status === 'pending',
      'bg-success': status === 'confirmed',
      'bg-danger': status === 'cancelled',
      'bg-info': status === 'completed'
    };
  }
}