import { v2 } from 'cloudinary';
import app from "./App.js";
import connectToDB from "./Config/db.Conn.js";

const PORT = process.env.PORT || 5015;

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
    // Connect to DB
    await connectToDB();
    console.log(`App is running at http://localhost:${PORT}`);
  });
