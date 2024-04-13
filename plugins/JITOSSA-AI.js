import axios from 'axios';

const deepaiApiKey = '4c18ae2e-9978-4c6c-a5ff-543d11dd8866';

let handler = async (m, { conn }) => {
    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.deepai.org/api/text-generator',
            headers: {
                'Api-Key': deepaiApiKey
            },
            data: {
                text: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
                type: 'text-davinci-003',
                max_tokens: 150
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