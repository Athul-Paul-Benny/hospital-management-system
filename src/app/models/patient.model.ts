export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;           // Added address field
  city: string;             // Added city field
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: string;  // Added emergency contact
  medicalHistory: MedicalRecord[];
}

export interface MedicalRecord {
  id: number;
  date: Date;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

