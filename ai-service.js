/**
 * TAROT MYSTIC - Gemini AI Tarot Reading & Follow-Up Service
 * Pre-configured with the user's Gemini API key and automatic multi-model fallback.
 */

const DEFAULT_GEMINI_KEY = "AQ.Ab8RN6K1321CdAFTI9pFmzs4anLG3xLy0QaaX6-S42SFSvYBBQ";

const GEMINI_MODELS_CHAIN = [
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite",
  "gemma-4-26b-a4b-it",
  "gemini-3.8-flash"
];

class TarotAIService {
  constructor() {
    this.apiKey = localStorage.getItem("tarot_gemini_api_key") || DEFAULT_GEMINI_KEY;
    this.preferredModel = localStorage.getItem("tarot_gemini_model") || "gemini-3-flash-preview";
    this.lastActiveModel = null;
  }

  getApiKey() {
    return (this.apiKey || DEFAULT_GEMINI_KEY).trim();
  }

  setApiKey(newKey, preferredModel = "gemini-3-flash-preview") {
    this.apiKey = (newKey || DEFAULT_GEMINI_KEY).trim();
    this.preferredModel = preferredModel;
    localStorage.setItem("tarot_gemini_api_key", this.apiKey);
    localStorage.setItem("tarot_gemini_model", this.preferredModel);
  }

  resetDefaultKey() {
    this.setApiKey(DEFAULT_GEMINI_KEY, "gemini-3-flash-preview");
  }

  getOrderedModels() {
    const list = [this.preferredModel, ...GEMINI_MODELS_CHAIN];
    return [...new Set(list)];
  }

  async callGeminiAPI(promptText, temperature = 0.8) {
    const key = this.getApiKey();
    const models = this.getOrderedModels();
    let lastError = null;

    for (const model of models) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 28000);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: promptText }]
              }
            ],
            generationConfig: {
              temperature,
              topP: 0.92,
              maxOutputTokens: 3200
            }
          })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errText = await response.text();
          lastError = new Error(`Model ${model} HTTP ${response.status}: ${errText}`);
          continue;
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || "")
          .join("\n")
          .trim();

        if (text && text.length > 40) {
          this.lastActiveModel = model;
          return {
            text,
            modelUsed: model,
            isLiveAI: true
          };
        }
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error("Không thể kết nối máy chủ Gemini AI.");
  }

  buildReadingPrompt({ profile, topicLabel, question, spread, drawnCards, deck }) {
    const cardsSummary = drawnCards
      .map((item, idx) => {
        const slot = spread.slots[idx];
        const orientationVi = item.isReversed ? "NGƯỢC (Reversed)" : "XUÔI (Upright)";
        const keywords = (item.isReversed ? item.card.keywordsRev : item.card.keywordsUp).join(", ");
        const coreMeaning = item.isReversed ? item.card.meaningRev : item.card.meaningUp;
        return `
- Vị trí ${idx + 1} [${slot.title} - ${slot.subtitle}]:
  + Lá bài: ${item.card.name} (${item.card.nameVi}) — ${item.card.arcanaVi}
  + Chiều lá bài: ${orientationVi}
  + Nguyên tố / Chiêm tinh: ${item.card.element} | ${item.card.astro}
  + Từ khóa năng lượng: ${keywords}
  + Ý nghĩa gốc: ${coreMeaning}`;
      })
      .join("\n");

    return `Bạn là một Bậc Thầy Tarot (Master Tarot Reader), Nhà Chiêm Tinh Học và Chuyên Gia Thần Số Học uyên bác, thấu cảm và sâu sắc.
Hãy thực hiện một bài luận giải Tarot chuyên sâu, cá nhân hóa hoàn toàn bằng tiếng Việt cho khách hàng dựa trên thông tin bản mệnh, nội dung câu hỏi và 3 lá bài khách vừa tự tay rút ngẫu nhiên:

=== 1. THÔNG TIN BẢN MỆNH KHÁCH HÀNG ===
- Họ và tên: ${profile.fullName}
- Tuổi hiện tại: ${profile.age} tuổi
- Ngày tháng năm sinh: ${profile.dobFormatted}
- Cung Hoàng Đạo: ${profile.zodiac.name} (${profile.zodiac.symbol} - Nguyên tố ${profile.zodiac.element}, Sao chiếu mệnh: ${profile.zodiac.ruler})
- Tuổi Âm Lịch & Ngũ Hành: ${profile.canChi} — ${profile.easternElement}
- Thần Số Học: ${profile.lifePathLabel} | Năm cá nhân hiện tại: Số ${profile.personalYear} | Chỉ số tên gọi: Số ${profile.destinyNumber}
- Lá bài bản mệnh ngày sinh: ${profile.birthTarot}

=== 2. BỘ BÀI & NỘI DUNG XEM ===
- Bộ bài sử dụng: ${deck.name} (${deck.origin})
- Chủ đề xem: ${topicLabel}
- Kiểu trải bài 3 lá: ${spread.name}
- NỘI DUNG / CÂU HỎI CỤ THỂ CỦA KHÁCH: "${question}"

=== 3. BA LÁ BÀI KHÁCH ĐÃ RÚT NGẪU NHIÊN ===
${cardsSummary}

=== YÊU CẦU CẤU TRÚC PHÂN TÍCH (Trình bày Markdown rõ ràng, giàu cảm xúc, huyền bí nhưng thực tế) ===
Hãy viết bài luận giải chi tiết theo đúng 5 phần sau:

## 🌟 1. Giao Thoa Bản Mệnh & Năng Lượng Trải Bài
Phân tích sự kết nối đặc biệt giữa tên gọi **${profile.fullName}** (${profile.age} tuổi, sinh ngày ${profile.dobFormatted}, cung ${profile.zodiac.name}, ${profile.easternElement}, ${profile.lifePathLabel}) với tổng thể năng lượng nguyên tố của 3 lá bài vừa rút. Giải thích vì sao 3 lá bài này lại xuất hiện đúng vào thời điểm năm cá nhân số ${profile.personalYear} của bạn.

## 🃏 2. Giải Mã Chi Tiết Từng Lá Bài Theo Câu Hỏi
Phân tích sâu sắc từng lá bài đặt trong đúng ngữ cảnh câu hỏi *"${question}"*:
### • Lá Thứ Nhất (${spread.slots[0].title}): ${drawnCards[0].card.name} — ${drawnCards[0].isReversed ? "Lá Bài Ngược" : "Lá Bài Xuôi"}
### • Lá Thứ Hai (${spread.slots[1].title}): ${drawnCards[1].card.name} — ${drawnCards[1].isReversed ? "Lá Bài Ngược" : "Lá Bài Xuôi"}
### • Lá Thứ Ba (${spread.slots[2].title}): ${drawnCards[2].card.name} — ${drawnCards[2].isReversed ? "Lá Bài Ngược" : "Lá Bài Xuôi"}

## 🔮 3. Mạch Chuyện Liên Kết 3 Lá & Giải Đáp Trực Tiếp Nội Dung Xem
Kết nối câu chuyện xuyên suốt từ Lá 1 → Lá 2 → Lá 3 để trả lời thẳng thắn, rõ ràng và sâu sắc vào câu hỏi/nội dung mà **${profile.fullName}** đang trăn trở: *"${question}"*. Dự báo xu hướng sắp tới trong ngắn hạn và trung hạn.

## 💡 4. Lời Khuyên Hành Động & Hóa Giải
Đưa ra 3 lời khuyên hành động cụ thể, thiết thực nhất dành riêng cho **${profile.fullName}** dựa trên chiều Xuôi/Ngược của 3 lá bài và bản mệnh ${profile.zodiac.name} (${profile.easternElement}).

## ✨ 5. Thông Điệp Vũ Trụ & Vật Phẩm / Con Số May Mắn
- Một câu thông điệp chữa lành cô đọng từ Vũ Trụ gửi riêng cho ${profile.fullName}.
- Khung thời gian thuận lợi, màu sắc trợ mệnh và con số may mắn đồng hành.`;
  }

  buildFallbackReading({ profile, topicLabel, question, spread, drawnCards, deck }) {
    const c1 = drawnCards[0];
    const c2 = drawnCards[1];
    const c3 = drawnCards[2];

    const getCardBlock = (item, slot) => {
      const orient = item.isReversed ? "Lá Bài Ngược (Reversed)" : "Lá Bài Xuôi (Upright)";
      const kws = (item.isReversed ? item.card.keywordsRev : item.card.keywordsUp).join(" • ");
      const meaning = item.isReversed ? item.card.meaningRev : item.card.meaningUp;
      return `### • ${slot.title}: **${item.card.name} (${item.card.nameVi})** — *${orient}*
- **Thuộc tính:** ${item.card.arcanaVi} | Nguyên tố: ${item.card.element} | Chiêm tinh: ${item.card.astro}
- **Từ khóa năng lượng:** ${kws}
- **Luận giải theo câu hỏi của ${profile.fullName}:** Ở vị trí *${slot.subtitle}*, sự xuất hiện của **${item.card.name}** (${orient}) phản ánh trực tiếp vấn đề **"${question}"**. ${meaning} Khi kết hợp với năng lượng ${profile.zodiac.name} và ${profile.easternElement} của bạn, lá bài nhắc nhở bạn cần chú tâm vào ${item.isReversed ? "việc tháo gỡ những nút thắt nội tâm và điều chỉnh lại nhịp độ" : "việc phát huy thế mạnh sẵn có và nắm bắt tín hiệu thuận lợi đang mở ra"}.`;
    };

    return `## 🌟 1. Giao Thoa Bản Mệnh & Năng Lượng Trải Bài
Chào **${profile.fullName}** (${profile.age} tuổi • Ngày sinh: **${profile.dobFormatted}**). Dựa trên bản đồ năng lượng cá nhân, bạn mang tần số của cung **${profile.zodiac.name}** (${profile.zodiac.element}), tuổi âm lịch **${profile.canChi} (${profile.easternElement})** cùng **${profile.lifePathLabel}** và lá bài bản mệnh **${profile.birthTarot}**.

Trong trải bài **${spread.name}** từ bộ bài *${deck.name}*, 3 lá bài bạn vừa tự tay rút ngẫu nhiên (**${c1.card.name}**, **${c2.card.name}**, **${c3.card.name}**) tạo nên sự cộng hưởng mạnh mẽ với Năm Cá Nhân số **${profile.personalYear}** của bạn. Đây không phải sự ngẫu nhiên mà là lời hồi đáp trực diện cho mối quan tâm của bạn về **${topicLabel}**: *"${question}"*.

## 🃏 2. Giải Mã Chi Tiết Từng Lá Bài Theo Câu Hỏi
${getCardBlock(c1, spread.slots[0])}

${getCardBlock(c2, spread.slots[1])}

${getCardBlock(c3, spread.slots[2])}

## 🔮 3. Mạch Chuyện Liên Kết 3 Lá & Giải Đáp Trực Tiếp Nội Dung Xem
Nhìn vào dòng chảy từ **${c1.card.name}** sang **${c2.card.name}** và hội tụ tại **${c3.card.name}**:
- **Căn nguyên & Nền tảng:** Mọi thứ bắt nguồn từ năng lượng của **${c1.card.nameVi}** (${c1.isReversed ? "Ngược" : "Xuôi"}), cho thấy những trải nghiệm hoặc suy nghĩ trước đây đã định hình nên góc nhìn của bạn đối với *"${question}"*.
- **Điểm xoay chuyển hiện tại:** Hiện tại, **${c2.card.nameVi}** (${c2.isReversed ? "Ngược" : "Xuôi"}) là tâm điểm. ${c2.isReversed ? c2.card.meaningRev : c2.card.meaningUp}
- **Xu hướng & Đáp án tương lai:** Khi tiến tới **${c3.card.nameVi}** (${c3.isReversed ? "Ngược" : "Xuôi"}), câu trả lời dành cho **${profile.fullName}** là: ${c3.isReversed ? c3.card.meaningRev : c3.card.meaningUp}

## 💡 4. Lời Khuyên Hành Động & Hóa Giải Dành Cho ${profile.fullName}
1. **Về mặt nhận thức:** Kết hợp trực giác của con số chủ đạo **${profile.lifePath}** với thông điệp từ **${c1.card.name}** để nhìn nhận sự việc một cách sáng suốt, không để cảm xúc nhất thời làm xao nhãng.
2. **Về mặt hành động hiện tại:** Tập trung xử lý bài toán mà **${c2.card.name}** chỉ ra (${(c2.isReversed ? c2.card.keywordsRev : c2.card.keywordsUp).slice(0, 2).join(", ")}).
3. **Về định hướng sắp tới:** Chuẩn bị tâm thế đón nhận năng lượng của **${c3.card.name}** bằng sự chủ động của cung **${profile.zodiac.name}**.

## ✨ 5. Thông Điệp Vũ Trụ & Con Số May Mắn
> *"Mọi cánh cửa vũ trụ đều mở ra đúng thời điểm khi tâm trí bạn đủ tĩnh lặng và trái tim bạn đủ dũng cảm để bước tới, ${profile.fullName} ạ."*

- **Con số may mắn trợ mệnh:** Số **${profile.lifePath}**, **${profile.personalYear}** và **${(c3.card.rank % 9) + 1}**
- **Nguyên tố bổ trợ:** ${c3.card.element} kết hợp bản mệnh ${profile.easternElement}`;
  }

  async generateTarotReading(payload) {
    const prompt = this.buildReadingPrompt(payload);
    try {
      const res = await this.callGeminiAPI(prompt, 0.82);
      return res;
    } catch (err) {
      console.warn("Gemini API fallback triggered:", err);
      return {
        text: this.buildFallbackReading(payload),
        modelUsed: "Mystic Synthesis Engine (Fallback)",
        isLiveAI: false,
        errorDetail: err.message
      };
    }
  }

  async askFollowUpQuestion({ profile, question, spread, drawnCards, previousReading, followUpText }) {
    const cardsBrief = drawnCards
      .map((c, i) => `${i + 1}. ${spread.slots[i].title}: ${c.card.name} (${c.card.nameVi}) [${c.isReversed ? "Ngược" : "Xuôi"}]`)
      .join("; ");

    const prompt = `Bạn là Master Tarot Reader đang trò chuyện tiếp nối với khách hàng **${profile.fullName}** (${profile.age} tuổi, sinh ngày ${profile.dobFormatted}, cung ${profile.zodiac.name}, ${profile.lifePathLabel}).
Câu hỏi ban đầu của khách: "${question}"
3 lá bài khách đã rút: ${cardsBrief}.

Bây giờ khách hỏi thêm câu hỏi tiếp theo: "${followUpText}"
Hãy trả lời ngắn gọn, sâu sắc, ấm áp (khoảng 150 - 280 từ bằng tiếng Việt, định dạng Markdown) dựa trực tiếp trên 3 lá bài đã rút và bản mệnh của ${profile.fullName}.`;

    try {
      const res = await this.callGeminiAPI(prompt, 0.78);
      return res.text;
    } catch (err) {
      const c = drawnCards[Math.floor(Math.random() * drawnCards.length)];
      return `Dựa trên năng lượng của 3 lá bài đã rút — đặc biệt là lá **${c.card.name} (${c.card.nameVi})** ở chiều **${c.isReversed ? "Ngược" : "Xuôi"}** — cùng bản mệnh **${profile.zodiac.name}** của **${profile.fullName}**:\n\nĐối với câu hỏi *"${followUpText}"*, lá bài nhắn nhủ rằng: ${c.isReversed ? c.card.meaningRev : c.card.meaningUp} Hãy giữ sự bình tĩnh, lắng nghe trực giác của Con Số Chủ Đạo **${profile.lifePath}** và tiến từng bước vững chắc.`;
    }
  }
}

/**
 * Simple, safe Markdown to rich HTML converter for Tarot AI Readings
 */
function renderMarkdownToHtml(mdText = "") {
  if (!mdText) return "";
  let html = mdText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Blockquotes
  html = html.replace(/^&gt;\s*(.+)$/gm, '<blockquote class="mystic-quote">$1</blockquote>');

  // Headings
  html = html.replace(/^###\s+(.+)$/gm, '<h4 class="reading-h4">$1</h4>');
  html = html.replace(/^##\s+(.+)$/gm, '<h3 class="reading-h3">$1</h3>');
  html = html.replace(/^#\s+(.+)$/gm, '<h2 class="reading-h2">$1</h2>');

  // Bold & Italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Lists
  const lines = html.split("\n");
  const out = [];
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (/^[-+•]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      if (!inList) {
        out.push('<ul class="reading-list">');
        inList = true;
      }
      const itemContent = trimmed.replace(/^([-+•]|\d+\.)\s+/, "");
      out.push(`<li>${itemContent}</li>`);
    } else {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (!trimmed) {
        out.push("");
      } else if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<h4") ||
        trimmed.startsWith("<blockquote")
      ) {
        out.push(trimmed);
      } else {
        out.push(`<p>${trimmed}</p>`);
      }
    }
  }
  if (inList) out.push("</ul>");

  return out.join("\n");
}

window.TarotAI = new TarotAIService();
window.renderMarkdownToHtml = renderMarkdownToHtml;
