import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";
import ui from "./ui.html";

const app = new Hono();

app.get("/", (c) => c.html(ui));

app.post("/", async (c) => {
  const { content } = await c.req.json();
  const ai = new Ai(c.env.AI);

  const messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content },
  ];

  const resp = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
    messages,
    stream: true,
  });

  return c.body(resp, 200, {
    "Content-Type": "text/event-stream",
  });
});

export default app;
