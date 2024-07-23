import { runWithTools } from '@cloudflare/ai-utils';
import { faker } from '@faker-js/faker';
import { Hono } from "hono";
import ui from "./ui.html";

const app = new Hono();

const config = {
  model: "@cf/meta/llama-3.1-8b-instruct"
}

app.get("/", (c) => c.html(ui));

app.post("/", async (c) => {
  try {
    const { content } = await c.req.json();

    let messages = [
      { role: "system", content: "You are a helpful assistant that I can talk with. Only call tools if I ask for them." },
      { role: "user", content },
    ];

    const result = await runWithTools(
      c.env.AI,
      config.model,
      {
        messages,
        tools: [
          {
            name: "randomString",
            description: "Generate a random string",
            function: async () => {
              return faker.string.alpha(10)
            }
          }
        ]
      },
      {
        strictValidation: true,
        maxRecursiveToolRuns: 1,
      }
    );

    messages.push({ role: 'assistant', content: result.response })

    const filteredMessages = messages.filter(m =>
      ['assistant', 'tool'].includes(m.role)
    )

    return c.json({ messages: filteredMessages })
  } catch (err) {
    console.log(err)
    return c.text("Something went wrong", 500)
  }
});

export default app;
