import React, { useEffect, useState } from "react";
import {
  getAdmissions,
  createAdmission,
  dischargeAdmission,
  getPatients,
  getDoctors,
  getBeds,
} from "../api";

function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [beds, setBeds] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    ward: "",
    bed_id: "",
    admission_date: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const admissionsRes = await getAdmissions();
    const patientsRes = await getPatients();
    const doctorsRes = await getDoctors();
    const bedsRes = await getBeds();

    setAdmissions(admissionsRes.data);
    setPatients(patientsRes.data);
    setDoctors(doctorsRes.data);
    setBeds(bedsRes.data);
  };

  const addAdmission = async () => {
    if (
      !form.patient_id ||
      !form.doctor_id ||
      !form.bed_id ||
      !form.admission_date
    ) {
      alert("Please fill all fields");
      return;
    }

    await createAdmission({
      patient_id: Number(form.patient_id),
      doctor_id: Number(form.doctor_id),
      bed_id: Number(form.bed_id),
      admission_date: form.admission_date,
    });

    setForm({
      patient_id: "",
      doctor_id: "",
      ward: "",
      bed_id: "",
      admission_date: "",
    });

    setShowModal(false);
    loadData();
  };

  const discharge = async (id) => {
    await dischargeAdmission(id);
    loadData();
  };

  const wards = [
    ...new Set(beds.map((b) => b.ward)),
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 className="page-title">
          Admission Management
        </h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          New Admission
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Admissions</h3>
          <h1>{admissions.length}</h1>
        </div>

        <div className="card">
          <h3>Active</h3>
          <h1>
            {
              admissions.filter(
                (a) => a.status === "Active"
              ).length
            }
          </h1>
        </div>

        <div className="card">
          <h3>Discharged</h3>
          <h1>
            {
              admissions.filter(
                (a) =>
                  a.status === "Discharged"
              ).length
            }
          </h1>
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
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {admissions.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>

                <td>
                  {patients.find(
                    (p) =>
                      p.id === a.patient_id
                  )?.name ||
                    a.patient_id}
                </td>

                <td>
                  {doctors.find(
                    (d) =>
                      d.id === a.doctor_id
                  )?.name ||
                    a.doctor_id}
                </td>

                <td>
                  {beds.find(
                    (b) =>
                      b.id === a.bed_id
                  )?.number ||
                    a.bed_id}
                </td>

                <td>
                  {a.admission_date}
                </td>

                <td>
                  <span
                    style={{
                      background:
                        a.status === "Active"
                          ? "green"
                          : "#6b7280",
                      color: "white",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",
                    }}
                  >
                    {a.status}
                  </span>
                </td>

                <td>
                  {a.status ===
                    "Active" && (
                    <button
                      style={{
                        background:
                          "#ef4444",
                        color: "white",
                        border: "none",
                        padding:
                          "10px 15px",
                        borderRadius:
                          "8px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        discharge(a.id)
                      }
                    >
                      Discharge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "500px",
              background: "white",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              New Admission
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <select
                value={form.patient_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patient_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                value={form.doctor_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    doctor_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((d) => (
                  <option
                    key={d.id}
                    value={d.id}
                  >
                    {d.name}
                  </option>
                ))}
              </select>

              <select
                value={form.ward}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ward: e.target.value,
                    bed_id: "",
                  })
                }
              >
                <option value="">
                  Select Ward
                </option>

                {wards.map(
                  (ward, index) => (
                    <option
                      key={index}
                      value={ward}
                    >
                      {ward}
                    </option>
                  )
                )}
              </select>

              <select
                value={form.bed_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bed_id:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Bed
                </option>

                {beds
                  .filter(
                    (b) =>
                      b.status ===
                        "Available" &&
                      b.ward ===
                        form.ward
                  )
                  .map((b) => (
                    <option
                      key={b.id}
                      value={b.id}
                    >
                      {b.number}
                    </option>
                  ))}
              </select>

              <input
                type="date"
                value={
                  form.admission_date
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    admission_date:
                      e.target.value,
                  })
                }
              />

              <button
                className="primary-btn"
                onClick={addAdmission}
              >
                Admit Patient
              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admissions;