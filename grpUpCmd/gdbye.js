module.exports = {
  event: 'remove',
  handle: async ({ api, event }) => {
    const removedMembers = event.participants;
    for (const member of removedMembers) {
      await api.sendMessage(event.id, {
        text: `Goodbye @${member.split('@')[0]}, we'll miss you
        
       > 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚁𝙰𝙷𝙸!`,
        mentions: [member]
      });
    }
  }
};
