import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-project-7lph.onrender.com/api",
});

// Dashboard
export const getDashboardStatistics = () =>
  API.get("/dashboard/statistics");

// Patients
export const getPatients = () =>
  API.get("/patients");

export const createPatient = (data) =>
  API.post("/patients", data);

export const deletePatient = (id) =>
  API.delete(`/patients/${id}`);

// Doctors
export const getDoctors = () =>
  API.get("/doctors");

export const createDoctor = (data) =>
  API.post("/doctors", data);

export const deleteDoctor = (id) =>
  API.delete(`/doctors/${id}`);

// Beds
export const getBeds = () =>
  API.get("/beds");

export const createBed = (data) =>
  API.post("/beds", data);

export const updateBed = (id, data) =>
  API.put(`/beds/${id}`, data);

// Admissions
export const getAdmissions = () =>
  API.get("/admissions");

export const createAdmission = (data) =>
  API.post("/admissions", data);

export const dischargeAdmission = (id) =>
  API.put(`/admissions/${id}/discharge`);

export const deleteAdmission = (id) =>
  API.delete(`/admissions/${id}`);

// Admission History
export const getAdmissionHistory = () =>
  API.get("/admission-history");