import axios from 'axios';

const openaiApiKey = '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';

let handler = async (m, { conn }) => {
    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            prompt: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
            max_tokens: 150
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });
        
        const hasil = response.data.choices[0].text.trim();
        m.reply(hasil);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

export default handler;