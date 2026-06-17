from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    contact = Column(String)
    disease = Column(String)


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialization = Column(String)
    phone = Column(String)


class Bed(Base):
    __tablename__ = "beds"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String)
    ward = Column(String)
    status = Column(String)


class Admission(Base):
    __tablename__ = "admissions"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    bed_id = Column(Integer, ForeignKey("beds.id"))

    admission_date = Column(String)
    discharge_date = Column(String, nullable=True)

    status = Column(String, default="Active")


class AdmissionHistory(Base):
    __tablename__ = "admission_history"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer)
    doctor_id = Column(Integer)
    bed_id = Column(Integer)

    admission_date = Column(String)
    discharge_date = Column(String)

    status = Column(String, default="Discharged")