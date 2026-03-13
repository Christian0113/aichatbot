import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: userMessage
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "出错了，请检查 API Key 和网络。"
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});