
let handler = async (m, { conn }) => {
    // قم بتحديث هذه الرسالة لتكون الرسالة التي ترغب في إرسالها كرد تلقائي
    const autoReplyMessage = "مرحباً، شكرًا للتواصل معنا. سوف نقوم بالرد عليك في أقرب وقت ممكن.";

    // تأكد من أن هذه الرسالة تأتي فقط كرسالة أولية في المحادثة
    if (!m.isGroup && !m.isBaileys && !m.text.startsWith(".") && !m.text.startsWith("#") && !m.text.startsWith("!") && !m.text.startsWith("/") && !m.text.startsWith("\\")) {
        conn.sendMessage(m.chat, autoReplyMessage);
    }
}

handler.before = async (m, { conn }) => {
    // لا تنفذ أي شيء قبل وصول الرسالة
}

handler.command = [];
handler.tags = ["auto-reply"]
handler.help = ["auto-reply"]

export default handler;
