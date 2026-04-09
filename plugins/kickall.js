const isAdmin = global.isAdmin;

module.exports = {
  config: {
    name: 'kickall',
    aliases: ['remove', 'kickall'],
    permission: 2,
    prefix: true,
    categorie: 'Moderation',
    credit: 'Developed by Mohammad Nayan',
    description: 'Kicks a user or everyone from the group.',
    usages: [
      `${global.config.PREFIX}kick @username - Remove a tagged user.`,
      `${global.config.PREFIX}kick all - Remove everyone from the group.`,
    ]
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId, mentions, message } = event;
    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

    // ১. চেক: বোট এডমিন কি না
    if (!isBotAdmin) {
      return api.sendMessage(threadId, { text: '❌ Please make the bot an admin first.' });
    }

    // ২. চেক: ইউজার এডমিন কি না
    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: '❌ Only group admins can use this command.' });
    }

    // --- Kick All Logic ---
    if (args[0] === "all") {
      try {
        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants;
        
        // নিজের আইডি এবং এডমিনদের বাদ দিয়ে কিক লিস্ট তৈরি (বোট নিজেকে কিক করবে না)
        const botNumber = api.user.id.split(':')[0] + '@s.whatsapp.net';
        const toKick = participants
          .filter(p => p.id !== botNumber && p.id !== senderId)
          .map(p => p.id);

        if (toKick.length === 0) {
          return api.sendMessage(threadId, { text: 'There is no one else to kick.' });
        }

        await api.sendMessage(threadId, { text: `🧹 Cleaning up the group... Removing ${toKick.length} members.` });
        
        await api.groupParticipantsUpdate(threadId, toKick, 'remove');
        return api.sendMessage(threadId, { text: '✅ Success! All members have been removed.' });
      } catch (err) {
        console.error(err);
        return api.sendMessage(threadId, { text: '❌ Failed to kick everyone. Check bot permissions.' });
      }
    }

    // --- Single Kick Logic (Reply or Mention) ---
    const replyMessage = message.message?.extendedTextMessage?.contextInfo;

    if (replyMessage && replyMessage.participant) {
      const userToKick = replyMessage.participant;
      await api.groupParticipantsUpdate(threadId, [userToKick], 'remove');
      return api.sendMessage(threadId, { text: '✅ User has been kicked from the group.' });
    }

    if (mentions.length > 0) {
      await api.groupParticipantsUpdate(threadId, mentions, 'remove');
      return api.sendMessage(threadId, { text: '✅ User(s) have been kicked from the group.' });
    } else {
      return api.sendMessage(threadId, { text: '⚠️ Please reply to a message, tag someone, or use "kick all".' });
    }
  },
};
