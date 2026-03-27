const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetPGDetails(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PG ID",
      });
    }

    const db = await connectDB();
    const collection = db.collection("pg_listings");

    const pgDetails = await collection
      .aggregate([
        { $match: { _id: new ObjectId(id), status: "Active" } },
        {
          $lookup: {
            from: "pg_categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "accommodation_types",
            localField: "accommodation_type_id",
            foreignField: "_id",
            as: "accommodation_type",
          },
        },
        {
          $unwind: {
            path: "$accommodation_type",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    if (!pgDetails.length) {
      return res.status(404).json({
        success: false,
        message: "PG listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "PG details fetched successfully",
      data: pgDetails[0],
    });
  } catch (error) {
    console.error("GetPGDetails.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetPGDetails };
