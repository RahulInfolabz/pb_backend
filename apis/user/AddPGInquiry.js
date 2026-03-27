const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddPGInquiry(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { pg_id, inquiry_message } = req.body;

    if (!pg_id || !inquiry_message) {
      return res.status(400).json({
        success: false,
        message: "PG ID and inquiry message are required",
      });
    }

    if (!ObjectId.isValid(pg_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PG ID",
      });
    }

    const db = await connectDB();
    const pgCollection = db.collection("pg_listings");
    const inquiryCollection = db.collection("pg_inquiries");

    // Verify PG exists
    const pgExists = await pgCollection.findOne({
      _id: new ObjectId(pg_id),
    });

    if (!pgExists) {
      return res.status(404).json({
        success: false,
        message: "PG listing not found",
      });
    }

    await inquiryCollection.insertOne({
      user_id: new ObjectId(user.session._id),
      pg_id: new ObjectId(pg_id),
      inquiry_message,
      inquiry_status: "Pending",
      inquiry_date: new Date(),
      response_message: "",
      response_date: null,
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("AddPGInquiry.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { AddPGInquiry };
