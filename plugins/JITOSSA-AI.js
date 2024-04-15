import axios from 'axios';
import Jimp from 'jimp';

let handler = async (m, { conn }) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // تجاهل الرسائل الفارغة أو التي تحتوي على روابط
    if (!m.text || m.isBaileys || m.text.includes("http://") || m.text.includes("https://")) return;

    let name = "JITOSSA AI";
    /* await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }}); */

    const messages = [
        { role: "system", content: `أنا بوت واتساب، اسمي ${name}` },
        { role: "user", content: m.text }
    ];

    try {
        // الرد الاعتيادي
        let replyMessage = "";
        
        // التحقق من السؤال عن صاحب الرقم
        if (m.text.includes("صاحب الرقم") && m.text.includes("212670941551")) {
            replyMessage = "رقم الهاتف يعود إلى صاحبه الفلاني";
        } else {
            // استعمال الذكاء الصناعي
            const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
                messages
            });
            const responseData = response.data;
            const hasil = responseData;
            replyMessage = hasil.answer;
        }

        m.reply(replyMessage);

        // قراءة الصور وإنشاء الصور
        if (m.hasMedia) {
            const mediaData = await conn.downloadAndSaveMedia(m);
            const image = await Jimp.read(mediaData);
            
            // تعديل الصورة (مثال: تغيير الحجم)
            image.resize(200, 200); // تغيير حجم الصورة إلى 200x200 بكسل
            
            // حفظ الصورة المعدلة
            const outputFilename = `output_${Date.now()}.png`; // اسم ملف الصورة الناتجة
            await image.writeAsync(outputFilename);
            
            // إرسال الصورة المعدلة
            conn.sendFile(m.chat, outputFilename, "", "", m);
        }

    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        throw error;
    }
}

export default handler;