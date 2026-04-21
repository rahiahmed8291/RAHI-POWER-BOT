module.exports = {
  event: 'promote',
  handle: async ({ api, event }) => {
    const promotedMembers = event.participants;
    
    for (const member of promotedMembers) {
      const username = `@${member.split('@')[0]}`;
      
      const promoteMessage = 
        `╔════════════════════╗\n` +
        ` 🔥 𝗔𝗗𝗠𝗜𝗡 𝗣𝗥𝗢𝗠𝗢𝗧𝗘𝗗 🔥\n` +
        `╚════════════════════╝\n\n` +
        `🎊 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀: ${username}\n` +
        `📈 𝗦𝘁𝗮𝘁𝘂𝘀: New Admin Assigned\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `⚔️ 𝗬𝗼𝘂 𝗻𝗼𝘄 𝗵𝗮𝘃𝗲 𝘁𝗵𝗲 𝗽𝗼𝘄𝗲𝗿 𝘁𝗼 \n` +
        `   𝗺𝗮𝗻𝗮𝗴𝗲 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽. 𝗨𝘀𝗲 𝗶𝘁 \n` +
        `   𝘄𝗶𝘀𝗲𝗹𝘆 𝗮𝗻𝗱 𝗯𝗲 𝗮 𝗹𝗲𝗮𝗱𝗲𝗿!\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🚀 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮`;

      await api.sendMessage(event.id, {
        text: promoteMessage,
        mentions: [member]
      });
    }
  }
};
