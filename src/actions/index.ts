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

interface InputSolveReport {
  id: string;
  token: string;
}

interface InputGetReport {
  page: number;
  limit: number;
  totalPages: number;
  token:string;
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
        const response = await fetch(`${url}/api/reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Report Submitted!");
          return { success: true };
        } else {
          return { success: false, error: data.error };
        }
    }
  }),
  get_reports: defineAction({
    input: z.object({
      page: z.int(),
      limit: z.int().default(import.meta.env.DEFAULT_PAGINATION_LIMIT),
      totalPages: z.int(),
      token:z.string()
    }),
    handler: async (input:InputGetReport) => {
      const token = input.token;
        if (!token) throw new Error("Unauthorized");

        const response = await fetch(`${url}/api/reports`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          return {data:data, error:data?.error};
        } else {
          return {data:{}, error: data.error };
        }
    }
  }),
  solve_report: defineAction({
      input: z.object({
      id: z.string(),
      token: z.string(),
      
    }),
    handler: async (input:InputSolveReport) => {
        const token = input.token;
        if (!token) throw new Error("Unauthorized");

        const response = await fetch(`${url}/api/reports/${input.id}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({status:"done"}),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Report Done!");
          // set cookie or token for authentication
          return { success: true };
        } else {
          return { success: false, error: data.error };
        }
    }
  }),
}