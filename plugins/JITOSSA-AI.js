import axios from 'axios';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    if (!m.text || m.isBaileys) return;

    let botName = 'جيتوسا AI'; // تعديل اسم البوت هنا
    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, { text: `أنا ${botName}، ${name}.`, quoted: m });

    const messages = [
        { role: "system", content: `أنا ${botName}، ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            messages
        });
        const responseData = response.data;
        const hasil = responseData;
        await conn.sendMessage(m.chat, { text: hasil.answer, quoted: m });
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler;