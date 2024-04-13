import axios from 'axios';

let welcomedUsers = {}; // Object to track welcomed users

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";

    // التأكد من أن الشخص لم يتم الترحيب به من قبل
    if (!welcomedUsers[m.sender]) {
        welcomedUsers[m.sender] = true; // تعيين قيمة true للشخص الذي تم الترحيب به

        await conn.sendMessage(m.chat, { text: `مرحبًا بك في JITOSSA AI، أنا هنا لمساعدتك. يرجى كتابة رسالتك للبدء في المحادثة.` });

        const messages = [
            { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
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
            console.error("حدث خطأ أثناء جلب البيانات:", error);
            throw error;
        }
    } else {
        // رد تلقائي للرسائل العادية
        const messages = [
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
            console.error("حدث خطأ أثناء جلب البيانات:", error);
            throw error;
        }
    }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler;