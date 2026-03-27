const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "pg_platform";

async function seed() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);

  console.log("🌱 Starting seed...");

  // ── Clear existing data ───────────────────────────────────────────────────
  await db.collection("users").deleteMany({});
  await db.collection("pg_categories").deleteMany({});
  await db.collection("accommodation_types").deleteMany({});
  await db.collection("pg_listings").deleteMany({});
  await db.collection("pg_inquiries").deleteMany({});
  await db.collection("general_inquiries").deleteMany({});
  await db.collection("feedbacks").deleteMany({});

  console.log("🗑️  Cleared existing collections");

  // ── Users ─────────────────────────────────────────────────────────────────
  const usersResult = await db.collection("users").insertMany([
    {
      full_name: "Admin User",
      email: "admin@pgfinder.com",
      password: "Admin@123",
      mobile_no: "9900000001",
      city: "Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=1",
      role: "Admin",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Arjun Mehta",
      email: "arjun@gmail.com",
      password: "Arjun@123",
      mobile_no: "9900000002",
      city: "Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=2",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Sneha Patel",
      email: "sneha@gmail.com",
      password: "Sneha@123",
      mobile_no: "9900000003",
      city: "Surat",
      profile_image: "https://i.pravatar.cc/150?img=3",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const userIds = Object.values(usersResult.insertedIds);
  console.log("✅ Users seeded");

  // ── PG Categories ─────────────────────────────────────────────────────────
  const categoriesResult = await db.collection("pg_categories").insertMany([
    {
      category_name: "Boys PG",
      category_description:
        "Accommodation exclusively for male students and working professionals with all basic amenities.",
      category_image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Girls PG",
      category_description:
        "Safe and secure accommodation exclusively for female students and working women.",
      category_image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Unisex PG",
      category_description:
        "Open to both male and female residents with shared common areas and separate floors.",
      category_image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Co-Living",
      category_description:
        "Modern co-living spaces designed for young professionals with community-focused lifestyle.",
      category_image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const categoryIds = Object.values(categoriesResult.insertedIds);
  console.log("✅ PG Categories seeded");

  // ── Accommodation Types ───────────────────────────────────────────────────
  const typesResult = await db.collection("accommodation_types").insertMany([
    {
      accommodation_type_name: "Single Room",
      description:
        "Private single-occupancy room with personal space and attached or shared bathroom.",
      status: "Active",
      created_at: new Date(),
    },
    {
      accommodation_type_name: "Shared Room",
      description:
        "Room shared between 2–4 residents with individual beds and storage space.",
      status: "Active",
      created_at: new Date(),
    },
    {
      accommodation_type_name: "Co-Living Suite",
      description:
        "Modern fully-furnished suite in a co-living space with access to shared amenities.",
      status: "Active",
      created_at: new Date(),
    },
    {
      accommodation_type_name: "Dormitory",
      description:
        "Budget-friendly dormitory-style accommodation with 6–10 beds per room.",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const typeIds = Object.values(typesResult.insertedIds);
  console.log("✅ Accommodation Types seeded");

  // ── PG Listings ───────────────────────────────────────────────────────────
  const listingsResult = await db.collection("pg_listings").insertMany([
    {
      category_id: categoryIds[0], // Boys PG
      accommodation_type_id: typeIds[0], // Single Room
      pg_name: "Shree Ganesh Boys PG",
      rent: 7500.0,
      amenities: "WiFi, AC, Laundry, Meals (2 times), Parking, CCTV",
      location: "Satellite, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      description:
        "Well-maintained boys PG near Satellite area with homely food and all modern amenities. Ideal for students and working professionals.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Girls PG
      accommodation_type_id: typeIds[0], // Single Room
      pg_name: "Laxmi Girls Residency",
      rent: 8000.0,
      amenities: "WiFi, AC, Meals (3 times), Security Guard, CCTV, Geyser",
      location: "Navrangpura, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      description:
        "Safe and secure girls PG in the heart of Navrangpura. 24/7 security, home-cooked meals, and a peaceful environment for women.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Girls PG
      accommodation_type_id: typeIds[1], // Shared Room
      pg_name: "Pink Lotus Girls PG",
      rent: 5500.0,
      amenities: "WiFi, Meals (2 times), Laundry, CCTV, Common Hall",
      location: "Paldi, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600",
      description:
        "Affordable girls PG with shared rooms. Great for students looking for budget-friendly accommodation near colleges.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Unisex PG
      accommodation_type_id: typeIds[1], // Shared Room
      pg_name: "Urban Stay Unisex PG",
      rent: 6500.0,
      amenities: "WiFi, AC, Meals (2 times), Gym, Parking, CCTV",
      location: "Bodakdev, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      description:
        "Modern unisex PG with separate floors for boys and girls. Great community environment with gym and common spaces.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Co-Living
      accommodation_type_id: typeIds[2], // Co-Living Suite
      pg_name: "The Hive Co-Living Space",
      rent: 12000.0,
      amenities:
        "WiFi, AC, Fully Furnished, Rooftop Lounge, Co-working Space, Housekeeping, Netflix",
      location: "SG Highway, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      description:
        "Premium co-living space designed for young working professionals. Modern interiors, high-speed WiFi, co-working area, and a vibrant community.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0], // Boys PG
      accommodation_type_id: typeIds[1], // Shared Room
      pg_name: "Krishna Boys PG",
      rent: 4500.0,
      amenities: "WiFi, Meals (2 times), Laundry, Parking",
      location: "Maninagar, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      description:
        "Budget-friendly boys PG in Maninagar. Clean rooms, timely meals, and a homely atmosphere. Best suited for students.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Co-Living
      accommodation_type_id: typeIds[2], // Co-Living Suite
      pg_name: "Nest Co-Living Suites",
      rent: 10500.0,
      amenities:
        "WiFi, AC, Fully Furnished, Community Kitchen, Events Space, Housekeeping, Power Backup",
      location: "Prahlad Nagar, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      description:
        "Thoughtfully designed co-living suites for professionals. Community events, modern amenities, and a central location make it the perfect urban home.",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0], // Boys PG
      accommodation_type_id: typeIds[3], // Dormitory
      pg_name: "Budget Boys Dorm PG",
      rent: 3000.0,
      amenities: "WiFi, Meals (2 times), Common Bathroom, Fans",
      location: "Ghatlodia, Ahmedabad",
      pg_image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      description:
        "Most affordable dormitory-style PG for boys. Clean, safe, and well-managed. Ideal for students on a tight budget.",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const listingIds = Object.values(listingsResult.insertedIds);
  console.log("✅ PG Listings seeded");

  // ── PG Inquiries ──────────────────────────────────────────────────────────
  await db.collection("pg_inquiries").insertMany([
    {
      user_id: userIds[1], // Arjun
      pg_id: listingIds[0], // Shree Ganesh Boys PG
      inquiry_message:
        "Is this PG available from next month? I need a single room with AC. Also, do you allow cooking?",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-11-10"),
      response_message:
        "Yes, we have availability from next month. Single AC rooms are available. Cooking is not allowed but we provide 2 meals daily.",
      response_date: new Date("2025-11-11"),
    },
    {
      user_id: userIds[2], // Sneha
      pg_id: listingIds[1], // Laxmi Girls Residency
      inquiry_message:
        "Can I visit the PG this weekend for inspection? What are the visiting hours?",
      inquiry_status: "Pending",
      inquiry_date: new Date(),
      response_message: "",
      response_date: null,
    },
    {
      user_id: userIds[1], // Arjun
      pg_id: listingIds[4], // The Hive Co-Living
      inquiry_message:
        "Is the co-working space available 24/7? Are there any short-term stay options available for 3 months?",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-10-20"),
      response_message:
        "Yes, the co-working space is available 24/7. We do offer 3-month short-term plans. Please contact us for pricing details.",
      response_date: new Date("2025-10-21"),
    },
  ]);

  console.log("✅ PG Inquiries seeded");

  // ── General Inquiries ─────────────────────────────────────────────────────
  await db.collection("general_inquiries").insertMany([
    {
      user_id: userIds[1], // Arjun
      inquiry_subject: "PG near PDPU University",
      inquiry_message:
        "I am looking for a boys PG near PDPU University, Gandhinagar. Do you have any listings in that area?",
      inquiry_date: new Date("2025-11-15"),
      status: "Pending",
    },
    {
      user_id: userIds[2], // Sneha
      inquiry_subject: "Long Term Stay Discount",
      inquiry_message:
        "I am looking for a girls PG for a 12-month stay. Do you offer any discounts for long-term bookings?",
      inquiry_date: new Date("2025-11-20"),
      status: "Pending",
    },
  ]);

  console.log("✅ General Inquiries seeded");

  // ── Feedbacks ─────────────────────────────────────────────────────────────
  await db.collection("feedbacks").insertMany([
    {
      user_id: userIds[1], // Arjun
      feedback_message:
        "Great platform! Found my PG within minutes. The filters are very helpful and listings are accurate.",
      rating: 5,
      feedback_date: new Date("2025-11-20"),
    },
    {
      user_id: userIds[2], // Sneha
      feedback_message:
        "Very easy to use. Loved the detailed information on each listing. Would appreciate more listings in Surat.",
      rating: 4,
      feedback_date: new Date("2025-11-25"),
    },
    {
      user_id: userIds[1], // Arjun
      feedback_message:
        "Good experience overall. The inquiry response was quick. Hope to see more co-living options soon.",
      rating: 4,
      feedback_date: new Date("2025-12-01"),
    },
  ]);

  console.log("✅ Feedbacks seeded");

  console.log("\n🎉 Seed completed successfully!");
  console.log("─────────────────────────────────────────");
  console.log("👤 Admin   → admin@pgfinder.com  / Admin@123");
  console.log("👤 User 1  → arjun@gmail.com     / Arjun@123");
  console.log("👤 User 2  → sneha@gmail.com     / Sneha@123");
  console.log("─────────────────────────────────────────");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
