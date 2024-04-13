import axios from 'axios';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!m.text || m.isBaileys || hasLinks(m.text)) return;

    let botName = 'JITOSSA AI';
    const autoReplyMessage = `أنا ${botName}، مساعدك الافتراضي.`;

    // قائمة الكلمات المحظورة
    const bannedWords = ['spam', 'link', 'banned'];

    if (containsBannedWords(m.text, bannedWords)) return;

    await conn.sendMessage(m.chat, { text: autoReplyMessage });

    const messages = [
        { role: "system", content: autoReplyMessage },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            messages
        });
        const responseData = response.data;
        const hasil = responseData;
        await conn.sendMessage(m.chat, { text: `${botName}: ${hasil.answer}` });
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function hasLinks(text) {
    const linkPattern = /https?:\/\/\S+/i;
    return linkPattern.test(text);
}

function containsBannedWords(text, wordsList) {
    const lowerCaseText = text.toLowerCase();
    for (let word of wordsList) {
        if (lowerCaseText.includes(word)) {
            return true;
        }
    }
    return false;
}

handler.before = async (m, { conn }) => {
    // لا تنفذ أي شيء قبل وصول الرسالة
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']

export default handler;