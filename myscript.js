// Меню
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const body = document.body;
  navMenu.classList.toggle("active");
  body.classList.toggle("menu-open");
  }
  
  document.addEventListener("click", function (event) {
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.querySelector(".menu-icon");
  if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
  navMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
  }
  });
  
  let map = document.getElementsByClassName("map-card");
  function cardanimation() {
  for (let i = 0; i < map.length; i++) {
  map[i].addEventListener("mouseover", function () {
  map[i].style.transform = "scale(1.1)";
  });
  map[i].addEventListener("mouseout", function () {
  map[i].style.transform = "scale(1)";
  });
  }
  }
  cardanimation();
  window.addEventListener("resize", cardanimation);
  
  // Чат‑бот с ChatGPT
  async function askChatGPT(question) {
    const apiKey = "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";
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });
  
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      return "Произошла ошибка при получении ответа от ИИ.";
    }
  }
  
  async function sendMessage() {
  const inputEl = document.getElementById("user-input");
  const outputEl = document.getElementById("chat-output");
  let text = inputEl.value.trim();
  if (!text) return;
  
  const userDiv = document.createElement("div");
  userDiv.className = "message user-message";
  userDiv.textContent = "Вы: " + text;
  outputEl.appendChild(userDiv);
  inputEl.value = "";
  
  const botDiv = document.createElement("div");
  botDiv.className = "message bot-message";
  botDiv.textContent = "Бот: печатает...";
  outputEl.appendChild(botDiv);
  outputEl.scrollTop = outputEl.scrollHeight;
  
  try {
  const reply = await askChatGPT(text);
  botDiv.textContent = "Бот: " + reply;
  } catch (err) {
  botDiv.textContent = "Ошибка: не удалось получить ответ от сервера.";
  }
  
  outputEl.scrollTop = outputEl.scrollHeight;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("send-btn").addEventListener("click", sendMessage);
  document.getElementById("user-input").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
  });
  });
  
  function toggleChat(show) {
    document.getElementById("chat-modal").style.display = show ? "block" : "none";
    if (show) document.getElementById("user-input").focus();
  }