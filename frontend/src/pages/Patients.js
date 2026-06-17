import React, { useEffect, useState } from "react";
import {
  getPatients,
  createPatient,
  deletePatient,
} from "../api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    disease: "",
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPatient = async () => {
    try {
      await createPatient(form);

      setForm({
        name: "",
        age: "",
        gender: "Male",
        contact: "",
        disease: "",
      });

      setShowModal(false);
      loadPatients();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.disease?.toLowerCase().includes(search.toLowerCase()) ||
      p.contact?.toLowerCase().includes(search.toLowerCase())
  );

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
          Patient Management
        </h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          Add Patient
        </button>
      </div>

      <div
        className="card"
        style={{ marginBottom: "20px" }}
      >
        <input
          style={{ width: "100%" }}
          placeholder="Search by name, disease or contact..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Disease</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.contact}</td>
                <td>{p.disease}</td>

                <td>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      await deletePatient(p.id);
                      loadPatients();
                    }}
                  >
                    Delete
                  </button>
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
              Add New Patient
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                placeholder="Patient Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
              />

              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value,
                  })
                }
              >
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                placeholder="Contact"
                value={form.contact}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: e.target.value,
                  })
                }
              />

              <input
                placeholder="Disease"
                value={form.disease}
                onChange={(e) =>
                  setForm({
                    ...form,
                    disease: e.target.value,
                  })
                }
              />

              <button
                className="primary-btn"
                onClick={addPatient}
              >
                Save Patient
              </button>

              <button
                style={{
                  padding: "12px",
                  border: "none",
                  background: "#ddd",
                  borderRadius: "8px",
                }}
                onClick={() =>
                  setShowModal(false)
                }
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

export default Patients;