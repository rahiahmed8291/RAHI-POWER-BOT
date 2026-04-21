module.exports = {
  event: 'remove',
  handle: async ({ api, event }) => {
    const removedMembers = event.participants;
    
    for (const member of removedMembers) {
      const username = `@${member.split('@')[0]}`;
      
      const goodbyeMessage = 
        `╭━━━〔 🚪 𝗟𝗘𝗙𝗧 / 𝗥𝗘𝗠𝗢𝗩𝗘𝗗 〕━━━╮\n` +
        `┃\n` +
        `┃ 👤 𝗨𝘀𝗲𝗿: ${username}\n` +
        `┃ 📉 𝗦𝘁𝗮𝘁𝘂𝘀: Disconnected\n` +
        `┃ 💔 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: Goodbye! We hope you \n` +
        `┃    had a great time here.\n` +
        `┃\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n` +
        `   ✨ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮 ✨`;

      await api.sendMessage(event.id, {
        text: goodbyeMessage,
        mentions: [member]
      });
    }
  }
};
