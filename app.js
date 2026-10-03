const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

// ===============================
// اتصال به Supabase
// ===============================

const SUPABASE_URL = "https://jjxygfpbjeuaqdvvxvgo.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0_AGOWqPWBQgDxoRhb5YhQ_YJzekJW2";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===============================
// اطلاعات کاربر تلگرام
// ===============================

const user = tg?.initDataUnsafe?.user;

// ===============================
// احراز هویت Telegram
// ===============================

async function authenticateTelegram() {
  if (!tg?.initData) {
    console.log("Telegram initData پیدا نشد.");
    return;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/swift-action`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY
        },

        body: JSON.stringify({
          initData: tg.initData
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Telegram authentication failed:", result);
      return;
    }

    console.log("Telegram authentication successful:", result);

  } catch (error) {
    console.error("Connection error:", error);
  }
}

authenticateTelegram();

// ===============================
// اطلاعات بازیکن
// ===============================

let player = JSON.parse(
  localStorage.getItem("memino_player") || "null"
);

// ساخت بازیکن در اولین ورود
if (!player) {
  player = {
    telegramId: user?.id || null,
    username: user?.username || null,
    name: user?.first_name || "مالی",
    level: 1,
    laugh: 500,
    gems: 251
  };

  localStorage.setItem(
    "memino_player",
    JSON.stringify(player)
  );
}

// ===============================
// نمایش اطلاعات بازیکن
// ===============================

const nameElement = document.getElementById("name");

if (nameElement) {
  nameElement.textContent = player.name;
}

const levelElement = document.getElementById("level");

if (levelElement) {
  levelElement.textContent = player.level;
}

const laughElement = document.getElementById("laugh");

if (laughElement) {
  laughElement.textContent = player.laugh;
}

const gemsElement = document.getElementById("gems");

if (gemsElement) {
  gemsElement.textContent = player.gems;
}

// ===============================
// دکمه بازی
// ===============================

const playButton = document.getElementById("play");

if (playButton) {
  playButton.onclick = () => {
    playButton.textContent = "⏳ به‌زودی...";

    tg?.HapticFeedback?.impactOccurred("medium");
  };
}

// ===============================
// تنظیمات
// ===============================

const settingsButton = document.getElementById("settings");

if (settingsButton) {
  settingsButton.onclick = () => {
    alert("تنظیمات میمینو به‌زودی فعال می‌شود.");
  };
}
authenticateTelegram();
alert("Memino app.js loaded");
