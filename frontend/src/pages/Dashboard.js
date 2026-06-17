import React, { useEffect, useState } from "react";
import { getDashboardStatistics } from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    activePatients: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getDashboardStatistics();
    setStats(res.data);
  };

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Beds</h3>
          <h1>{stats.totalBeds}</h1>
        </div>

        <div className="card">
          <h3>Available Beds</h3>
          <h1>{stats.availableBeds}</h1>
        </div>

        <div className="card">
          <h3>Occupied Beds</h3>
          <h1>{stats.occupiedBeds}</h1>
        </div>

        <div className="card">
          <h3>Active Patients</h3>
          <h1>{stats.activePatients}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;