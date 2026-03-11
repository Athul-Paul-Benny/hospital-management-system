import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css']
})
export class DoctorDashboard implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
  this.appointments = this.appointmentService.getAppointments();
}

  updateAppointmentStatus(appointmentId: number, status: 'confirmed' | 'cancelled'): void {
  this.appointmentService.updateAppointmentStatus(appointmentId, status);
  this.appointments = this.appointmentService.getAppointments();
}

  getStatusClass(status: string): any {
    return {
      'badge bg-warning': status === 'pending',
      'badge bg-success': status === 'confirmed',
      'badge bg-danger': status === 'cancelled',
      'badge bg-info': status === 'completed'
    };
  }
}

