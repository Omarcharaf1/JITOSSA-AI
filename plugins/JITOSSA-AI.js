import axios from 'axios';

let welcomedUsers = {}; // Object to track welcomed users

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";

    // التأكد من أن الشخص لم يتم الترحيب به من قبل
    if (!welcomedUsers[m.sender]) {
        welcomedUsers[m.sender] = 1; // تعيين قيمة 1 للشخص الذي تم الترحيب به

        await conn.send(m.chat, `مرحبًا بك في JITOSSA AI، أنا هنا لمساعدتك. يرجى كتابة رسالتك للبدء في المحادثة.`);

        return; // توقف عن تنفيذ الكود للمرة الأولى
    }

    // الرد تلقائيًا على الرسائل العادية
    const messages = [
        { role: "user", content: m.text }
    ];

    try {
        const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
            messages
        });
        const responseData = response.data;
        const hasil = responseData;
        await conn.send(m.chat, hasil.answer);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler;