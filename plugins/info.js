const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: true,
    category: 'Utilities',
    credit: 'Developed by Mohammad Rahi',
    usages: ['info'],
  },
  start: async ({ event, api, loadcmd }) => {
    try {
      const uptimeSeconds = process.uptime();
      const hours = Math.floor(uptimeSeconds / 3600);
      const minutes = Math.floor((uptimeSeconds % 3600) / 60);
      const seconds = Math.floor(uptimeSeconds % 60);

      // System Logic
      const totalCommands = loadcmd.length;
      const cpuModel = os.cpus()[0].model.split(' ')[0]; // Simplified CPU name
      const ramTotal = (os.totalmem() / (1024 ** 3)).toFixed(1); // Total RAM in GB

      const infoMessage = `
╔════════════════════╗
     🛡️ 𝗠𝗔𝗦𝗧𝗘𝗥 𝗗𝗔𝗦𝗛𝗕𝗢𝗔𝗥𝗗 🛡️
╚════════════════════╝

╭━━〔 👤 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐑𝐄 〕━━╮
┃ 
┃ 💠 𝐍𝐚𝐦𝐞   : Mohammad Rahi
┃ 🏡 𝐎𝐫𝐢𝐠𝐢𝐧 : Sylhet, BD
┃ 📘 𝐒𝐭𝐚𝐭𝐮𝐬 : Single Pro Max
┃ 🎯 𝐒𝐤𝐢𝐥𝐥𝐬 : Ride & Coding
┃ 📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭: +8801351634931
┃ 
╰━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🤖 𝐁𝐎𝐓 𝐀𝐍𝐀𝐋𝐘𝐓𝐈𝐂𝐒 〕━━╮
┃
┃ 🚀 𝐌𝐨𝐝𝐞𝐥  : ${global.config.botName || "Rahi Bot"}
┃ ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${hours}𝗵 ${minutes}𝗺 ${seconds}𝘀
┃ 📊 𝐂𝐦𝐝𝐬   : ${totalCommands} Loaded
┃ 🛰️ 𝐒𝐢𝐠𝐧𝐚𝐥 : Excellent [📶]
┃ 🟢 𝐒𝐭𝐚𝐭𝐮𝐬 : Active Operational
┃
╰━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🖥️ 𝐒𝐄𝐑𝐕𝐄𝐑 𝐍𝐎𝐃𝐄 〕━━╮
┃
┃ ⚙️ 𝐂𝐏𝐔    : ${cpuModel} Core
┃ 💾 𝐑𝐀𝐌    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${ramTotal}GB
┃ 🔗 𝐄𝐧𝐠𝐢𝐧𝐞 : Node ${process.version}
┃ 📡 𝐏𝐢𝐧𝐠   : ${Date.now() - event.timestamp}ms
┃
╰━━━━━━━━━━━━━━━━━━━╯
    🔥 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲: 𝐑𝐚𝐡𝐢 🔥`;

      await api.sendMessage(
        event.threadId,
        { 
          image: { url: "https://i.postimg.cc/05p6KqCc/1768548671157.jpg" }, 
          caption: infoMessage 
        }
      );
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching power info.');
    }
  },
};
