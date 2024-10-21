import Order from "../../../models/Order";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  // GET Method: Fetch all orders
  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);  // Returns all orders, including paymentStatus and transactionId
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }

  // POST Method: Create a new order
  if (method === "POST") {
    try {
      const {
        customer,
        products,
        total,
        method,  // Payment method: 0 = Cash, 1 = Card
        paymentStatus,  // Optional, defaults to "pending"
        transactionId,  // Optional, if available
      } = req.body;

      // Create a new order with payment status and transaction ID
      const newOrder = await Order.create({
        customer,
        products,
        total,
        method,
        paymentStatus: paymentStatus || "pending",  // Default to "pending" if not provided
        transactionId: transactionId || "",  // Set empty string if no transaction ID is provided
      });

      res.status(201).json(newOrder);  // Respond with the created order
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create order" });
    }
  }
};

export default handler;
