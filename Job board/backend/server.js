import app from "./App.js";
import connectToDB from "./Config/db.Conn.js";

const PORT = process.env.PORT || 5015;

app.listen(PORT, async () => {
    // Connect to DB
    await connectToDB();
    console.log(`App is running at http://localhost:${PORT}`);
  });
