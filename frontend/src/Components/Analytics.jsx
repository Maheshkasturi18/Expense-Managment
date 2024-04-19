import { React, useState, useEffect } from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";

export const Analytics = () => {
  Chart.register(ArcElement);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const updateChartData = () => {
      const responsiveOptions = {
        maintainAspectRatio: true,
        aspectRatio: 1,
        cutout: getCutout(),
        spacing: getSpacing(),
        borderRadius: getBorderRadius(),
      };

      const data = {
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      setChartData({ data, options: responsiveOptions });
    };

    updateChartData();

    window.addEventListener("resize", updateChartData);

    return () => {
      window.removeEventListener("resize", updateChartData);
    };
  }, []);

  const getCutout = () => {
    // Adjust cutout based on device width
    const width = window.innerWidth;
    if (width <= 1300) {
      return 60;
    } else {
      return 85;
    }
  };

  const getSpacing = () => {
    // Adjust spacing based on device width
    const width = window.innerWidth;
    if (width <= 1300) {
      return 5;
    } else {
      return 10;
    }
  };

  const getBorderRadius = () => {
    // Adjust border radius based on device width
    const width = window.innerWidth;
    if (width <= 1300) {
      return 15;
    } else {
      return 30;
    }
  };
  return (
    <div className="row py-4">
      <div className="col-3">
        <div className="analytics mb-4">
          {chartData && (
            <Doughnut data={chartData.data} options={chartData.options} />
          )}

          <h3 className="fw-semibold mb-4 text-center title">
            Total <span className="fw-bold d-block text-success">₹{0}</span>
          </h3>
        </div>

        <div className="d-flex flex-column gap-3">
          <Labels />
        </div>
      </div>
    </div>
  );
};
