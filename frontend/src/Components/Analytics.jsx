import { React, useState, useEffect, useMemo } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import Labels from "./Labels";

const colors = {
  Expense: "#b80000", // Red for Expense
  Income: "#009925", // Green for Income
};

const categoryColors = [
  "rgb(255, 99, 132)", // Stocks
  "rgb(54, 162, 235)", // Health
  "#f9c74f", // Investment
  "#6a4c93", // Housing
  "#ff6f61", // Education
  "#9acd32", // Entertainment
  "#ff4500", // Transport
  "#9370db", // Food
  "#ffa500", // Utilities
];

const processData = (data, key) => {
  const combinedData = data.reduce((acc, item) => {
    const existing = acc.find((i) => i.type === item[key]);
    if (existing) {
      existing.amount += item.amount;
    } else {
      acc.push({ type: item[key], amount: item.amount });
    }
    return acc;
  }, []);

  const totalAmount = combinedData.reduce((sum, item) => sum + item.amount, 0);

  return combinedData.map((item, index) => ({
    type: item.type,
    color:
      key === "category"
        ? categoryColors[index % categoryColors.length]
        : colors[item.type] || colors.Investment,
    amount: item.amount,
    percent: ((item.amount / totalAmount) * 100).toFixed(2),
  }));
};

export const Analytics = ({ filteredData }) => {
  Chart.register(
    ArcElement,
    Tooltip,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale
  );

  const [typeChartData, setTypeChartData] = useState(null);
  const [categoryChartData, setCategoryChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(1) + " Cr"; // Crores
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(1) + " Lakh"; // Lakhs
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K"; // Thousands
    } else {
      return amount;
    }
  };

  const combinedTypeData = useMemo(
    () => processData(filteredData, "type"),
    [filteredData]
  );
  const combinedCategoryData = useMemo(
    () => processData(filteredData, "category"),
    [filteredData]
  );

  const totalAmount = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.amount, 0),
    [filteredData]
  );

  useEffect(() => {
    const updateChartData = () => {
      const typeValues = combinedTypeData.map((item) => item.amount);
      const typeLabels = combinedTypeData.map((item) => item.type);
      const typeColors = combinedTypeData.map((item) => item.color);

      const categoryValues = combinedCategoryData.map((item) => item.amount);
      const categoryLabels = combinedCategoryData.map((item) => item.type);
      const categoryColors = combinedCategoryData.map((item) => item.color);

      // Doughnut chart data for types
      const typeData = {
        labels: typeLabels,
        datasets: [
          {
            data: typeValues,
            backgroundColor: typeColors,
            hoverOffset: 5,
          },
        ],
      };

      const typeOptions = {
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = typeValues[tooltipItem.dataIndex];
                const formattedValue = formatAmount(value);
                return ` ₹ ${formattedValue}`;
              },
            },
          },
        },
      };

      setTypeChartData({ data: typeData, options: typeOptions });

      // Doughnut chart data for categories
      const categoryData = {
        labels: categoryLabels,
        datasets: [
          {
            data: categoryValues,
            backgroundColor: categoryColors,
            hoverOffset: 4,
          },
        ],
      };

      const categoryOptions = {
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = categoryValues[tooltipItem.dataIndex];
                const formattedValue = formatAmount(value);
                return `₹ ${formattedValue}`;
              },
            },
          },
        },
      };

      setCategoryChartData({ data: categoryData, options: categoryOptions });

      // Line chart data for both type and category
      const lineData = {
        labels: categoryLabels, // Assuming category labels for both lines
        datasets: [
          {
            label: "Type",
            data: typeValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.1,
          },
          {
            label: "Category",
            data: categoryValues,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            fill: true,
            tension: 0.1,
          },
        ],
      };

      const lineOptions = {
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                const formattedValue = formatAmount(value);
                return ` ₹ ${formattedValue}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `₹ ${formatAmount(value)}`;
              },
            },
          },
        },
      };

      setLineChartData({ data: lineData, options: lineOptions });
    };

    updateChartData();

    window.addEventListener("resize", updateChartData);

    return () => {
      window.removeEventListener("resize", updateChartData);
    };
  }, [filteredData]);

  return (
    <>
      <div className="row py-4 justify-content-between ">
        {/* Doughnut Chart for Type */}

        <h5 className="mb-4">Analytics based on type :-</h5>
        <div className="col-lg-4 col-md-6 col-12">
          <div className="analytics mb-4">
            {typeChartData && (
              <Doughnut
                data={typeChartData.data}
                options={typeChartData.options}
              />
            )}
          </div>
          <h5 className="mb-3">
            Total Amount :{" "}
            <span className="fw-bold">₹ {formatAmount(totalAmount)}</span>
          </h5>
          <div className="d-flex flex-column gap-3 mb-4 mb-md-0">
            <Labels combinedData={processData(filteredData, "type")} />
          </div>
        </div>

        <div className="col-md-6  col-12">
          <div className="analytics mb-4">
            {typeChartData && (
              <Line data={typeChartData.data} options={typeChartData.options} />
            )}
          </div>
        </div>
      </div>

      <div className="row py-4 justify-content-between ">
        <h5 className="mb-4">Analytics based on category :-</h5>
        <div className="col-lg-4 col-md-6 col-12">
          <div className="analytics mb-4">
            {categoryChartData && (
              <Doughnut
                data={categoryChartData.data}
                options={categoryChartData.options}
              />
            )}
          </div>
          <div className="d-flex flex-column gap-3 mb-4 mb-md-0">
            <Labels combinedData={processData(filteredData, "category")} />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="analytics mb-4">
            {categoryChartData && (
              <Line
                data={categoryChartData.data}
                options={categoryChartData.options}
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
