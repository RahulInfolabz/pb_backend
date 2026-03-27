const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetPGListings(req, res) {
  try {
    const { category_id, accommodation_type_id, min_rent, max_rent } =
      req.query;

    const db = await connectDB();
    const collection = db.collection("pg_listings");

    // Build match stage
    const matchStage = { status: "Active" };

    if (category_id && ObjectId.isValid(category_id)) {
      matchStage.category_id = new ObjectId(category_id);
    }

    if (accommodation_type_id && ObjectId.isValid(accommodation_type_id)) {
      matchStage.accommodation_type_id = new ObjectId(accommodation_type_id);
    }

    if (min_rent || max_rent) {
      matchStage.rent = {};
      if (min_rent) matchStage.rent.$gte = parseFloat(min_rent);
      if (max_rent) matchStage.rent.$lte = parseFloat(max_rent);
    }

    const listings = await collection
      .aggregate([
        { $match: matchStage },
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
        { $sort: { created_at: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "PG listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    console.error("GetPGListings.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetPGListings };
