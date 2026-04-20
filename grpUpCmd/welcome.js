module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    // ─── GET CURRENT TIME GREETING ───
    const hour = new Date().getHours();
    const timeWish = hour < 12 ? "Good Morning 🌅" : hour < 17 ? "Good Afternoon ☀️" : "Good Evening 🌃";

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = "https://i.postimg.cc/05p6KqCc/1768548671157.jpg"; // Default image if none found
      }

      const username = `@${member.split('@')[0]}`;
      
      const welcomeMessage = 
        `╔════════════════════╗\n` +
        `     ✨ 𝗡𝗘𝗪 𝗠𝗘𝗠𝗕𝗘𝗥 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 ✨\n` +
        `╚════════════════════╝\n\n` +
        `👋 ${timeWish}, ${username}!\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🎊 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼: ${groupName}\n` +
        `📊 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗼𝘂𝗿: ${totalMembers}𝘁𝗵 𝗠𝗲𝗺𝗯𝗲𝗿\n` +
        `📜 𝗚𝗿𝗼𝘂𝗽 𝗥𝘂𝗹𝗲𝘀: Read Description!\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚀 𝗘𝗻𝗷𝗼𝘆 𝘆𝗼𝘂𝗿 𝘀𝘁𝗮𝘆 & 𝘀𝘁𝗮𝘆 𝗮𝗰𝘁𝗶𝘃𝗲!\n\n` +
        `🔥 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮`;

      await api.sendMessage(event.id, {
        image: { url: profilePicUrl },
        caption: welcomeMessage,
        mentions: [member]
      });
    }
  }
};
