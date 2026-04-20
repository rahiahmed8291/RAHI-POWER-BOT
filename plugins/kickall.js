const isAdmin = global.isAdmin;

module.exports = {
  config: {
    name: 'kickall',
    aliases: ['removeall', 'clearall'],
    permission: 2, // Admin permission
    prefix: true,
    categorie: 'Moderation',
    credit: 'Developed by Mohammad Rahi',
    description: 'Kicks all non-admin members from the group.',
    usages: [`${global.config.PREFIX}kickall`]
  },

  start: async ({ event, api }) => {
    const { threadId, senderId } = event;

    try {
      // Admin and Bot status check
      const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

      if (!isBotAdmin) {
        return api.sendMessage(threadId, { text: 'Bot-ke age group admin banate hobe!' });
      }

      if (!isSenderAdmin) {
        return api.sendMessage(threadId, { text: 'Ei command sudhu group admin-ra use korte parben.' });
      }

      // Group details fetch kora
      const groupMetadata = await api.groupMetadata(threadId);
      const botId = api.getCurrentUserID ? api.getCurrentUserID() : api.user.id; 

      // Participant filter kora (Jara admin na ebong bot nije na)
      const participants = groupMetadata.participants;
      const victimList = participants
        .filter(p => !p.admin && p.id !== botId && p.id !== undefined)
        .map(p => p.id);

      if (victimList.length === 0) {
        return api.sendMessage(threadId, { text: 'Group-e kick korar moto kono normal member pawa jayni.' });
      }

      await api.sendMessage(threadId, { text: `Mot ${victimList.length} jon-ke kick kora shuru hocche. Ete kichu somoy lagte pare...` });

      // Kick loop ba bulk remove
      // Note: Ekebare beshi member kick korle WhatsApp account ban hote pare, tai safely kora bhalo
      await api.groupParticipantsUpdate(threadId, victimList, 'remove');

      await api.sendMessage(threadId, { text: 'Successfully shobai-ke remove kora hoyeche.' });

    } catch (error) {
      console.error('Kickall Error:', error);
      await api.sendMessage(threadId, { text: 'Command-ti execute korte somossa hoyeche. Metadata fetch korte somossa hote pare.' });
    }
  },
};
