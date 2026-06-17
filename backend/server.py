from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Patient, Doctor, Bed, Admission, AdmissionHistory
from schemas import *

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DASHBOARD ----------------

@app.get("/api/dashboard/statistics")
def dashboard(db: Session = Depends(get_db)):

    total_beds = db.query(Bed).count()

    available_beds = db.query(Bed).filter(
        Bed.status == "Available"
    ).count()

    occupied_beds = db.query(Bed).filter(
        Bed.status == "Occupied"
    ).count()

    active_patients = db.query(Admission).filter(
        Admission.status == "Active"
    ).count()

    return {
        "totalBeds": total_beds,
        "availableBeds": available_beds,
        "occupiedBeds": occupied_beds,
        "activePatients": active_patients,
    }

# ---------------- PATIENTS ----------------

@app.get("/api/patients")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@app.post("/api/patients")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    p = Patient(**patient.dict())
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@app.delete("/api/patients/{id}")
def delete_patient(id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).get(id)

    if patient:
        db.delete(patient)
        db.commit()

    return {"message": "deleted"}

# ---------------- DOCTORS ----------------

@app.get("/api/doctors")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()


@app.post("/api/doctors")
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    d = Doctor(**doctor.dict())

    db.add(d)
    db.commit()
    db.refresh(d)

    return d


@app.delete("/api/doctors/{id}")
def delete_doctor(id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).get(id)

    if doctor:
        db.delete(doctor)
        db.commit()

    return {"message": "deleted"}


@app.get("/api/beds")
def get_beds(db: Session = Depends(get_db)):
    return db.query(Bed).all()

# ---------------- BEDS ----------------
@app.get("/api/beds")
def get_beds(db: Session = Depends(get_db)):
    return db.query(Bed).all()
# ---------------- BEDS ----------------

@app.get("/api/beds")
def get_beds(db: Session = Depends(get_db)):
    return db.query(Bed).all()


@app.post("/api/beds")
def create_bed(
    bed: BedCreate,
    db: Session = Depends(get_db)
):
    b = Bed(**bed.dict())

    db.add(b)
    db.commit()
    db.refresh(b)

    return b


@app.put("/api/beds/{id}")
def update_bed(
    id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    bed = db.query(Bed).get(id)

    bed.status = data["status"]

    db.commit()

    return bed

# ---------------- ADMISSIONS ----------------

# ---------------- ADMISSIONS ----------------

@app.get("/api/admissions")
def get_admissions(db: Session = Depends(get_db)):
    return db.query(Admission).all()


@app.post("/api/admissions")
def create_admission(
    admission: AdmissionCreate,
    db: Session = Depends(get_db)
):

    a = Admission(
        patient_id=admission.patient_id,
        doctor_id=admission.doctor_id,
        bed_id=admission.bed_id,
        admission_date=admission.admission_date,
        status="Active"
    )

    bed = db.query(Bed).get(admission.bed_id)

    if bed:
        bed.status = "Occupied"

    db.add(a)
    db.commit()
    db.refresh(a)

    return a


@app.put("/api/admissions/{id}/discharge")
def discharge_patient(
    id: int,
    db: Session = Depends(get_db)
):

    admission = db.query(Admission).get(id)

    if not admission:
        return {"message": "Admission not found"}

    # Save into history table
    history = AdmissionHistory(
        patient_id=admission.patient_id,
        doctor_id=admission.doctor_id,
        bed_id=admission.bed_id,
        admission_date=admission.admission_date,
        discharge_date="Today",
        status="Discharged"
    )

    db.add(history)

    # Free bed
    bed = db.query(Bed).get(admission.bed_id)

    if bed:
        bed.status = "Available"

    # Remove from active admissions
    db.delete(admission)

    db.commit()

    return {"message": "Patient discharged"}


@app.get("/api/admission-history")
def get_admission_history(
    db: Session = Depends(get_db)
):
    return db.query(
        AdmissionHistory
    ).all()


@app.delete("/api/admissions/{id}")
def delete_admission(
    id: int,
    db: Session = Depends(get_db)
):
    admission = db.query(Admission).get(id)

    if admission:
        db.delete(admission)
        db.commit()

    return {"message": "deleted"}