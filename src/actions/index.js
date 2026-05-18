import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

const host = import.meta.env.PUBLIC_DEFAULT_SERVER;
const port = import.meta.env.PUBLIC_DEFAULT_PORT;

export const server = {
  login: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    handler: async (input) => {
        console.log("handler here", input);
        // post request to backend for authentication
        const response = await fetch(`${host}:${port}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Login successful!");
          // set cookie or token for authentication
          return { success: true, token: data.token };
        } else {
          return { success: false, error: data.error };
        }
    }
  })
}