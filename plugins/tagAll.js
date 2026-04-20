module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall', 'everyone'],
        permission: 2, // Admin only recommend
        prefix: true,
        description: 'সবাইকে স্টাইলিশ ভাবে মেনশন দিন।',
        category: 'group',
        usages: ['tagall [message]'],
        credit: 'Developed by Rahi Papa'
    },

    start: async ({ event, api, args }) => {
        const { threadId } = event;

        try {
            const groupMetadata = await api.groupMetadata(threadId);
            const participants = groupMetadata.participants || [];
            
            if (participants.length === 0) return;

            // ─── RANDOM STYLISH GREETINGS ───
            const greetings = [
                "🔥 Attention Legends! Wake up!",
                "🌟 Hello Stars! Look at this message!",
                "🛡️ Mainframe Alert! Everyone stay active!",
                "🚀 Rocket speed mention! Check this out!",
                "💎 Diamond vibes! Shine together fam!"
            ];

            let userMsg = args.join(' ') || greetings[Math.floor(Math.random() * greetings.length)];

            let mentionText = `╭━━━〔 📢 𝗔𝗧𝗧𝗘𝗡𝗧𝗜𝗢𝗡 𝗔𝗟𝗟 〕━━━╮\n┃\n`;
            mentionText += `┃ 📝 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${userMsg}\n`;
            mentionText += `┃ 📊 𝗧𝗼𝘁𝗮𝗹: ${participants.length} Members\n`;
            mentionText += `┃ ⚡ 𝗧𝗮𝗴𝗴𝗲𝗱 𝗕𝘆: @${event.sender.split('@')[0]}\n`;
            mentionText += `┃\n╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

            let mentions = [];
            participants.forEach((member, index) => {
                mentionText += ` ${index + 1}. ❯ @${member.id.split('@')[0]}\n`;
                mentions.push({
                    id: member.id,
                    tag: `@${member.id.split('@')[0]}`
                });
            });

            mentionText += `\n✨ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆: 𝗥𝗮𝗵𝗶 𝗣𝗮𝗽𝗮`;

            await api.sendMessage(threadId, {
                text: mentionText,
                mentions: mentions.map(m => m.id)
            });

        } catch (error) {
            console.error(error);
            await api.sendMessage(threadId, { text: "❌ Group metadata fetch failed!" });
        }
    }
};        let customMsg = args.join(' ');
        if (!customMsg) {
            
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        
        let mentionText = `✨ *${customMsg}* ✨\n\n`;
        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `🔹 ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n💌 Have a great day, everyone!`;

        
        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};
