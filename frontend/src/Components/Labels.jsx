import React from "react";

export default function Labels({ combinedData }) {
  return (
    <>
      {combinedData.map((value, index) => (
        <LabelComponent key={index} data={value} />
      ))}
    </>
  );
}

function LabelComponent({ data }) {
  if (!data) return null;

  console.log("data", data);

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-center gap-2">
        <div
          className="rounded py-3 w-2 h-2"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h6>{data.type ?? ""}</h6>
      </div>
      <h6>{data.percent ?? 0}%</h6>
    </div>
  );
}
