import React, { useEffect, useState } from "react";
import {
  getAdmissionHistory,
  getPatients,
  getDoctors,
  getBeds,
} from "../api";

function AdmissionHistory() {
  const [history, setHistory] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const historyRes = await getAdmissionHistory();
      const patientsRes = await getPatients();
      const doctorsRes = await getDoctors();
      const bedsRes = await getBeds();

      setHistory(historyRes.data);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setBeds(bedsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Admission History
      </h1>

      <div className="cards">
        <div className="card">
          <h3>Total Discharged</h3>
          <h1>{history.length}</h1>
        </div>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Bed</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>

                <td>
                  {
                    patients.find(
                      (p) => p.id === a.patient_id
                    )?.name
                  }
                </td>

                <td>
                  {
                    doctors.find(
                      (d) => d.id === a.doctor_id
                    )?.name
                  }
                </td>

                <td>
                  {
                    beds.find(
                      (b) => b.id === a.bed_id
                    )?.number
                  }
                </td>

                <td>{a.admission_date}</td>

                <td>{a.discharge_date}</td>

                <td>
                  <span
                    style={{
                      background: "#6b7280",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    Discharged
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmissionHistory;