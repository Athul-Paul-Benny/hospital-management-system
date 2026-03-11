import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.css']
})
export class DoctorList implements OnInit {

  doctors: Doctor[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.doctors = this.appointmentService.getDoctors();
  }

  getAvailabilityClass(isAvailable: boolean) {
    return {
      'text-success': isAvailable,
      'text-danger': !isAvailable
    };
  }
}

