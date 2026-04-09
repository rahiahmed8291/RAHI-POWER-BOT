const isAdmin = global.isAdmin;

module.exports = {
  config: {
    name: 'kickall',
    aliases: ['clean', 'removeall'],
    permission: 2, 
    prefix: true,
    categorie: 'Moderation',
    credit: 'Developed by Mohammad rahi',
    description: 'Removes all members from the group except the admin and the bot.',
    usages: [`${global.config.PREFIX}kickall`]
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId } = event;
    
    try {
      // ১. এডমিন চেক
      const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

      if (!isBotAdmin) {
        return api.sendMessage(threadId, { text: '❌ আগে আমাকে গ্রুপের এডমিন করুন!' });
      }

      if (!isSenderAdmin) {
        return api.sendMessage(threadId, { text: '❌ এই কমান্ডটি শুধু এডমিনরা ব্যবহার করতে পারবেন।' });
      }

      // ২. মেম্বার লিস্ট সংগ্রহ
      const groupMetadata = await api.groupMetadata(threadId);
      const participants = groupMetadata.participants;
      
      // বোটের নিজের আইডি (সঠিক ফরম্যাটে)
      const botNumber = api.user.id.includes(':') ? api.user.id.split(':')[0] + '@s.whatsapp.net' : api.user.id;

      // ৩. কিক লিস্ট ফিল্টার (বোট এবং কমান্ডদাতাকে বাদ দিয়ে)
      const toKick = participants
        .filter(p => p.id !== botNumber && p.id !== senderId)
        .map(p => p.id);

      if (toKick.length === 0) {
        return api.sendMessage(threadId, { text: '❌ কিক করার মতো কেউ নেই!' });
      }

      await api.sendMessage(threadId, { text: `🧹 ক্লিনিং শুরু হচ্ছে... মোট ${toKick.length} জনকে রিমুভ করা হবে।` });

      // ৪. লুপ চালিয়ে কিক করা
      for (let i = 0; i < toKick.length; i++) {
        try {
          // নির্দিষ্ট ইউজারের আইডি দিয়ে রিমুভ রিকোয়েস্ট
          await api.groupParticipantsUpdate(threadId, [toKick[i]], 'remove');
          
          // প্রতি কিকের মাঝে ২ সেকেন্ড বিরতি (ব্যান প্রোটেকশন)
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.error(`Failed to kick ${toKick[i]}:`, e);
        }
      }
      
      return api.sendMessage(threadId, { text: '✅ সফলভাবে গ্রুপ পরিষ্কার করা হয়েছে।' });

    } catch (err) {
      console.error("Kickall Error:", err);
      return api.sendMessage(threadId, { text: '❌ একটি টেকনিক্যাল এরর হয়েছে। বোটকে পুনরায় এডমিন দিয়ে চেষ্টা করুন।' });
    }
  }
};
