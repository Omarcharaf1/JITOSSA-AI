import axios from 'axios';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!m.text || m.isBaileys || hasLinks(m.text)) return; // التحقق من وجود روابط

    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, `I am a WhatsApp bot, ${name}`);

    const messages = [
        { role: "system", content: `I am a WhatsApp bot, ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            messages
        });
        const responseData = response.data;
        const hasil = responseData;
        await conn.sendMessage(m.chat, `Chatbot: ${hasil.answer}`);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// الدالة للتحقق من وجود روابط
function hasLinks(text) {
    // يمكنك استخدام تعبيرات الاختبار النمطي للتحقق من وجود روابط
    const linkPattern = /https?:\/\/\S+/i;
    return linkPattern.test(text);
}

handler.before = async (m, { conn }) => {
    // لا تنفذ أي شيء قبل وصول الرسالة
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']

export default handler;