import Category from "../../../models/Category";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  } else if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory); // 201 Created
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(400).json({ message: "Failed to create category", error: err.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
