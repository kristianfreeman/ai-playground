# Kristian's Llama 3 Playground

This is my example playground for working with Llama 3 in [Cloudflare Workers AI](https://ai.cloudflare.com). It might be interesting to other people - or it might not!

It includes some of my most recent best practices for working with generative text AI models in a full-stack context. 

On the backend, that includes:

- Using Hono (particularly the [Hono streaming APIs](https://hono.dev/helpers/streaming))
- Using Workers AI (particularly the _brand new at time of writing_  [Llama 3](https://blog.cloudflare.com/meta-llama-3-available-on-cloudflare-workers-ai))
- Streaming the AI response directly to the client

On the frontend, that includes:

- Using [`lukeed/fetch-event-stream`](https://github.com/lukeed/fetch-event-stream) to manage the EventSource response
- Using [Vue 3](https://vuejs.org), [Tailwind CSS](https://tailwindcss.com), and [daisyUI](https://daisyui.com) for a simple UI
- Basic "chat" flow - persisting old messages in the UI, loading states, and more

This code is open-sourced so that if you're trying to build with Workers AI, you can rip out pieces of it for your own tasks, or even fork it and build something wholesale with it.
