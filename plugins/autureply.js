import axios from 'axios';

let welcomed = {}; // Object to track welcomed users

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";

    // التأكد من أن المستخدم لم يتم الترحيب به من قبل
    if (!welcomed[m.sender]) {
        welcomed[m.sender] = true; // تعيين true للمستخدم الذي تم الترحيب به

        await conn.sendMessage(m.chat, { text: `مرحبًا بك في JITOSSA AI، أنا هنا لمساعدتك. يرجى كتابة رسالتك للبدء في المحادثة.`, quoted: m });
    }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler;