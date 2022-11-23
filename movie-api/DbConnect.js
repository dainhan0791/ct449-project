import mongoose from "mongoose";

const DbConnect = () => {
  const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.DB, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database sucessfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database :" + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected");
  });
};

export default DbConnect;