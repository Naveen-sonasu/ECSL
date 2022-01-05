import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
// import connectDB from "./config/db.js";
import mongoose from "mongoose";
import { notfound, errorHandler } from "./middleware/errorMiddleware.js";

import CentreRoutes from "./routes/centreRoutes.js";
import ItemRoutes from "./routes/itemRouter.js";
import UserRoutes from "./routes/userRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

dotenv.config();
// connectDB();
const app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.get("/", (req, res) => {
  res.send("centres");
});
//sonasujp/EconomicCenter_SL
app.use("/api/admin/centres", CentreRoutes);
app.use("/api/admin/items", ItemRoutes);
app.use("/api/admin/users", UserRoutes);
app.use("/api/admin/price", priceRoutes);

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);
