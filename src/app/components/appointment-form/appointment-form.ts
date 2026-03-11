import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor, ScheduleSlot } from '../../models/doctor.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: Doctor[] = [];
  availableSlots: ScheduleSlot[] = [];
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      patientPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      patientEmail: ['', [Validators.required, Validators.email]],
      patientAddress: ['', Validators.required],
      patientCity: ['', Validators.required],
      patientGender: ['', Validators.required],
      doctorId: ['', Validators.required],
      scheduleSlotId: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.doctors = this.appointmentService.getDoctors();
  }

  onDoctorChange(): void {
    const doctorId = Number(this.appointmentForm.get('doctorId')?.value);
    if (doctorId) {
      this.availableSlots = this.appointmentService.getAvailableSlots(doctorId);
    } else {
      this.availableSlots = [];
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;

      const selectedSlot = this.availableSlots.find(
        slot => slot.id === Number(formValue.scheduleSlotId)
      );

      if (selectedSlot) {
        const appointmentData = {
          id: Date.now(),
          patientId: Date.now(), // simple unique patient id for now
          patientName: formValue.patientName,
          patientPhone: formValue.patientPhone,
          patientEmail: formValue.patientEmail,
          patientAddress: formValue.patientAddress,
          patientCity: formValue.patientCity,
          patientGender: formValue.patientGender,
          doctorId: Number(formValue.doctorId),
          scheduleSlotId: Number(formValue.scheduleSlotId),
          date: selectedSlot.date,
          time: selectedSlot.time,
          status: 'pending' as const,
          reason: formValue.reason,
          createdAt: new Date()
        };

        this.appointmentService.bookAppointment(appointmentData);

        this.showSuccessMessage = true;
        this.appointmentForm.reset();
        this.availableSlots = [];

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 4000);
      }
    }
  }
}



