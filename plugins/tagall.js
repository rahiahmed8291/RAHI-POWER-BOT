module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall'],
        permission: 3,
        prefix: true,
        description: 'Mentions all members of a group with stylish greetings.',
        categories: 'group',
        usages: [`${global.config.PREFIX}tagall [optional message]`],
        credit: 'Developed by Mohammad Nayan'
    },

    start: async ({ event, api, args }) => {
        const { threadId, senderI, message } = event;

        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants || [];

        if (participants.length === 0) {
            return await api.sendMessage(threadId, { text: '⚠️ No participants found in this group.' });
        }

        
        const greetings = [
            "👋 Hey everyone! Ready for some fun today?",
            "🌟 Hello beautiful people! Stay awesome!",
            "😎 Yo team! Let’s make today amazing!",
            "🎉 Hi friends! Time for some group chaos 😜",
            "💖 Greetings everyone! Spread love and laughter!",
            "🔥 What’s up fam? Let’s rock this group!",
            "🥳 Hello all! Party vibes ON!",
            "😇 Hey legends! Keep smiling today!",
            "⚡ Attention everyone! Fun mode activated!",
            "🌈 Hello stars! Shine bright today!"
        ];

        let customMsg = args.join(' ');
        if (!customMsg) {
            
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        
        let mentionText = `✨ *${customMsg}* ✨\n\n`;
        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `🧡❤️ ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n🧡❤️ Have a great day, everyone!`;

        
        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};

