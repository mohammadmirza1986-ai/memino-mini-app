const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

// اطلاعات کاربر تلگرام
const user = tg?.initDataUnsafe?.user;

// اطلاعات ذخیره‌شده بازیکن
let player = JSON.parse(
  localStorage.getItem("memino_player") || "null"
);

// ساخت حساب در اولین ورود
if (!player) {
  player = {
    telegramId: user?.id || null,
    username: user?.username || null,
    name: user?.first_name || "مالی",
    level: 1,
    laugh: 500,
    gems: 250
  };

  localStorage.setItem(
    "memino_player",
    JSON.stringify(player)
  );
}

// نمایش نام
const nameElement = document.getElementById("name");

if (nameElement) {
  nameElement.textContent = player.name;
}

// نمایش سطح
const levelElement = document.getElementById("level");

if (levelElement) {
  levelElement.textContent = player.level;
}

// نمایش خنده
const laughElement = document.getElementById("laugh");

if (laughElement) {
  laughElement.textContent = player.laugh;
}

// نمایش جم
const gemsElement = document.getElementById("gems");

if (gemsElement) {
  gemsElement.textContent = player.gems;
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
