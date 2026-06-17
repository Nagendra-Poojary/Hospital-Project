import React, { useEffect, useState } from "react";
import {
  getDoctors,
  createDoctor,
  deleteDoctor,
} from "../api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addDoctor = async () => {
    try {
      await createDoctor(form);

      setForm({
        name: "",
        specialization: "",
        phone: "",
      });

      setShowModal(false);
      loadDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      d.phone?.includes(search)
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
          Doctor Management
        </h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          Add Doctor
        </button>
      </div>

      <div
        className="card"
        style={{ marginBottom: "25px" }}
      >
        <input
          style={{ width: "100%" }}
          placeholder="Search by name, specialization or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="card"
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#e5e7eb",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
              }}
            >
              👨‍⚕️
            </div>

            <h2>{doctor.name}</h2>

            <div
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "6px 14px",
                background: "#dcfce7",
                color: "#166534",
                borderRadius: "20px",
              }}
            >
              {doctor.specialization}
            </div>

            <p
              style={{
                marginTop: "15px",
                color: "#666",
              }}
            >
              {doctor.phone}
            </p>

            <button
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#ef4444",
                color: "white",
                cursor: "pointer",
              }}
              onClick={async () => {
                await deleteDoctor(doctor.id);
                loadDoctors();
              }}
            >
              Remove Doctor
            </button>
          </div>
        ))}
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
              Add New Doctor
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Specialization"
                value={form.specialization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialization:
                      e.target.value,
                  })
                }
              />

              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

              <button
                className="primary-btn"
                onClick={addDoctor}
              >
                Save Doctor
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

export default Doctors;