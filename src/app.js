require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ร้าน Cafe POS ทำงานที่พอร์ท ${PORT}`);
});
