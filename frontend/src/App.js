import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Beds from "./pages/Beds";
import Admissions from "./pages/Admissions";
import AdmissionHistory from "./pages/AdmissionHistory";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>MediCare</h2>

        <button onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setPage("patients")}>
          Patients
        </button>

        <button onClick={() => setPage("doctors")}>
          Doctors
        </button>

        <button onClick={() => setPage("beds")}>
          Beds
        </button>

        <button onClick={() => setPage("admissions")}>
          Admissions
        </button>

        <button onClick={() => setPage("history")}>
          Admission History
        </button>
      </div>

      <div className="content">
        {page === "dashboard" && <Dashboard />}
        {page === "patients" && <Patients />}
        {page === "doctors" && <Doctors />}
        {page === "beds" && <Beds />}
        {page === "admissions" && <Admissions />}
        {page === "history" && <AdmissionHistory />}
      </div>
    </div>
  );
}

export default App;