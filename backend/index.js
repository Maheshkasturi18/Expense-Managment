const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
const PORT = process.env.Port || 8000;
require("dotenv").config(); 

mongoose
  .connect(process.env.DATABASE,)
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => console.log(err));

// Schema for users of app
const UserSchema = new mongoose.Schema(
  {
    Amount: Number,
    Type: String,
    Category: String,
    Date: Number,
    Reference:String
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("expenses", UserSchema);

// read data
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data update successfully", data: data });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));