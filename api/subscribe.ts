import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  const { email, website } = req.body ?? {};
  if (typeof website === "string" && website.trim() !== "") {
    res.status(200).json({ ok: true });
    return;
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: "邮箱格式不正确" });
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(502).json({ ok: false, error: "服务未配置" });
    return;
  }
  try {
    const upstream = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!upstream.ok) {
      const duplicated = upstream.status === 409;
      if (duplicated) {
        res.status(200).json({ ok: true });
        return;
      }
      res.status(502).json({ ok: false, error: "订阅服务暂时不可用" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false, error: "订阅服务暂时不可用" });
  }
}
