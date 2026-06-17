from pydantic import BaseModel


class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    contact: str
    disease: str


class DoctorCreate(BaseModel):
    name: str
    specialization: str
    phone: str


class BedCreate(BaseModel):
    number: str
    ward: str
    status: str


class AdmissionCreate(BaseModel):
    patient_id: int
    doctor_id: int
    bed_id: int
    admission_date: str