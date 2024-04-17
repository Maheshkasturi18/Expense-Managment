import React from "react";

const obj = [
  {
    type: "Savings",
    color: "rgb(255, 99, 132)",
    percent: 45,
  },
  {
    type: "Investment",
    color: "rgb(54, 162, 235)",
    percent: 20,
  },
  {
    type: "Expense",
    color: "#f9c74f",
    percent: 10,
  },
];

export default function Labels() {
  return (
    <>
      {obj.map((value, index) => (
        <LabelComponent key={index} data={value} />
      ))}
    </>
  );
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-center gap-2">
        <div
          className="rounded py-3 w-2 h-2 "
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h5>{data.type ?? ""}</h5>
      </div>
      <h5>{data.percent ?? 0}%</h5>
    </div>
  );
}
