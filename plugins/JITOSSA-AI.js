import axios from 'axios';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!m.text || m.isBaileys) return;

    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

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
        await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
        m.reply(hasil.answer);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

handler.before = async (m, { conn }) => {
    if (!m.text || m.isBaileys) return;

    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

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
        await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
        m.reply(hasil.answer);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler;