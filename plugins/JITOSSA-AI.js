import OpenAI from 'openai';

// Replace 'you' with your actual OpenAI API key
const openai = new OpenAI('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');

let handler = async (m, { conn }) => {
    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await openai.complete({
            engine: 'text-davinci-003', // GPT-3.5 engine
            prompt: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
            maxTokens: 150
        });
        const hasil = response.data.choices[0].text.trim();
        m.reply(hasil);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

handler.before = async (m, { conn }) => {
    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        const response = await openai.complete({
            engine: 'text-davinci-003', // GPT-3.5 engine
            prompt: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
            maxTokens: 150
        });
        const hasil = response.data.choices[0].text.trim();
        m.reply(hasil);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

export default handler;