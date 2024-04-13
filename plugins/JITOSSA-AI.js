import axios from 'axios';

const deepEnglishApiKey = '4c18ae2e-9978-4c6c-a5ff-543d11dd8866';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            messages
        }, {
            headers: {
                'Authorization': `Bearer ${deepEnglishApiKey}`
            }
        });
        const responseData = response.data;
        const hasil = responseData;
        m.reply(hasil.answer);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

export default handler;