import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import  Labels  from "./Labels";

export const Analytics = () => {
  Chart.register(ArcElement);

  const config = {
    data: {
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 85,
    },
  };
  return (
    <div className="row py-4">
      <div className="col-3">
        <div className="analytics mb-4">
          <Doughnut {...config}></Doughnut>
          <h3 className="fw-semibold mb-4 text-center title">
            Total <span className="fw-bold d-block text-success">₹{0}</span>
          </h3>
        </div>

        <div className="d-flex flex-column gap-3">
          <Labels/>
        </div>
      </div>
    </div>
  );
};
