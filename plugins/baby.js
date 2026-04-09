const axios = require("axios");

module.exports = {
  config: {
    name: "baby",
    aliases: ["sem"],
    permission: 0,
    prefix: "both",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Mohammad rahi",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");


    if (!usermsg) {
      const greetings = [
        "বাবু ও বাবু আমায় ডাকলে কেন আমার তো লজ্জা লাগে 🙈💖",
        "বেশি ডাকলে কিন্তু রাহি বসের কাছে বিচার দেবো তখন সামলাতে পারবে তো 😂",
        "অলে বাবালে আমায় এতো ডাকো কেন আমাল যে এখন খেলতে যাওয়ার সময় হয়েছে 🧸⚽",
        "আমাল পঁচন পছন্দ বাবুটা আমায় ডাকছে বলো তো বাবু কি বলবা 🙈💖",
        "আমায় শুধু ডাকলে হবে আমাল জন্য চকোলেট আনছো আমাল খুব ক্ষুধা পাইছে 🍫🍼",
        "চকোলেট না দিলে কিন্তু আমি কথা বলবো না আগে চকোলেট দাও 🍬😋",
        "তুমি কি আমাল সাথে লুকোচুরি খেলবা আমি কিন্তু লুকাচ্ছি আমায় খুঁজে নাও 🙈🔍",
        "বার বার ডাকলে আমি কিন্তু কান্না করে দেবো উঁয়া উঁয়া তখন সামলাতে পারবা তো 😭💢",
        "উম্মম আমাল খুব ঘুম পাচ্ছে আমায় একটু কোলে নিয়ে ঘুম পাড়িয়ে দিবা 😴💤",
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


    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}&number=${senderId.split('@')[0]}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot command error:", err);
      return api.sendMessage(threadId, { text: "❌ Something went wrong while talking with bot." }, { quoted: message });
    }
  },


  handleReply: async function ({ api, event, handleReply }) {

    const { threadId, message, body, senderId } = event;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}&number=${senderId.split('@')[0]}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Error in bot handleReply:", err);
      return api.sendMessage(threadId, { text: "❌ Failed to continue conversation." }, { quoted: message });
    }
  }
};
