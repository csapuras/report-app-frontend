import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

const host:string = import.meta.env.PUBLIC_DEFAULT_SERVER;
const port:string = import.meta.env.PUBLIC_DEFAULT_PORT;
const url:string = `${host}:${port}`

interface InputLogin {
  username: string;
  password: string;
}

interface InputReport {
  name: string;
  contact: string;
  lat: string;
  lng: string;
}

export const server = {
  login: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    handler: async (input:InputLogin) => {
        const response = await fetch(`${url}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Login successful!");
          // set cookie or token for authentication
          return { success: true, token: data.token, username: data.username };
        } else {
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
    handler: async (input:InputReport) => {
      console.log("Report input:", input);
        const response = await fetch(`${url}/api/reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        console.log("Report response:", data);
        if (response.ok) {
            console.log("Submit successful!");
          return { success: true };
        } else {
          return { success: false, error: data.error };
        }
    }
  }),
  get_reports: defineAction({
    handler: async () => {
        const response = await fetch(`${url}/api/reports`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log("get_reports",data)
        if (response.ok) {
          return {data:data, error:data?.error};
        } else {
          return {data:{}, error: data.error };
        }
    }
  }),
}