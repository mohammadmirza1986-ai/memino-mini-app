const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const user = tg?.initDataUnsafe?.user;

// اطلاعات ذخیره‌شده بازیکن
let player = JSON.parse(
  localStorage.getItem("memino_player") || "null"
);

// اگر اولین ورود است
if (!player) {
  player = {
    name: user?.first_name || "بازیکن میمینو",
    level: 1,
    coins: 100
  };

  localStorage.setItem("memino_player", JSON.stringify(player));
}

// نمایش نام
const nameElement = document.getElementById("name");
if (nameElement) {
  nameElement.textContent = player.name;
}

// اگر المنت‌های Level و پول وجود دارند، مقدارشان را نمایش بده
const levelElement = document.getElementById("level");
const coinsElement = document.getElementById("coins");

if (levelElement) {
  levelElement.textContent = player.level;
}

if (coinsElement) {
  coinsElement.textContent = player.coins;
}

// دکمه بازی
const playButton = document.getElementById("play");

if (playButton) {
  playButton.onclick = () => {
    playButton.textContent = "⏳ به‌زودی...";

    tg?.HapticFeedback?.impactOccurred("medium");
  };
}

// تنظیمات
const settingsButton = document.getElementById("settings");

if (settingsButton) {
  settingsButton.onclick = () => {
    alert("تنظیمات میمینو به‌زودی فعال می‌شود.");
  };
}
