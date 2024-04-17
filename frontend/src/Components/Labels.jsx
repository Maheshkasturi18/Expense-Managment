import React from "react";

const obj = [
  {
    type: "Savings",
    percent: 45,
    color: "#f9c74f",
  },
  {
    type: "Savings",
    percent: 20,
    color: "#f9c74f",
  },
  {
    type: "Savings",
    percent: 10,
    color: "#f9c74f",
  },
];

export default function labels() {
  return (
    <>
      <LabelComponent />
    </>
  );
}

export function LabelComponent() {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-center gap-2">
        <div
          className="rounded py-3 w-2 h-2 "
          style={{ background: "#f9c74f" }}
        ></div>
        <h5>Savings</h5>
      </div>
      <h5>45%</h5>
    </div>
  );
}
