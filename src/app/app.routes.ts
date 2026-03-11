import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DoctorList } from './components/doctor-list/doctor-list';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form';
import { PatientDashboard } from './components/patient-dashboard/patient-dashboard';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'doctors', component: DoctorList },
  { path: 'appointments', component: AppointmentFormComponent },
  { path: 'patient-dashboard', component: PatientDashboard},
  { path: 'doctor-dashboard', component: DoctorDashboard }
]
