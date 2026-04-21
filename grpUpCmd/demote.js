module.exports = {
  event: 'demote',
  handle: async ({ api, event }) => {
    const demotedMembers = event.participants;
    
    for (const member of demotedMembers) {
      const username = `@${member.split('@')[0]}`;
      
      const demoteMessage = 
        `╔════════════════════╗\n` +
        `     ⚠️  𝗔𝗗𝗠𝗜𝗡 𝗗𝗘𝗠𝗢𝗧𝗘𝗗  ⚠️\n` +
        `╚════════════════════╝\n\n` +
        `👤 𝗨𝘀𝗲𝗿: ${username}\n` +
        `📉 𝗦𝘁𝗮𝘁𝘂𝘀: Authority Removed\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `📝 𝗡𝗼𝘁𝗲: Powers have been revoked. Please follow the group rules to regain trust.\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🔥 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮`;

      await api.sendMessage(event.id, {
        text: demoteMessage,
        mentions: [member]
      });
    }
  }
};
