const db = require("../config/db");

exports.createOrder = async (req, res) => {
  const { paymentMethod } = req.body;

  if (!paymentMethod) {
    return res.status(400).json({
      error: "paymentMethod is required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO orders (payment_method, created_at) VALUES (?, NOW())",
      [paymentMethod],
    );

    res.status(201).json({
      message: "บันทึกออเดอร์สำเร็จ",
      orderId: result.insertId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการบันทึกออเดอร์",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "ไม่สามารถดึงข้อมูลออเดอร์ได้",
    });
  }
};
