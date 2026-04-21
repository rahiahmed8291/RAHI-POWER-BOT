module.exports = function () {
  const botName = global.config.botName || "RAHI BOT";
  const prefix = global.config.PREFIX || ".";
  const owner = global.config.botOwner || "Mohammad Rahi";
  const adminContact = global.config.admin[0] || "8801751741382";

  return `
╭━━━〔 ⚡ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗢𝗡𝗟𝗜𝗡𝗘 〕━━━╮

  Assalamu Alaikum ☘️
  ${botName} 𝗶𝘀 𝗻𝗼𝘄 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱!

╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〔 🛠️ 𝗤𝗨𝗜𝗖𝗞 𝗚𝗨𝗜𝗗𝗘 〕━━━━╮
┃
┃ 🟢 𝗦𝘁𝗮𝘁𝘂𝘀: Active & Ready
┃ 📜 𝗠𝗲𝗻𝘂  : ${prefix}help or ${prefix}menu
┃ 🛡️ 𝗔𝗱𝗺𝗶𝗻 : ${prefix}info (Owner Info)
┃ 📥 𝗗𝗼𝘄𝗻  : ${prefix}alldown [link]
┃ 🔓 𝗔𝗰𝗰𝗲𝘀𝘀: Approval Allowed ✅
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〔 👤 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗨𝗦 〕━━━━╮
┃
┃ 👑 𝗢𝘄𝗻𝗲𝗿 : ${owner}
┃ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: wa.me/${adminContact.replace('+', '')}
┃ 💡 𝗡𝗼𝘁𝗲  : For any issues, contact admin.
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
   🚀 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮`;
};
