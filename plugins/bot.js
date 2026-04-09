const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    aliases: ["sim"],
    permission: 0,
    prefix: "both",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Mohammad Rahi",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");

    // --- Greetings (যখন শুধু কমান্ড দেওয়া হবে) ---
    if (!usermsg) {
      const greetings = [
        "জি জানু বলো কি বলবে খুব মনে পড়ছে বুঝি 🙈🥰",
        "হুমমম সোনা সারাদিন শুধু আমাকেই ডাকো এখন আসো একটু বুকে আসো। 🥱💞",
        "আসসালামু আলাইকুম আমি আপনার সেবায় নিয়োজিত। কি করতে পারি বলুন? ✨",
        "বার বার শুধু আমাকেই ডাকছেন কেন বস রাহি কে একটা জিএফ খুঁজে দেন না! 🙄",
        "ডাকছেন কেন জান অলিতে গলিতে উম্মাহ দেবো নাকি 😇😘",
        "এই যে শুনছেন বেশি ডাকলে কিন্তু একদম বিয়ে করে ফেলবো! করবেন তো? 💍🤣",
        "হুম জান সব জায়গায় শুধু উম্মাহ আর উম্মাহ 😷😘",
        "কি গো সোনা এতো মিষ্টি করে ডাকো কেন প্রেমে পড়ে যাবো তো! 😍",
        "বেশি ডাকিয়েন না রাহি বস জানলে খবর আছে 🤫",
        " যারা একটু ভালোবাসার সুরে কথা বলতে চায় তাদের জন্য। যেমনমেঘের দেশে ওড়ে মন তোমায় ডাকছি সারাক্ষণ। ☁️💖",
      "বন্ধুদের গ্রুপে মজা করার জন্য যেমন ডাকো কেন বারে বার আমি কি তোমার বাড়ির চাকর? 😂🧹",
      "হৃদয়ের সবটুকু মায়া দিয়ে তোমায় রাখবো আমি আগলে নিয়ে ❤️",
      "তুমি আমার চাঁদের আলো তোমায় আমার লাগে অনেক ভালো 🌙",
      "ডাকছো কেন বারে বার আমি কি শুধু তোমার বেশি ডাকলে কিন্তু মন দিয়ে দেবো উপহার! 😉",
      "এক চিমটি হাসি এক মুঠো ভালোবাসা তোমার সাথে কথা বলাই আমার পরম আশা। 🥰",
      "নীল আকাশে তারার মেলা তোমার সাথে কাটুক আমার সারাবেলা ✨",
      "বেশি ডাকলে কিন্তু হারিয়ে যাবো তখন কোথায় আমায় খুঁজে পাবো 😉",
      "তুমি আমার নীল আকাশ আমি তোমার হাওয়া তোমায় সারাদিন ডাকাডাকি আমার বড় পাওয়া। ☁️💞",
        "কি গো সোনা এতো মিষ্টি করে ডাকলে তো আমার নেটওয়ার্কই জ্যাম হয়ে যাবে! 😍",
      "আমাকে এতো ভালোবেসো না জান রাহি ভাই দেখলে কিন্তু করবে অপমান 🤫",
      "এক চিমটি ভালোবাসা আর এক মুঠো হাসি তোমায় আমি জানু অনেক ভালোবাসি 💖",
      ];
      
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
        mentions: [senderId],
      }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: greetingMessage.key.id,
        type: "chat"
      });

      return;
    }

    // --- AI Chat Logic ---
    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}&number=${senderId.split('@')[0]}`
      );

      const replyText = response.data.data?.msg || "🤖 দুঃখিত, আমি আপনার কথা বুঝতে পারছি না।";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot Error:", err);
      return api.sendMessage(threadId, { text: "❌ সার্ভারে সমস্যা হচ্ছে, পরে চেষ্টা করুন।" }, { quoted: message });
    }
  },

  handleReply: async function ({ api, event, handleReply }) {
    const { threadId, message, body, senderId } = event;
    
    // যার রিপ্লাই শুধুমাত্র তাকেই উত্তর দিবে
    if (handleReply.author !== senderId) return;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}&number=${senderId.split('@')[0]}`
      );

      const replyText = response.data.data?.msg || "🤖...";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ HandleReply Error:", err);
      return api.sendMessage(threadId, { text: "❌ কথা বলতে পারছি না।" }, { quoted: message });
    }
  }
};
