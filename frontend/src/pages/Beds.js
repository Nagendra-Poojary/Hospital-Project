import React, { useEffect, useState } from "react";
import {
  getBeds,
  createBed,
  updateBed,
} from "../api";

function Beds() {
  const [beds, setBeds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    number: "",
    ward: "",
    status: "Available",
  });

  useEffect(() => {
    loadBeds();
  }, []);

  const loadBeds = async () => {
    const res = await getBeds();
    setBeds(res.data);
  };

  const addBed = async () => {
    await createBed(form);

    setForm({
      number: "",
      ward: "",
      status: "Available",
    });

    setShowModal(false);
    loadBeds();
  };

  const changeStatus = async (bed) => {
    const newStatus =
      bed.status === "Available"
        ? "Occupied"
        : "Available";

    await updateBed(bed.id, {
      status: newStatus,
    });

    loadBeds();
  };

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
          Bed Management
        </h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          Add Bed
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Beds</h3>
          <h1>{beds.length}</h1>
        </div>

        <div className="card">
          <h3>Available</h3>
          <h1>
            {
              beds.filter(
                (b) =>
                  b.status === "Available"
              ).length
            }
          </h1>
        </div>

        <div className="card">
          <h3>Occupied</h3>
          <h1>
            {
              beds.filter(
                (b) =>
                  b.status === "Occupied"
              ).length
            }
          </h1>
        </div>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Bed No</th>
              <th>Ward</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {beds.map((bed) => (
              <tr key={bed.id}>
                <td>{bed.number}</td>

                <td>{bed.ward}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      background:
                        bed.status ===
                        "Available"
                          ? "green"
                          : "red",
                    }}
                  >
                    {bed.status}
                  </span>
                </td>

                <td>
                  <button
                    className="primary-btn"
                    onClick={() =>
                      changeStatus(bed)
                    }
                  >
                    Toggle Status
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
              background: "white",
              width: "450px",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Add New Bed
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                placeholder="Bed Number"
                value={form.number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    number:
                      e.target.value,
                  })
                }
              />

              <input
                placeholder="Ward"
                value={form.ward}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ward: e.target.value,
                  })
                }
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status:
                      e.target.value,
                  })
                }
              >
                <option>
                  Available
                </option>
                <option>
                  Occupied
                </option>
              </select>

              <button
                className="primary-btn"
                onClick={addBed}
              >
                Save Bed
              </button>

              <button
                style={{
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#ddd",
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

export default Beds;