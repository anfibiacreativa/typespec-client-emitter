import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import fetch from "node-fetch"; // Node.js 18+ has fetch built-in

const app = express();
const port = 3010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base function endpoint
const FUNCTION_BASE_URL = 'http://localhost:7071/api';

// Route to get chatbot messages (Calls the /history function)
app.get('/history', async (req, res) => {
  try {
    const response = await fetch(`${FUNCTION_BASE_URL}/history`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Route to send a chat message (Calls the /chat function)
// app.post("/chat", async (req: express.Request, res: express.Response) => {
//   try {
//     const { user, text } = req.body;
//     if (!user || !text) {
//       return res.status(400).json({ error: "User and text are required" });
//     }

//     const response = await fetch(`${FUNCTION_BASE_URL}/chat`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user, text })
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
