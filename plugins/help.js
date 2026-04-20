const axios = require("axios");

module.exports = {
  config: {
    name: 'help',
    aliases: ['menu', 'list', 'commands'],
    permission: 0,
    prefix: true,
    description: 'বটের সকল কমান্ড এবং তথ্য দেখুন।',
    category: 'Utility',
    credit: 'Developed by Mohammad Rahi',
    usages: ['help', 'help [command]'],
  },

  start: async ({ event, api, args, loadcmd }) => {
    const { threadId, getPrefix } = event;
    const getAllCommands = () => loadcmd.map((plugin) => plugin.config);
    const commands = getAllCommands();
    const prefix = await getPrefix(threadId) || global.config.PREFIX;

    const mergedCategories = {
      "🛡️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗚𝗨𝗔𝗥𝗗": ["Moderation", "Group Management", "group"],
      "🧠 𝗖𝗢𝗚𝗡𝗜𝗧𝗜𝗩𝗘 𝗔𝗜": ["AI", "AI Chat"],
      "🎬 𝗩𝗜𝗦𝗨𝗔𝗟 𝗛𝗨𝗕": ["Media", "Video", "Image"],
      "⚙️ 𝗘𝗡𝗚𝗜𝗡𝗘 𝗞𝗜𝗧": ["Utility", "Utilities", "System", "Information"],
      "🎡 𝗥𝗘𝗖𝗥𝗘𝗔𝗧𝗜𝗢𝗡": ["Fun", "Games", "greetings"],
      "🔑 𝗖𝗢𝗡𝗧𝗥𝗢𝗟 𝗖𝗘𝗡𝗧𝗘𝗥": ["Administration", "Admin", "Owner", "Bot Management"]
    };

    const categories = {};
    commands.forEach((cmd) => {
      let cat = cmd.category || cmd.categorie || cmd.categories || "📦 𝗠𝗜𝗦𝗖 𝗗𝗔𝗧𝗔";
      for (const merged in mergedCategories) {
        if (mergedCategories[merged].includes(cat)) {
          cat = merged;
          break;
        }
      }
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd);
    });

    // ───── RANDOM TIPS ─────
    const tips = [
      "Detail জানতে help [command] লিখুন।",
      "Rahi Bot ব্যবহার করার জন্য ধন্যবাদ!",
      "বট আপডেট পেতে Owner এর সাথে যোগাযোগ রাখুন।",
      "কমান্ডের আগে সঠিক প্রিফিক্স ব্যবহার করুন।"
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // ───── SINGLE COMMAND INFO ─────
    if (args[0]) {
      const command = commands.find((cmd) => cmd.name.toLowerCase() === args[0].toLowerCase());
      if (command) {
        const infoText = `
╭───╼ ◈ 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ◈ ╾───╮
│
│ 💠 𝗡𝗮𝗺𝗲: ${command.name}
│ 🏷️ 𝗔𝗹𝗶𝗮𝘀: ${command.aliases?.join(", ") || "None"}
│ 📝 𝗗𝗲𝘀𝗰: ${command.description || "No info."}
│ ⚙️ 𝗨𝘀𝗮𝗴𝗲: ${command.usage || command.usages?.join("\n│        ") || "Not set"}
│ 🔐 𝗣𝗲𝗿𝗺: ${command.permission == 2 ? "Admin" : "User"}
│
╰───────────────💎
𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 `;
        return await api.sendMessage(threadId, { text: infoText });
      }
    }

    // ───── SYSTEM DATA ─────
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    // ───── MAIN HELP MENU ─────
    let responseText = `╭━━━〔 𝗥𝗔𝗛𝗜 𝗦𝗬𝗦𝗧𝗘𝗠 〕━━━╮\n`;
    responseText += `┃ 👑 𝗢𝘄𝗻𝗲𝗿: ${global.config.botOwner || "Mohammad Rahi"}\n`;
    responseText += `┃ ⚡ 𝗣𝗿𝗲𝗳𝗶𝘅: 「 ${prefix} 」\n`;
    responseText += `┃ ⏳ 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}h ${minutes}m\n`;
    responseText += `┃ 📊 𝗧𝗼𝘁𝗮𝗹: ${commands.length} Commands\n`;
    responseText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

    for (const category in categories) {
      responseText += `┌──『 ${category} 』\n`;
      const cmdList = categories[category].map(cmd => `│ ✥ ${cmd.name}`).join("\n");
      responseText += `${cmdList}\n└───────────────🌀\n\n`;
    }

    responseText += `💡 𝗧𝗶𝗽: ${randomTip}\n`;
    responseText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    responseText += `🔥 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 `;

    try {
      const response = await axios.get(global.config.helpPic, { responseType: 'stream' });
      await api.sendMessage(threadId, {
        image: { stream: response.data },
        caption: responseText
      });
    } catch {
      await api.sendMessage(threadId, { text: responseText });
    }
  },
};