const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
➥ 𝐇𝐞𝐲 𝐌𝐫/𝐦𝐢𝐬𝐬 
╭────《  𝐌𝐘 𝐒𝐄𝐋𝐅 》────⊷
│ ╭────────✧❁✧────────◆
│ │ 🌸 𝐍𝐀𝐌𝐄 :- 𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐑𝐀𝐇𝐈
│ │ 🏡 𝐅𝐑𝐎𝐌 :- 𝐒𝐘𝐋𝐇𝐄𝐓 𝐆𝐎𝐋𝐀𝐏𝐆𝐎𝐍𝐉 
│ │ 📘 𝐂𝐋𝐀SS𝐒 :- 𝐇𝐈𝐃𝐄
│ │ 💖 𝐑𝐋𝐒 :- 𝐒𝐈𝐍𝐆𝐋𝐄 𝐔𝐋𝐓𝐀 𝐏𝐑𝐎 𝐌𝐀𝐗
│ │ 🎯 𝐇𝐎𝐁𝐁𝐘 :- 𝐑𝐈𝐃𝐄 & 𝐂𝐎𝐃𝐈𝐍𝐆
│ │ ☎️ 𝐍𝐔𝐌𝐁𝐄𝐑 :- +8801751741382
│ │ ..𝐘𝐎𝐔 𝐂𝐀𝐍 𝐒𝐄𝐄 𝐌𝐘 𝐒𝐓𝐀𝐓𝐔𝐒..
│ ╰────────✧❁✧────────◆
╰══════════════════⊷
--------------------------------------------
--------------------------------------------
\`\`\`
🖥️ Server Info:
𝐎𝐖𝐍𝐄𝐑 𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐑𝐀𝐇𝐈
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://i.postimg.cc/05p6KqCc/1768548671157.jpg" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};
