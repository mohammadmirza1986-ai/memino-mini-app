const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  const user = tg.initDataUnsafe?.user;
  document.getElementById("status").textContent =
    user ? `سلام ${user.first_name || "دوست میمینو"} 👋` : "نسخه آزمایشی میمینو آماده است.";
} else {
  document.getElementById("status").textContent = "نسخه آزمایشی خارج از تلگرام اجرا شده است.";
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("status").textContent = "🎉 بازی میمینو به‌زودی شروع می‌شود!";
  if (tg) tg.HapticFeedback?.impactOccurred("medium");
});
