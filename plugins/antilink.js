const setAntilinkSetting = global.setAntilinkSetting;
const getAntilinkSetting = global.getAntilinkSetting;

module.exports = {
  config: {
    name: 'antilink',
    aliases: ['al', 'antisticker', 'antikick'],
    permission: 2,
    prefix: true,
    categorie: 'Moderation',
    credit: 'Developed by Mohammad Nayan',
    usages: [
      'antilink off - Disable protection.',
      'antilink all - Block all links + Kick user.',
      'antilink sticker - Block stickers + Kick user.',
    ],
    description: 'Auto-delete links/stickers and kick the sender.',
  },

  start: async ({ event, api, args }) => {
    const { threadId, isSenderAdmin } = event;

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: '❌ Only admins can use this command.' });
    }

    const subCommand = args[0]?.toLowerCase();

    if (!subCommand) {
      const helpMessage = `
*Moderation Settings:*
1. *antilink off* - Turn off all protection.
2. *antilink all* - Kick for any link.
3. *antilink sticker* - Kick for any sticker.
4. *antilink whatsapp* - Kick for WA links.
      `;
      return api.sendMessage(threadId, { text: helpMessage });
    }

    switch (subCommand) {
      case 'off':
        setAntilinkSetting(threadId, 'off');
        await api.sendMessage(threadId, { text: '✅ Protection disabled.' });
        break;
      case 'whatsapp':
        setAntilinkSetting(threadId, 'whatsappGroup');
        await api.sendMessage(threadId, { text: '✅ WA link protection (Kick active).' });
        break;
      case 'all':
        setAntilinkSetting(threadId, 'allLinks');
        await api.sendMessage(threadId, { text: '✅ All links protection (Kick active).' });
        break;
      case 'sticker':
        setAntilinkSetting(threadId, 'sticker');
        await api.sendMessage(threadId, { text: '✅ Antisticker protection (Kick active).' });
        break;
      default:
        await api.sendMessage(threadId, { text: '❌ Invalid command.' });
    }
  },

  event: async ({ event, api }) => {
    const { threadId, senderId, message, type, body, isSenderAdmin } = event;
    const antilinkSetting = getAntilinkSetting(threadId);

    // ১. এডমিন বা প্রোটেকশন অফ থাকলে রিটার্ন
    if (antilinkSetting === 'off' || isSenderAdmin) return;

    let shouldKick = false;
    let reason = "";

    // ২. Sticker Check
    if (antilinkSetting === 'sticker' && (type === 'stickerMessage' || message?.stickerMessage)) {
      shouldKick = true;
      reason = "stickers";
    }

    // ৩. Link Check
    const linkPatterns = {
      whatsappGroup: /chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/,
      allLinks: /https?:\/\/[^\s]+/,
    };

    if (!shouldKick && body) {
      if (
        (antilinkSetting === 'whatsappGroup' && linkPatterns.whatsappGroup.test(body)) ||
        (antilinkSetting === 'allLinks' && linkPatterns.allLinks.test(body))
      ) {
        shouldKick = true;
        reason = "links";
      }
    }

    // ৪. ডিলিট এবং কিক লজিক
    if (shouldKick) {
      try {
        // প্রথমে মেসেজ ডিলিট
        await api.sendMessage(threadId, { delete: message.key });

        // তারপর ইউজারকে কিক করা
        await api.groupParticipantsUpdate(threadId, [senderId], 'remove');

        // গ্রুপে নোটিফিকেশন
        await api.sendMessage(threadId, {
          text: `🚫 @${senderId.split('@')[0]} has been kicked for sending ${reason}.`,
          mentions: [senderId],
        });
      } catch (error) {
        console.error('Auto-kick error:', error);
        // যদি বোট এডমিন না থাকে তবে কিক করতে পারবে না
        await api.sendMessage(threadId, { text: "❌ Failed to kick user. Make sure I am an admin!" });
      }
    }
  },
};
