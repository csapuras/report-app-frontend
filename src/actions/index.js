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
            const response = await fetch(`${host}:${port}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful!");
                // set cookie or token for authentication
                return { success: true, token: data.token, username: data.username };
            }
            else {
                return { success: false, error: data.error };
            }
        }
    }),
    report: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string(),
            contact: z.string(),
            lat: z.string(),
            lng: z.string(),
        }),
        handler: async (input) => {
            console.log("Report input:", input);
            const response = await fetch(`${host}:${port}/api/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });
            const data = await response.json();
            console.log("Report response:", data);
            if (response.ok) {
                console.log("Submit successful!");
                return { success: true };
            }
            else {
                return { success: false, error: data.error };
            }
        }
    })
};
