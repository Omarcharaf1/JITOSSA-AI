import axios from 'axios';

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
        const response = await axios.post("https://api.deepai.org/api/text-generator", {
            text: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
            type: 'text-davinci-003',
            max_tokens: 150
        }, {
            headers: {
                'Api-Key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'
            }
        });
        const hasil = response.data.output.trim();
        m.reply(hasil);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

handler.before = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://api.deepai.org/api/text-generator", {
            text: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
            type: 'text-davinci-003',
            max_tokens: 150
        }, {
            headers: {
                'Api-Key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'
            }
        });
        const hasil = response.data.output.trim();
        m.reply(hasil);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

export default handler;