const axios = require('axios');

module.exports = {
    config: {
        name: "gitclone",
        aliases: ["git", "github", "clone"],
        permission: 0,
        prefix: true,
        description: "Download GitHub repositories directly from link.",
        categories: "tools",
        usages: [".gitclone https://github.com/rahiahmed8291/RAHI-POWER-BOT.git"],
        credit: "Mohammad Rahi"
    },

    start: async ({ event, api, args }) => {
        const { threadId, message } = event;
        const repoUrl = args[0];

        if (!repoUrl || !repoUrl.includes("github.com")) {
            return api.sendMessage(threadId, { 
                text: "❌ Rahi Bhai, shothik GitHub repository link-ti din!\n\nExample: `.gitclone https://github.com/rahiahmed8291/RAHI-POWER-BOT.git`" 
            });
        }

        // 🔍 Username and Repo name extraction logic
        const cleanUrl = repoUrl.replace(".git", "");
        const parts = cleanUrl.split("/");
        const user = parts[parts.length - 2];
        const repoName = parts[parts.length - 1];

        await api.sendMessage(threadId, { text: `🛡️ *RAHI POWER BOT* is cloning:\n📦 Repo: ${repoName}\n👤 Owner: ${user}\n\nPlease wait...` });

        try {
            // Priority 1: Try 'main' branch
            const mainUrl = `https://github.com/${user}/${repoName}/archive/refs/heads/main.zip`;
            
            await api.sendMessage(threadId, {
                document: { url: mainUrl },
                fileName: `${repoName}-main.zip`,
                mimetype: 'application/zip',
                caption: `✅ *Cloned Successfully!*\n\n🚀 Repo: ${repoName}\n👑 Powered by: Rahi Power Bot`
            }, { quoted: message });

        } catch (e) {
            try {
                // Priority 2: Fallback to 'master' branch
                const masterUrl = `https://github.com/${user}/${repoName}/archive/refs/heads/master.zip`;
                
                await api.sendMessage(threadId, {
                    document: { url: masterUrl },
                    fileName: `${repoName}-master.zip`,
                    mimetype: 'application/zip',
                    caption: `✅ *Cloned (Master Branch)!*\n\n🚀 Repo: ${repoName}`
                }, { quoted: message });
            } catch (err) {
                api.sendMessage(threadId, { text: "❌ Repository-ti private hote pare ba link-e somossya ache!" });
            }
        }
    }
};
