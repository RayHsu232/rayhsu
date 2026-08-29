const SUCCESS_TEXT = "订阅成功，欢迎加入！";
const FAIL_TEXT = "订阅失败，请稍后再试。";
const OFFLINE_TEXT = "当前环境暂不支持订阅，请在正式站点使用。";

export function wireSubscribe(form: HTMLFormElement, msg: HTMLElement): void {
  const honeypot = form.querySelector<HTMLInputElement>("input[name='website']");
  const input = form.querySelector<HTMLInputElement>("input[type='email']");
  const button = form.querySelector<HTMLButtonElement>("button[type='submit']");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (button?.disabled) return;
    const email = input?.value.trim() ?? "";
    if (button) button.disabled = true;
    const show = (text: string, cls: "subscribe-success" | "subscribe-error" | "text-subtle") => {
      msg.textContent = text;
      msg.classList.remove("hidden", "subscribe-success", "subscribe-error", "text-subtle");
      msg.classList.add(cls);
    };
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot?.value ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        show(SUCCESS_TEXT, "subscribe-success");
        form.reset();
      } else {
        show(data.error ?? FAIL_TEXT, "subscribe-error");
      }
    } catch {
      show(OFFLINE_TEXT, "text-subtle");
    } finally {
      if (button) button.disabled = false;
    }
  });
}
