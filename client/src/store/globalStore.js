import { readable, writable } from "svelte/store";

export const baseURL = readable("http://localhost:3000");

export const runOnce = writable(true);