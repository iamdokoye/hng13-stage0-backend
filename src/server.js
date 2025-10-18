import express from "express";
import cors from "cors";
import { logger } from "./logger.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

// Your details (can be overridden by env if you want)
const USER_EMAIL = process.env.USER_EMAIL || "okoyedann@gmail.com";
const USER_NAME  = process.env.USER_NAME  || "Daniel Okoye";
const USER_STACK = process.env.USER_STACK || "Nodejs/Express";

async function fetchWithTimeout(url, { timeoutMs = 5000 } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

app.get("/", (_req, res) => res.status(200).json({ ok: true }));

app.get("/me", async (_req, res) => {
  const nowIsoUtc = new Date().toISOString();
  let fact = null;
  try {
    const r = await fetchWithTimeout("https://catfact.ninja/fact", { timeoutMs: 5000 });
    if (!r.ok) throw new Error(`Upstream status ${r.status}`);
    const data = await r.json();
    fact = typeof data?.fact === "string" ? data.fact : null;
  } catch {
    fact = "Cats: agile, curious, and occasionally API-shy. (fallback)";
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).send({
    status: "success",
    user: { email: USER_EMAIL, name: USER_NAME, stack: USER_STACK },
    timestamp: nowIsoUtc,
    fact
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ status: "error", message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Stage0 backend listening on :${PORT}`));