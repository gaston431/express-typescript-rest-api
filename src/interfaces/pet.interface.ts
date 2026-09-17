export interface MedicalRecord {
  vaccinations: string[];
  weightKg: number;
  microchipId: string | null;
}

export interface Pet {
  id?: number; // Opcional porque MySQL lo genera automáticamente al insertar
  name: string;
  species: string;
  breed: string;
  adopted: boolean;
  age: number;
  intakeDate: string | Date; // Al venir de la DB puede ser string o Date
  adoptionDate?: string | Date | null;
  medicalRecord: MedicalRecord; // Estructura JSON
  photo: string;
}

export type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false',
    minAge?: string,
    maxAge?: string
}
