const connectDB = require("../../db/dbConnect");

async function GetAccommodationTypes(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("accommodation_types");

    const types = await collection
      .find({ status: "Active" })
      .sort({ accommodation_type_name: 1 })
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Accommodation types fetched successfully",
      data: types,
    });
  } catch (error) {
    console.error("GetAccommodationTypes.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetAccommodationTypes };
