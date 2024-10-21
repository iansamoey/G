import Order from "../../../models/Order";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  
  const {
    method,
    query: { id },
  } = req;

  // GET Method: Retrieve the order by its ID
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  }

  // DELETE Method: Delete the order by its ID
  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete order" });
    }
  }

  // PUT Method: Update the order status, payment status, or transaction ID
  if (method === "PUT") {
    try {
      // Extract updated fields from the request body
      const { status, paymentStatus, transactionId } = req.body;

      // Find the order by ID
      let order = await Order.findById(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update fields only if they are provided in the request body
      if (status !== undefined) {
        order.status = status;
      }
      if (paymentStatus !== undefined) {
        order.paymentStatus = paymentStatus;  // New Field (Add this to your schema if it's not there)
      }
      if (transactionId !== undefined) {
        order.transactionId = transactionId;  // New Field (Add this to your schema if it's not there)
      }

      // Save the updated order
      await order.save();

      res.status(200).json(order); // Respond with the updated order
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update order" });
    }
  }
};

export default handler;
