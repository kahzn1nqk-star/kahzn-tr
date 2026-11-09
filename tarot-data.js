/**
 * TAROT MYSTIC - Complete 78-Card Database & Multi-Deck External Image Engine
 * All card fronts and backs are loaded from verified external public-domain repositories
 * (jsDelivr CDN + GitHub Raw fallback).
 */

const CDN_BASE = "https://cdn.jsdelivr.net/gh/mixvlad/TarotCards@main/tarot";
const RAW_BASE = "https://raw.githubusercontent.com/mixvlad/TarotCards/main/tarot";
const KRATES_CDN = "https://cdn.jsdelivr.net/gh/krates98/tarotcardapi@main/images";
const KRATES_RAW = "https://raw.githubusercontent.com/krates98/tarotcardapi/main/images";

// External Card Backs (Mặt sau lá bài từ nguồn ngoài)
const EXTERNAL_CARD_BACKS = [
  {
    id: "rws-classic",
    name: "Hoa Hồng & Hoa Ly (RWS 1909)",
    origin: "Rider-Waite Classic Back",
    url: `${CDN_BASE}/rider-waite/720px/Cover.jpg`,
    fallbackUrl: `${RAW_BASE}/rider-waite/720px/Cover.jpg`
  },
  {
    id: "rws-rare",
    name: "Cổ Điển Nứt Thời Gian (1909 Rare)",
    origin: "Pamela Colman Smith Vintage",
    url: `${CDN_BASE}/rider-waite/720px/Cover_Rare.jpg`,
    fallbackUrl: `${RAW_BASE}/rider-waite/720px/Cover_Rare.jpg`
  },
  {
    id: "soimoi-mystic",
    name: "Tinh Vân Huyền Bí (Soimoi)",
    origin: "Soimoi Contemporary Tarot",
    url: `${CDN_BASE}/soimoi/720px/Cover.jpg`,
    fallbackUrl: `${RAW_BASE}/soimoi/720px/Cover.jpg`
  },
  {
    id: "vieville-royal",
    name: "Hoàng Gia Pháp (Viéville 1650)",
    origin: "Jacques Viéville Paris Back",
    url: `${RAW_BASE}/vieville/720px/Cover.jpg`,
    fallbackUrl: `${CDN_BASE}/vieville/full/Cover.jpg`
  },
  {
    id: "nouveau-europe",
    name: "Tân Cổ Điển Châu Âu (1898)",
    origin: "Bourgeois Tarot Nouveau",
    url: `${CDN_BASE}/tarot-nouveau/720px/Cover.jpg`,
    fallbackUrl: `${RAW_BASE}/tarot-nouveau/720px/Cover.jpg`
  }
];

// 8 Complete 78-Card External Tarot Decks (Bộ bài đầy đủ 78 lá từ nguồn ngoài)
const EXTERNAL_TAROT_DECKS = [
  {
    id: "rider-waite",
    name: "Rider-Waite-Smith (1909 Classic)",
    badge: "Phổ Biến Nhất • 78 Lá",
    year: "1909",
    origin: "London, Anh Quốc (A.E. Waite & Pamela Colman Smith)",
    cardCount: 78,
    defaultBackId: "rws-classic",
    description: "Bộ bài Tarot chuẩn mực và nổi tiếng nhất thế giới với hình ảnh biểu tượng giàu chiều sâu tâm linh.",
    sampleCards: [
      `${CDN_BASE}/rider-waite/720px/00_Fool.jpg`,
      `${CDN_BASE}/rider-waite/720px/01_Magician.jpg`,
      `${CDN_BASE}/rider-waite/720px/17_Star.jpg`
    ]
  },
  {
    id: "soimoi",
    name: "Soimoi Modern Mystic Tarot",
    badge: "Nghệ Thuật Hiện Đại • 78 Lá",
    year: "Đương Đại",
    origin: "Bộ Sưu Tập Nghệ Thuật Soimoi (78 Lá)",
    cardCount: 78,
    defaultBackId: "soimoi-mystic",
    description: "Phiên bản nghệ thuật đương đại với nét vẽ thanh thoát, màu sắc huyền ảo và trực giác mạnh mẽ.",
    sampleCards: [
      `${CDN_BASE}/soimoi/720px/00_Fool.jpg`,
      `${CDN_BASE}/soimoi/720px/02_High_Priestess.jpg`,
      `${CDN_BASE}/soimoi/720px/19_Sun.jpg`
    ]
  },
  {
    id: "rider-waite-rare",
    name: "Rider-Waite Vintage Crackled",
    badge: "Bản Cổ Quý Hiếm • 78 Lá",
    year: "1909",
    origin: "Ấn Bản Cổ Điển Mặt Sau Nứt Thời Gian",
    cardCount: 78,
    defaultBackId: "rws-rare",
    description: "Trải nghiệm cảm giác rút những lá bài cổ hơn 100 năm tuổi với mặt sau họa tiết cổ điển nguyên bản.",
    sampleCards: [
      `${CDN_BASE}/rider-waite/720px/09_Hermit.jpg`,
      `${CDN_BASE}/rider-waite/720px/10_Wheel_of_Fortune.jpg`,
      `${CDN_BASE}/rider-waite/720px/21_World.jpg`
    ]
  },
  {
    id: "marseille",
    name: "Tarot de Marseille (Conver 1760)",
    badge: "Cổ Điển Pháp • 78 Lá",
    year: "1760",
    origin: "Marseille, Pháp (Nicolas Conver)",
    cardCount: 78,
    defaultBackId: "vieville-royal",
    description: "Trường phái Tarot cổ điển châu Âu với đường nét khắc gỗ trung đại và màu sắc nguyên bản thế kỷ 18.",
    sampleCards: [
      `${CDN_BASE}/marseille/720px/00_Le_Mat.png`,
      `${CDN_BASE}/marseille/720px/01_Le_Bateleur.png`,
      `${CDN_BASE}/marseille/720px/19_Le_Soleil.png`
    ]
  },
  {
    id: "vieville",
    name: "Jacques Viéville Royal (1650)",
    badge: "Hoàng Gia Thế Kỷ 17 • 78 Lá",
    year: "1650",
    origin: "Paris, Pháp (Jacques Viéville)",
    cardCount: 78,
    defaultBackId: "vieville-royal",
    description: "Một trong những bộ bài 78 lá lâu đời nhất nước Pháp mang đậm dấu ấn huyền học Phục Hưng.",
    sampleCards: [
      `${CDN_BASE}/vieville/720px/00_Le_Mat.jpg`,
      `${CDN_BASE}/vieville/720px/10_La_Roue_de_Fortune.jpg`,
      `${CDN_BASE}/vieville/720px/21_Le_Monde.jpg`
    ]
  },
  {
    id: "tarot-nouveau",
    name: "Bourgeois Tarot Nouveau (1898)",
    badge: "Tân Cổ Điển Âu Châu • 78 Lá",
    year: "1898",
    origin: "Frankfurt, Đức (C.L. Wüst)",
    cardCount: 78,
    defaultBackId: "nouveau-europe",
    description: "Bộ bài 78 lá phong cách Art Nouveau tinh xảo miêu tả đời sống, tâm lý và vận mệnh châu Âu cuối thế kỷ 19.",
    sampleCards: [
      `${CDN_BASE}/tarot-nouveau/720px/00_Excuse.jpg`,
      `${CDN_BASE}/tarot-nouveau/720px/01_Atout.jpg`,
      `${CDN_BASE}/tarot-nouveau/720px/21_Atout.jpg`
    ]
  },
  {
    id: "sola-busca",
    name: "Sola Busca Renaissance (1491)",
    badge: "Phục Hưng Ý Cổ Nhất • 78 Lá",
    year: "1491",
    origin: "Milan / Ferrara, Ý",
    cardCount: 78,
    defaultBackId: "rws-rare",
    description: "Bộ bài 78 lá minh họa đầy đủ cổ xưa nhất lịch sử nhân loại (năm 1491), tiền thân của Rider-Waite.",
    sampleCards: [
      `${CDN_BASE}/sola-busca/720px/00.jpg`,
      `${CDN_BASE}/sola-busca/720px/01.jpg`,
      `${CDN_BASE}/sola-busca/720px/21.jpg`
    ]
  },
  {
    id: "krates-rws",
    name: "Rider-Waite High-Contrast Remaster",
    badge: "Bản Phục Chế Sắc Nét • 78 Lá",
    year: "Remastered",
    origin: "Krates Tarot Archive",
    cardCount: 78,
    defaultBackId: "rws-classic",
    description: "Bộ bài Rider-Waite 78 lá được cân chỉnh độ tương phản cao, màu sắc rực rỡ và rõ nét trên mọi màn hình.",
    sampleCards: [
      `${KRATES_CDN}/thefool.jpeg`,
      `${KRATES_CDN}/themagician.jpeg`,
      `${KRATES_CDN}/thestar.jpeg`
    ]
  }
];

// Filename mappings for special historical decks
const MARSEILLE_MAJOR_FILES = [
  "00_Le_Mat.png", "01_Le_Bateleur.png", "02_La_Papesse.png", "03_L_Imperatrice.png",
  "04_L_Empereur.png", "05_Le_Pape.png", "06_L_Amoureux.png", "07_Le_Chariot.png",
  "08_La_Justice.png", "09_L_Ermite.png", "10_La_Roue_de_Fortune.png", "11_La_Force.png",
  "12_Le_Pendu.png", "13_La_Mort.png", "14_Temperance.png", "15_Le_Diable.png",
  "16_La_Maison_Dieu.png", "17_L_Etoile.png", "18_La_Lune.png", "19_Le_Soleil.png",
  "20_Le_Jugement.png", "21_Le_Monde.png"
];

const VIEVILLE_MAJOR_FILES = [
  "00_Le_Mat.jpg", "01_Le_Bateleur.jpg", "02_La_Papesse.jpg", "03_L_Imperatrice.jpg",
  "04_L_Empereur.jpg", "05_Le_Pape.jpg", "06_L_Amoureux.jpg", "07_La_Justice.jpg",
  "08_Le_Chariot.jpg", "09_La_Force.jpg", "10_La_Roue_de_Fortune.jpg", "11_L_Ermite.jpg",
  "12_Le_Pendu.jpg", "13_La_Mort.jpg", "14_Temperance.jpg", "15_Le_Diable.jpg",
  "16_La_Maison_Dieu.jpg", "17_L_Etoile.jpg", "18_La_Lune.jpg", "19_Le_Soleil.jpg",
  "20_Le_Jugement.jpg", "21_Le_Monde.jpg"
];

const KRATES_MAJOR_FILES = [
  "thefool.jpeg", "themagician.jpeg", "thehighpriestess.jpeg", "theempress.jpeg",
  "theemperor.jpeg", "thehierophant.jpeg", "TheLovers.jpg", "thechariot.jpeg",
  "thestrength.jpeg", "thehermit.jpeg", "wheeloffortune.jpeg", "justice.jpeg",
  "thehangedman.jpeg", "death.jpeg", "temperance.jpeg", "thedevil.jpeg",
  "thetower.jpeg", "thestar.jpeg", "themoon.jpeg", "thesun.jpeg",
  "judgement.jpeg", "theworld.jpeg"
];

const RANK_WORDS = [
  "ace", "two", "three", "four", "five", "six", "seven",
  "eight", "nine", "ten", "page", "knight", "queen", "king"
];

// 22 Major Arcana Detailed Database
const MAJOR_ARCANA_DATA = [
  {
    index: 0, numeral: "0", fileKey: "00_Fool",
    name: "The Fool", nameVi: "Kẻ Khờ (Khởi Đầu Mới)",
    element: "Khí (Air)", astro: "Sao Thiên Vương (Uranus)",
    keywordsUp: ["Khởi đầu mới", "Tự do", "Ngây thơ", "Phiêu lưu", "Tiềm năng vô hạn"],
    keywordsRev: ["Bốc đồng", "Liều lĩnh", "Sợ thay đổi", "Thiếu suy nghĩ", "Chần chừ"],
    meaningUp: "Một hành trình hoàn toàn mới đang mở ra trước mắt bạn. Hãy giữ trái tim thuần khiết, cởi mở và dũng cảm bước qua vùng an toàn với niềm tin vào vũ trụ.",
    meaningRev: "Cảnh báo sự vội vàng thiếu tính toán hoặc ngược lại là nỗi sợ hãi khiến bạn chùn bước trước cơ hội quý giá."
  },
  {
    index: 1, numeral: "I", fileKey: "01_Magician",
    name: "The Magician", nameVi: "Nhà Ảo Thuật (Quyền Năng Kiến Tạo)",
    element: "Khí (Air)", astro: "Sao Thủy (Mercury)",
    keywordsUp: ["Kỹ năng", "Ý chí", "Sáng tạo", "Hành động", "Biến ước mơ thành hiện thực"],
    keywordsRev: ["Thao túng", "Lãng phí tài năng", "Thiếu tập trung", "Ảo tưởng"],
    meaningUp: "Bạn đã có đầy đủ nguồn lực (Đất, Nước, Lửa, Khí) trong tay. Đây là thời điểm vàng để biến ý tưởng thành kết quả thực tế bằng sự tập trung cao độ.",
    meaningRev: "Bạn đang nghi ngờ năng lực bản thân hoặc phân tán năng lượng vào quá nhiều mục tiêu chưa rõ ràng."
  },
  {
    index: 2, numeral: "II", fileKey: "02_High_Priestess",
    name: "The High Priestess", nameVi: "Nữ Tư Tế Tối Cao (Trực Giác & Bí Mật)",
    element: "Nước (Water)", astro: "Mặt Trăng (Moon)",
    keywordsUp: ["Trực giác", "Tiềm thức", "Bí ẩn", "Thông thái nội tâm", "Tĩnh lặng"],
    keywordsRev: ["Bỏ qua trực giác", "Bí mật bị che giấu", "Bề nổi", "Bất an nội tâm"],
    meaningUp: "Câu trả lời bạn tìm kiếm không nằm ở bên ngoài mà ở sâu trong tiếng nói trực giác. Hãy lắng nghe giấc mơ, linh cảm và giữ sự điềm tĩnh.",
    meaningRev: "Bạn đang để lý trí hoặc áp lực bên ngoài lấn át linh cảm nhạy bén của mình, hoặc có điều gì đó chưa được tiết lộ hết."
  },
  {
    index: 3, numeral: "III", fileKey: "03_Empress",
    name: "The Empress", nameVi: "Nữ Hoàng (Sự Trù Phú & Nuôi Dưỡng)",
    element: "Đất (Earth)", astro: "Sao Kim (Venus)",
    keywordsUp: ["Trù phú", "Yêu thương", "Sáng tạo", "Phồn vinh", "Vẻ đẹp quyến rũ"],
    keywordsRev: ["Phụ thuộc cảm xúc", "Kiệt sức", "Bế tắc sáng tạo", "Quá bảo bọc"],
    meaningUp: "Năng lượng của tình yêu thương, sự sinh sôi nảy nở và sung túc đang bao bọc bạn. Các dự án hoặc mối quan hệ sẽ đơm hoa kết trái ngọt ngào.",
    meaningRev: "Hãy dành thời gian chăm sóc lại chính bản thân mình trước khi cho đi quá nhiều, tránh sự phụ thuộc cảm xúc."
  },
  {
    index: 4, numeral: "IV", fileKey: "04_Emperor",
    name: "The Emperor", nameVi: "Hoàng Đế (Uy Quyền & Vững Chãi)",
    element: "Lửa (Fire)", astro: "Bạch Dương (Aries)",
    keywordsUp: ["Kỷ luật", "Lãnh đạo", "Bảo vệ", "Cấu trúc vững chắc", "Thành tựu"],
    keywordsRev: ["Độc đoán", "Cứng nhắc", "Kiểm soát quá mức", "Thiếu kỷ luật"],
    meaningUp: "Sự kiên định, chiến lược rõ ràng và bản lĩnh làm chủ tình thế sẽ giúp bạn xây dựng nền tảng vững chắc cho tương lai.",
    meaningRev: "Cần linh hoạt hơn trong cách giải quyết vấn đề, tránh áp đặt hoặc để cái tôi quá lớn gây căng thẳng."
  },
  {
    index: 5, numeral: "V", fileKey: "05_Hierophant",
    name: "The Hierophant", nameVi: "Giáo Hoàng (Truyền Thống & Minh Triết)",
    element: "Đất (Earth)", astro: "Kim Ngưu (Taurus)",
    keywordsUp: ["Tri thức chuẩn mực", "Người dẫn đường", "Cam kết", "Đạo đức", "Niềm tin"],
    keywordsRev: ["Phá cách", "Thách thức lối mòn", "Giáo điều", "Tự tìm lối đi riêng"],
    meaningUp: "Sự học hỏi bài bản, lời khuyên từ bậc tiền bối hoặc những giá trị truyền thống bền vững sẽ mang lại sự bình an và định hướng đúng đắn.",
    meaningRev: "Đã đến lúc thoát khỏi những khuôn mẫu cũ kỹ không còn phù hợp và lắng nghe chân lý của riêng bạn."
  },
  {
    index: 6, numeral: "VI", fileKey: "06_Lovers",
    name: "The Lovers", nameVi: "Tình Nhân (Tình Yêu & Sự Lựa Chọn)",
    element: "Khí (Air)", astro: "Song Tử (Gemini)",
    keywordsUp: ["Tình yêu sâu sắc", "Sự hòa hợp", "Lựa chọn định mệnh", "Đồng điệu tâm hồn"],
    keywordsRev: ["Mâu thuẫn giá trị", "Do dự", "Mất cân bằng", "Sự cám dỗ"],
    meaningUp: "Một kết nối tâm giao mạnh mẽ hoặc một quyết định quan trọng xuất phát từ trái tim chân thành. Sự hòa hợp tuyệt đối đang hiện diện.",
    meaningRev: "Bạn đang đứng trước ngã rẽ khó khăn hoặc cần thẳng thắn tháo gỡ những bất đồng trong quan điểm."
  },
  {
    index: 7, numeral: "VII", fileKey: "07_Chariot",
    name: "The Chariot", nameVi: "Cỗ Xe Chiến Thắng (Ý Chí Chinh Phục)",
    element: "Nước (Water)", astro: "Cự Giải (Cancer)",
    keywordsUp: ["Chiến thắng", "Quyết tâm", "Tiến bước mạnh mẽ", "Làm chủ cảm xúc"],
    keywordsRev: ["Mất phương hướng", "Nóng vội", "Trở ngại tạm thời", "Mất kiểm soát"],
    meaningUp: "Bằng cách cân bằng cả lý trí lẫn cảm xúc và giữ vững tay lái, bạn sẽ vượt qua mọi chướng ngại để chạm tới chiến thắng vang dội.",
    meaningRev: "Đừng cố ép buộc mọi thứ khi chưa xác định rõ đích đến; hãy bình tĩnh lấy lại sự cân bằng trước khi tăng tốc."
  },
  {
    index: 8, numeral: "VIII", fileKey: "08_Strength",
    name: "Strength", nameVi: "Sức Mạnh Nội Tâm (Lòng Dũng Cảm & Bao Dung)",
    element: "Lửa (Fire)", astro: "Sư Tử (Leo)",
    keywordsUp: ["Bản lĩnh", "Kiên nhẫn", "Lòng trắc ẩn", "Sức mạnh mềm", "ự tự tin"],
    keywordsRev: ["Tự ti", "Yếu lòng", "Nóng giận", "Kiệt quệ năng lượng"],
    meaningUp: "Sức mạnh vĩ đại nhất không nằm ở sự cưỡng cầu mà ở lòng kiên nhẫn, sự dịu dàng và niềm tin vững vàng vào bản lĩnh nội tại.",
    meaningRev: "Hãy nạp lại năng lượng và đừng để nỗi sợ tạm thời làm lu mờ phẩm chất kiên cường vốn có của bạn."
  },
  {
    index: 9, numeral: "IX", fileKey: "09_Hermit",
    name: "The Hermit", nameVi: "Ẩn Sĩ (Chiêm Nghiệm & Ánh Sáng Nội Tâm)",
    element: "Đất (Earth)", astro: "Xử Nữ (Virgo)",
    keywordsUp: ["Chiêm nghiệm", "Tìm kiếm chân lý", "Tĩnh tâm", "Trí tuệ sâu sắc"],
    keywordsRev: ["Cô lập", "Thu mình quá mức", "Lạc lõng", "Từ chối lời khuyên"],
    meaningUp: "Một khoảng lặng quý giá để bạn quay về bên trong, soi chiếu lại hành trình đã qua và tìm thấy ngọn đèn dẫn lối của riêng mình.",
    meaningRev: "Tĩnh tâm là tốt nhưng đừng tự cô lập bản thân khỏi những người yêu thương và sẵn sàng sẻ chia cùng bạn."
  },
  {
    index: 10, numeral: "X", fileKey: "10_Wheel_of_Fortune",
    name: "Wheel of Fortune", nameVi: "Bánh Xe Số Phận (Bước Ngoặt Vận Mệnh)",
    element: "Lửa (Fire)", astro: "Sao Mộc (Jupiter)",
    keywordsUp: ["Bước ngoặt lớn", "May mắn", "Chu kỳ mới", "Cơ hội định mệnh", "Nhân quả"],
    keywordsRev: ["Trì hoãn", "Kháng cự thay đổi", "Biến động bất ngờ", "Thử thách"],
    meaningUp: "Bánh xe vũ trụ đang xoay chuyển mang theo vận hội mới đầy bất ngờ. Hãy thuận theo dòng chảy tự nhiên và nắm bắt thời cơ.",
    meaningRev: "Mọi giai đoạn khó khăn chỉ là tạm thời; sự linh hoạt thích ứng sẽ giúp bạn sớm đón chu kỳ khởi sắc tiếp theo."
  },
  {
    index: 11, numeral: "XI", fileKey: "11_Justice",
    name: "Justice", nameVi: "Công Lý (Sự Công Bằng & Chân Thật)",
    element: "Khí (Air)", astro: "Thiên Bình (Libra)",
    keywordsUp: ["Công bằng", "Minh bạch", "Trách nhiệm", "Nhân quả rõ ràng", "Quyết định sáng suốt"],
    keywordsRev: ["Thiên vị", "Thiếu khách quan", "Trốn tránh trách nhiệm", "Mất cân bằng"],
    meaningUp: "Sự thật và công bằng sẽ được trả lại đúng vị trí. Hãy đưa ra quyết định dựa trên sự khách quan, chính trực và cân nhắc thấu đáo.",
    meaningRev: "Cần nhìn nhận vấn đề từ cả hai phía một cách công tâm, tránh để cảm xúc nhất thời làm lệch cán cân phán đoán."
  },
  {
    index: 12, numeral: "XII", fileKey: "12_Hanged_Man",
    name: "The Hanged Man", nameVi: "Người Treo Ngược (Góc Nhìn Mới & Buông Bỏ)",
    element: "Nước (Water)", astro: "Sao Hải Vương (Neptune)",
    keywordsUp: ["Góc nhìn đa chiều", "Tạm dừng", "Chấp nhận", "Giác ngộ", "Hy sinh vì đại cục"],
    keywordsRev: ["Bế tắc", "Vùng vẫy vô ích", "Chần chừ", "Hy sinh không đáng"],
    meaningUp: "Đôi khi lùi một bước và nhìn thế giới ở một góc độ hoàn toàn khác sẽ mở ra cánh cửa giải thoát kỳ diệu mà bạn chưa từng nghĩ tới.",
    meaningRev: "Đừng cố chấp giữ mãi một thói quen hay suy nghĩ cũ kỹ đang kìm hãm bước tiến của bạn."
  },
  {
    index: 13, numeral: "XIII", fileKey: "13_Death",
    name: "Death", nameVi: "Sự Chuyển Hóa (Khép Lại Để Tái Sinh)",
    element: "Nước (Water)", astro: "Bọ Cạp (Scorpio)",
    keywordsUp: ["Chuyển hóa sâu sắc", "Tái sinh", "Kết thúc cái cũ", "Giải phóng", "Thay máu"],
    keywordsRev: ["Sợ thay đổi", "Níu kéo quá khứ", "Trì trệ", "Chuyển giao chậm"],
    meaningUp: "Một chương cũ đã hoàn thành sứ mệnh của nó. Hãy dũng cảm khép lại quá khứ để đón nhận sự tái sinh rực rỡ và tươi mới hơn.",
    meaningRev: "Việc cố níu giữ những điều đã qua chỉ làm chậm lại sự trưởng thành và cơ hội mới đang chờ đợi bạn."
  },
  {
    index: 14, numeral: "XIV", fileKey: "14_Temperance",
    name: "Temperance", nameVi: "Sự Điều Độ (Dung Hòa & Chữa Lành)",
    element: "Lửa (Fire)", astro: "Nhân Mã (Sagittarius)",
    keywordsUp: ["Cân bằng", "Hài hòa", "Kiên nhẫn", "Chữa lành", "Kết hợp khéo léo"],
    keywordsRev: ["Thái quá", "Mất kiên nhẫn", "Xung đột nội tâm", "Thiếu điều độ"],
    meaningUp: "Sự bình yên và thành công đến từ khả năng dung hòa những mặt đối lập một cách nhịp nhàng, điềm đạm và kiên nhẫn.",
    meaningRev: "Bạn đang đi vào những thái cực quá mức; hãy hít thở sâu và lập lại nhịp điệu cân bằng cho cuộc sống."
  },
  {
    index: 15, numeral: "XV", fileKey: "15_Devil",
    name: "The Devil", nameVi: "Ác Quỷ (Ràng Buộc & Khát Vọng Thầm Kín)",
    element: "Đất (Earth)", astro: "Ma Kết (Capricorn)",
    keywordsUp: ["Đam mê mãnh liệt", "Cám dỗ", "Ràng buộc", "Ám ảnh", "Vật chất"],
    keywordsRev: ["Thức tỉnh", "Giải thoát", "Bẻ gãy xiềng xích", "Làm chủ bản thân"],
    meaningUp: "Hãy nhận diện rõ những nỗi sợ, thói quen hoặc mối quan hệ độc hại đang trói buộc bạn. Chìa khóa mở chiếc khóa ấy thực chất nằm ngay trong tay bạn.",
    meaningRev: "Khoảnh khắc bừng tỉnh mạnh mẽ! Bạn đang lấy lại quyền tự do và bước ra khỏi bóng tối của sự phụ thuộc."
  },
  {
    index: 16, numeral: "XVI", fileKey: "16_Tower",
    name: "The Tower", nameVi: "Tòa Tháp (Sự Thức Tỉnh Đột Ngột)",
    element: "Lửa (Fire)", astro: "Sao Hỏa (Mars)",
    keywordsUp: ["Thay đổi đột ngột", "Phá vỡ ảo tưởng", "Thức tỉnh", "Xây lại từ nền tảng thật"],
    keywordsRev: ["Tránh được khủng hoảng", "Sợ biến cố", "Thay đổi âm ỉ"],
    meaningUp: "Những cấu trúc xây trên nền tảng không còn vững chắc sẽ sụp đổ để trả lại sự thật trần trụi, giúp bạn xây dựng lại một cuộc đời chân thật và bền vững hơn.",
    meaningRev: "Bạn đã linh cảm thấy sự thay đổi cần thiết; hãy chủ động điều chỉnh trước khi hoàn cảnh bắt buộc phải đổi thay."
  },
  {
    index: 17, numeral: "XVII", fileKey: "17_Star",
    name: "The Star", nameVi: "Ngôi Sao Hy Vọng (Chữa Lành & Cảm Hứng)",
    element: "Khí (Air)", astro: "Bảo Bình (Aquarius)",
    keywordsUp: ["Hy vọng", "Chữa lành", "Niềm tin", "Cảm hứng sáng tạo", "Tương lai tươi sáng"],
    keywordsRev: ["Hoài nghi", "Mất cảm hứng", "Bi quan tạm thời", "Quên đi giá trị bản thân"],
    meaningUp: "Sau cơn mưa trời lại sáng. Ánh sao của sự chữa lành, bình yên và phước lành vũ trụ đang soi rọi con đường phía trước của bạn.",
    meaningRev: "Đừng để những thất vọng nhỏ làm tắt đi ngọn lửa hy vọng; hãy tin rằng vũ trụ vẫn đang âm thầm nâng đỡ bạn."
  },
  {
    index: 18, numeral: "XVIII", fileKey: "18_Moon",
    name: "The Moon", nameVi: "Ánh Trăng (Tiềm Thức & Ảo Ảnh)",
    element: "Nước (Water)", astro: "Song Ngư (Pisces)",
    keywordsUp: ["Trực giác sâu", "Giấc mơ", "Điều chưa rõ ràng", "Cảm xúc ẩn giấu"],
    keywordsRev: ["Sáng tỏ sự thật", "Tan biến nỗi sợ", "Vượt qua hoang mang"],
    meaningUp: "Mọi thứ dưới ánh trăng có thể chưa hiện rõ toàn bộ hình hài. Hãy bước đi thận trọng, lắng nghe trực giác và đừng để nỗi sợ vô hình dẫn dắt.",
    meaningRev: "Màn sương mù đang dần tan biến, những hiểu lầm hoặc bí mật sẽ sớm được phơi bày dưới ánh sáng sự thật."
  },
  {
    index: 19, numeral: "XIX", fileKey: "19_Sun",
    name: "The Sun", nameVi: "Mặt Trời (Rực Rỡ, Hạnh Phúc & Thành Công)",
    element: "Lửa (Fire)", astro: "Mặt Trời (Sun)",
    keywordsUp: ["Thành công rực rỡ", "Niềm vui", "Sinh khí dồi dào", "Minh bạch", "Ấm áp"],
    keywordsRev: ["Thành công đến muộn", "Quá tự mãn", "Che giấu nỗi buồn nhỏ"],
    meaningUp: "Lá bài rực rỡ nhất bộ bài! Ánh nắng của niềm vui, may mắn, thành tựu và sự viên mãn đang chiếu sáng trọn vẹn cuộc sống của bạn.",
    meaningRev: "Mây mù chỉ che khuất mặt trời trong chốc lát; niềm vui và kết quả tốt đẹp vẫn chắc chắn thuộc về bạn."
  },
  {
    index: 20, numeral: "XX", fileKey: "20_Judgement",
    name: "Judgement", nameVi: "Phán Quyết (Tiếng Gọi Thức Tỉnh & Tái Sinh)",
    element: "Lửa (Fire)", astro: "Sao Diêm Vương (Pluto)",
    keywordsUp: ["Thức tỉnh tâm linh", "Tha thứ", "Bước ngoặt lớn", "Tiếng gọi sứ mệnh"],
    keywordsRev: ["Khắt khe với bản thân", "Chối bỏ tiếng gọi", "Nuối tiếc quá khứ"],
    meaningUp: "Thời khắc tổng kết quá khứ, tha thứ cho chính mình và đáp lại tiếng gọi thiêng liêng của sứ mệnh mới cao đẹp hơn.",
    meaningRev: "Hãy thôi tự trách mình vì những chuyện đã qua; rút ra bài học và cho bản thân cơ hội bước sang trang mới."
  },
  {
    index: 21, numeral: "XXI", fileKey: "21_World",
    name: "The World", nameVi: "Thế Giới (Viên Mãn & Hoàn Thành Trọn Vẹn)",
    element: "Đất (Earth)", astro: "Sao Thổ (Saturn)",
    keywordsUp: ["Viên mãn", "Hoàn thành xuất sắc", "Hội nhập", "Thành tựu trọn vẹn"],
    keywordsRev: ["Chưa khép lại trọn vẹn", "Thiếu bước cuối", "Cần kiên trì thêm"],
    meaningUp: "Một chu kỳ lớn khép lại trong sự viên mãn và vinh quang. Bạn đã trưởng thành vượt bậc và sẵn sàng vươn ra những chân trời rộng lớn.",
    meaningRev: "Bạn đã đi được 90% chặng đường; hãy hoàn tất những chi tiết cuối cùng để tận hưởng thành quả trọn vẹn nhất."
  }
];

// Suit definitions for 56 Minor Arcana
const SUIT_CONFIGS = [
  {
    suit: "Wands",
    suitVi: "Gậy (Wands)",
    nouveauSuit: "Clubs",
    element: "Lửa (Fire)",
    domain: "Đam mê, Sự nghiệp, Hành động & Sáng tạo",
    solaOffset: 22
  },
  {
    suit: "Cups",
    suitVi: "Cốc (Cups)",
    nouveauSuit: "Hearts",
    element: "Nước (Water)",
    domain: "Tình cảm, Trực giác, Mối quan hệ & Tâm hồn",
    solaOffset: 36
  },
  {
    suit: "Swords",
    suitVi: "Kiếm (Swords)",
    nouveauSuit: "Spades",
    element: "Khí (Air)",
    domain: "Trí tuệ, Tư duy, Thử thách & Sự thật",
    solaOffset: 50
  },
  {
    suit: "Pents",
    suitVi: "Tiền (Pentacles)",
    nouveauSuit: "Diamonds",
    element: "Đất (Earth)",
    domain: "Tài chính, Vật chất, Sức khỏe & Thành quả bền vững",
    solaOffset: 64
  }
];

const MINOR_CARDS_LORE = {
  Wands: [
    { rank: 1, title: "Ace of Wands", titleVi: "Át Gậy (Khởi Nguồn Đam Mê)", kwUp: ["Cơ hội mới", "Cảm hứng bùng nổ", "Khởi đầu đầy nhiệt huyết"], kwRev: ["Trì hoãn", "Thiếu động lực", "Ý tưởng chưa chín muồi"], up: "Ngọn lửa đam mê và cơ hội hành động mới đang bùng cháy. Hãy nắm bắt ngay tia sáng sáng tạo này!", rev: "Bạn đang cảm thấy chững lại hoặc chưa tìm được thời điểm thích hợp để bắt đầu dự án." },
    { rank: 2, title: "Two of Wands", titleVi: "2 Gậy (Hoạch Định Tương Lai)", kwUp: ["Tầm nhìn xa", "Lập kế hoạch", "Bước ra thế giới"], kwRev: ["Sợ bước khỏi vùng an toàn", "Thiếu kế hoạch"], up: "Bạn đang đứng trước chân trời rộng mở. Hãy lập kế hoạch bài bản và mạnh dạn vươn tới mục tiêu lớn hơn.", rev: "Sự do dự và nỗi sợ cái mới đang giữ chân bạn tại vùng an toàn quen thuộc." },
    { rank: 3, title: "Three of Wands", titleVi: "3 Gậy (Mở Rộng Chân Trời)", kwUp: ["Triển vọng sáng", "Mở rộng quy mô", "Đón chờ thành quả"], kwRev: ["Chậm tiến độ", "Trở ngại đường xa"], up: "Những nỗ lực ban đầu đang dần đi đúng hướng. Những cơ hội hợp tác và phát triển rộng lớn đang tiến về phía bạn.", rev: "Một vài sự chậm trễ nhỏ đòi hỏi bạn cần kiên nhẫn và rà soát lại kế hoạch." },
    { rank: 4, title: "Four of Wands", titleVi: "4 Gậy (Ăn Mừng & Sum Họp)", kwUp: ["Hạnh phúc", "Lễ kỷ niệm", "Gia đình ấm êm", "Cột mốc đáng nhớ"], kwRev: ["Niềm vui chưa trọn", "Bất ổn nhỏ trong nhà"], up: "Thời điểm tuyệt vời để ăn mừng thành quả, tận hưởng sự bình yên, đoàn viên hoặc một cột mốc cam kết bền vững.", rev: "Hãy dành thêm sự quan tâm để giữ gìn bầu không khí hòa thuận với những người thân yêu." },
    { rank: 5, title: "Five of Wands", titleVi: "5 Gậy (Cạnh Tranh & Thử Lửa)", kwUp: ["Cạnh tranh lành mạnh", "Tranh luận", "Thử thách năng lực"], kwRev: ["Hòa giải", "Né tránh xung đột", "Mệt mỏi vì tranh cãi"], up: "Môi trường đang có sự cạnh tranh hoặc nhiều ý kiến trái chiều. Hãy coi đây là cơ hội để rèn giũa bản lĩnh vượt trội.", rev: "Đã đến lúc tìm tiếng nói chung và chấm dứt những mâu thuẫn không cần thiết." },
    { rank: 6, title: "Six of Wands", titleVi: "6 Gậy (Khải Hoàn & Vinh Quang)", kwUp: ["Chiến thắng", "Được công nhận", "Tự hào", "Thành công"], kwRev: ["Kiêu ngạo", "Thiếu sự ghi nhận", "Tự nghi ngờ"], up: "Nỗ lực của bạn được đền đáp xứng đáng bằng sự công nhận, tán thưởng và thành công rực rỡ trước tập thể.", rev: "Đừng phụ thuộc vào lời khen của người khác; hãy tự ghi nhận giá trị đích thực của bản thân." },
    { rank: 7, title: "Seven of Wands", titleVi: "7 Gậy (Kiên Định Bảo Vệ Lập Trường)", kwUp: ["Bền bỉ", "Bảo vệ thành quả", "Không lùi bước"], kwRev: ["Quá tải", "Muốn bỏ cuộc", "Phòng thủ thái quá"], up: "Dù có nhiều áp lực bủa vây, bạn vẫn nắm giữ vị thế thuận lợi. Hãy kiên định bảo vệ lý tưởng và vị trí của mình.", rev: "Bạn đang tự ôm đồm quá nhiều mặt trận; hãy chọn lọc điều thực sự quan trọng để bảo vệ." },
    { rank: 8, title: "Eight of Wands", titleVi: "8 Gậy (Tăng Tốc & Tin Vui Tới Tấp)", kwUp: ["Tiến triển thần tốc", "Tin tức nhanh", "Hành động dứt khoát"], kwRev: ["Chậm trễ", "Hấp tấp", "Hiểu lầm thông tin"], up: "Mọi sự trì trệ đều được tháo gỡ! Tin vui, cơ hội hoặc sự tiến triển trong tình cảm và công việc sẽ đến rất nhanh.", rev: "Hãy kiểm tra kỹ thông tin và tránh hành động vội vàng khi tâm trí còn rối bời." },
    { rank: 9, title: "Nine of Wands", titleVi: "9 Gậy (Chiến Binh Kiên Cường)", kwUp: ["Bền gan", "Chặng cuối", "Cảnh giác", "Sức chịu đựng"], kwRev: ["Kiệt sức", "Đa nghi quá mức", "Cần nghỉ ngơi"], up: "Dù đã thấm mệt sau nhiều thử thách, vạch đích đã ở rất gần. Hãy giữ vững ý chí thêm một chút nữa!", rev: "Cho phép bản thân được nghỉ ngơi và hạ bớt rào cản phòng vệ với những người chân thành." },
    { rank: 10, title: "Ten of Wands", titleVi: "10 Gậy (Gánh Nặng Trách Nhiệm)", kwUp: ["Trách nhiệm lớn", "Làm việc chăm chỉ", "Ôm đồm"], kwRev: ["San sẻ gánh nặng", "Buông bỏ áp lực", "Quá tải"], up: "Bạn đang gánh vác quá nhiều trách nhiệm cùng lúc. Hãy học cách phân quyền và ưu tiên điều cốt lõi.", rev: "Thời điểm thích hợp để đặt xuống những gánh nặng không thuộc về bạn và giải phóng năng lượng." },
    { rank: 11, title: "Page of Wands", titleVi: "Tiểu Đồng Gậy (Tin Vui & Nhiệt Huyết)", kwUp: ["Khám phá", "Tin tức tích cực", "Hứng khởi học hỏi"], kwRev: ["Thiếu kiên trì", "Cả thèm chóng chán"], up: "Một nguồn cảm hứng trẻ trung, một tin tức thú vị hoặc một đam mê mới đang gõ cửa tâm hồn bạn.", rev: "Hãy biến sự hào hứng ban đầu thành kế hoạch cụ thể thay vì bỏ dở giữa chừng." },
    { rank: 12, title: "Knight of Wands", titleVi: "Hiệp Sĩ Gậy (Chinh Phục Đầy Lửa)", kwUp: ["Nhiệt huyết", "Táo bạo", "Hành động nhanh", "Quyến rũ"], kwRev: ["Nóng nảy", "Bốc đồng", "Thiếu kiên nhẫn"], up: "Nguồn năng lượng dồi dào thúc đẩy bạn tiến lên phía trước với lòng quả cảm và sức hút mãnh liệt.", rev: "Kiềm chế sự nóng vội để tránh những quyết định bốc đồng gây tiếc nuối." },
    { rank: 13, title: "Queen of Wands", titleVi: "Nữ Hoàng Gậy (Tự Tin & Tỏa Sáng)", kwUp: ["Quyến rũ", "Tự tin", "Độc lập", "Truyền cảm hứng"], kwRev: ["Ghen tuông", "Nóng tính", "Mất tự tin tạm thời"], up: "Hãy tỏa sáng rực rỡ với sự tự tin, ấm áp và sức hút tự nhiên. Bạn có khả năng truyền lửa tuyệt vời cho mọi người.", rev: "Hãy nuôi dưỡng lại sự tự tin nội tại và tránh để cảm xúc tiêu cực chi phối." },
    { rank: 14, title: "King of Wands", titleVi: "Vua Gậy (Nhà Lãnh Đạo Tầm Nhìn)", kwUp: ["Tầm nhìn lớn", "Bản lĩnh dẫn dắt", "Doanh nhân", "Uy tín"], kwRev: ["Áp đặt", "Nóng vội", "Kỳ vọng quá khắt khe"], up: "Tư duy chiến lược, tầm nhìn xa và phong thái lãnh đạo đầy nhiệt huyết sẽ đưa bạn tới đỉnh cao thành tựu.", rev: "Lắng nghe ý kiến đóng góp nhiều hơn để trở thành người dẫn đường thấu cảm và toàn diện." }
  ],
  Cups: [
    { rank: 1, title: "Ace of Cups", titleVi: "Át Cốc (Suối Nguồn Yêu Thương)", kwUp: ["Tình yêu chớm nở", "Cảm xúc dạt dào", "Trực giác", "Chữa lành"], kwRev: ["Khép lòng", "Kìm nén cảm xúc", "Tình cảm hụt hẫng"], up: "Trái tim bạn đang tràn ngập tình yêu thương, niềm vui và sự kết nối tâm hồn sâu sắc. Một mối lương duyên hoặc niềm hạnh phúc mới đang bắt đầu.", rev: "Hãy yêu thương và chữa lành những tổn thương trong lòng mình trước khi mở cửa đón nhận người khác." },
    { rank: 2, title: "Two of Cups", titleVi: "2 Cốc (Tri Kỷ & Giao Hòa)", kwUp: ["Tình yêu đôi lứa", "Sự đồng điệu", "Hợp tác ăn ý", "Cam kết"], kwRev: ["Hiểu lầm nhỏ", "Mất cân bằng cho-nhận"], up: "Sự kết nối tuyệt đẹp giữa hai tâm hồn đồng điệu. Dù trong tình yêu hay hợp tác, hai bên đều tôn trọng và nâng đỡ nhau.", rev: "Cần trò chuyện chân thành để tháo gỡ những hiểu lầm và lập lại sự cân bằng trong mối quan hệ." },
    { rank: 3, title: "Three of Cups", titleVi: "3 Cốc (Hội Ngộ & Niềm Vui Sẻ Chia)", kwUp: ["Tình bạn", "Tiệc tùng", "Tin vui chung", "Cộng đồng nâng đỡ"], kwRev: ["Thị phi", "Quá đà tiệc tùng", "Cảm giác lạc lõng"], up: "Thời khắc sum vầy, sẻ chia niềm vui cùng bạn bè, đồng nghiệp hoặc đón nhận tin mừng trong đời sống tình cảm.", rev: "Hãy chọn lọc những mối quan hệ chất lượng và tránh xa những lời bàn tán không cần thiết." },
    { rank: 4, title: "Four of Cups", titleVi: "4 Cốc (Trầm Tư & Cơ Hội Bỏ Ngỏ)", kwUp: ["Thờ ơ", "Chiêm nghiệm lại", "Chưa hài lòng", "Cần đổi mới"], kwRev: ["Tỉnh ngộ", "Nắm bắt cơ hội mới", "Thoát khỏi uể oải"], up: "Bạn đang mải nhìn vào những điều chưa như ý mà vô tình bỏ qua chiếc cốc cơ hội quý giá vũ trụ đang trao tặng ngay trước mắt.", rev: "Bạn đang dần bước ra khỏi trạng thái thờ ơ và sẵn sàng đón nhận luồng gió mới." },
    { rank: 5, title: "Five of Cups", titleVi: "5 Cốc (Buông Bỏ Nỗi Buồn Quá Khứ)", kwUp: ["Tiếc nuối", "Tổn thương", "Nhìn lại những gì còn lại"], kwRev: ["Chữa lành", "Tha thứ", "Hướng về phía trước"], up: "Ba chiếc cốc đã đổ nhưng vẫn còn hai chiếc cốc nguyên vẹn phía sau. Đừng để nỗi buồn quá khứ che khuất những phước lành hiện tại.", rev: "Trái tim bạn đang lành lại; sự tha thứ và chấp nhận giúp bạn tìm lại nụ cười." },
    { rank: 6, title: "Six of Cups", titleVi: "6 Cốc (Ký Ức Ngọt Ngào & Chân Thành)", kwUp: ["Hoài niệm", "Người cũ", "Tình cảm trong sáng", "Sự sẻ chia"], kwRev: ["Mắc kẹt ở quá khứ", "Trưởng thành vượt qua kỷ niệm"], up: "Những kỷ niệm đẹp đẽ, sự xuất hiện của một người quen cũ hoặc một tình cảm chân thành, thuần khiết mang lại sự ấm áp.", rev: "Trân trọng quá khứ nhưng hãy sống trọn vẹn cho hiện tại và tương lai." },
    { rank: 7, title: "Seven of Cups", titleVi: "7 Cốc (Giấc Mơ & Nhiều Lựa Chọn)", kwUp: ["Nhiều cơ hội", "Trí tưởng tượng", "Mơ mộng", "Cần tỉnh táo chọn lựa"], kwRev: ["Xác định rõ mục tiêu", "Thoát khỏi ảo mộng"], up: "Trước mắt bạn có rất nhiều lựa chọn hấp dẫn nhưng không phải chiếc cốc nào cũng là vàng thật. Hãy dùng lý trí để chọn điều thiết thực nhất.", rev: "Sự tỉnh táo quay trở lại giúp bạn gạt bỏ những ảo tưởng và tập trung vào giá trị thực tế." },
    { rank: 8, title: "Eight of Cups", titleVi: "8 Cốc (Rời Đi Tìm Ý Nghĩa Cao Hơn)", kwUp: ["Buông bỏ điều không còn phù hợp", "Hành trình tâm linh", "Dũng cảm bước tiếp"], kwRev: ["Ngại thay đổi", "Lưu luyến", "Ở lại vùng an toàn"], up: "Đôi khi rời bỏ một nơi đã quen thuộc nhưng không còn làm tâm hồn bạn trọn vẹn là bước đi dũng cảm để tìm thấy hạnh phúc đích thực.", rev: "Hãy lắng nghe trái tim xem bạn thực sự muốn ở lại hoàn thiện hay đang sợ bước đi." },
    { rank: 9, title: "Nine of Cups", titleVi: "9 Cốc (Ước Nguyện Thành Hiện Thực)", kwUp: ["Mãn nguyện", "Ước mơ thành sự thật", "Sung túc", "Tự hào"], kwRev: ["Chưa thỏa mãn sâu bên trong", "Ham muốn bề nổi"], up: "Lá bài của ước nguyện thành hiện thực! Sự hài lòng, sung túc và niềm vui trọn vẹn đang mỉm cười với bạn.", rev: "Hãy tìm kiếm niềm hạnh phúc bền vững từ bên trong tâm hồn thay vì chỉ qua những giá trị vật chất bên ngoài." },
    { rank: 10, title: "Ten of Cups", titleVi: "10 Cốc (Hạnh Phúc Viên Mãn & Gia Đình)", kwUp: ["Gia đình hạnh phúc", "Tình yêu trọn vẹn", "Bình yên", "Cầu vồng viên mãn"], kwRev: ["Bất đồng gia đình nhỏ", "Kỳ vọng quá hoàn hảo"], up: "Bức tranh cầu vồng của sự viên mãn cảm xúc, gia đạo ấm êm và tình yêu thương bền chặt theo năm tháng.", rev: "Hạnh phúc đích thực đến từ sự thấu hiểu và chấp nhận những điều chưa hoàn hảo của nhau." },
    { rank: 11, title: "Page of Cups", titleVi: "Tiểu Đồng Cốc (Lời Tỏ Tình & Linh Cảm)", kwUp: ["Tin vui tình cảm", "Trực giác nhạy bén", "Sự lãng mạn", "Sáng tạo nghệ thuật"], kwRev: ["Nhạy cảm quá mức", "Ngại bày tỏ"], up: "Một lời nhắn ngọt ngào, một rung động lãng mạn bất ngờ hoặc một ý tưởng nghệ thuật tinh tế đang tìm đến bạn.", rev: "Đừng để sự nhạy cảm hay tự ti ngăn cản bạn bày tỏ tình cảm chân thành của mình." },
    { rank: 12, title: "Knight of Cups", titleVi: "Hiệp Sĩ Cốc (Người Lãng Mạn Theo Đuổi Trái Tim)", kwUp: ["Lãng mạn", "Tỏ tình", "Hào hoa", "Theo đuổi ước mơ"], kwRev: ["Mơ mộng thiếu thực tế", "Cảm xúc thất thường"], up: "Một hành trình hoặc một người mang đầy sự lãng mạn, tinh tế và chân thành đang tiến về phía bạn.", rev: "Hãy kết hợp sự lãng mạn của trái tim với những hành động thực tế, rõ ràng." },
    { rank: 13, title: "Queen of Cups", titleVi: "Nữ Hoàng Cốc (Thấu Cảm & Trực Giác Sâu Sắc)", kwUp: ["Thấu cảm", "Dịu dàng", "Trực giác mạnh", "Chữa lành tâm hồn"], kwRev: ["Dễ tổn thương", "Lo nghĩ cho người khác quá nhiều"], up: "Sự dịu dàng, lòng trắc ẩn và khả năng thấu hiểu sâu sắc giúp bạn trở thành điểm tựa tinh thần quý giá.", rev: "Hãy bảo vệ ranh giới cảm xúc của mình để không bị cuốn vào nỗi buồn của người khác." },
    { rank: 14, title: "King of Cups", titleVi: "Vua Cốc (Bản Lĩnh Làm Chủ Cảm Xúc)", kwUp: ["Điềm đạm", "Bao dung", "Trưởng thành cảm xúc", "Khôn ngoan"], kwRev: ["Kìm nén cảm xúc", "Lạnh lùng bề ngoài"], up: "Sự kết hợp hoàn hảo giữa một trái tim ấm áp, giàu lòng nhân ái và một cái đầu điềm tĩnh, vững vàng trước mọi sóng gió.", rev: "Đừng giấu kín mọi tâm sự một mình; sự sẻ chia đúng lúc sẽ giúp tâm hồn bạn nhẹ nhõm hơn." }
  ],
  Swords: [
    { rank: 1, title: "Ace of Swords", titleVi: "Át Kiếm (Lưỡi Kiếm Sự Thật & Đột Phá)", kwUp: ["Đột phá tư duy", "Sự thật sáng tỏ", "Quyết đoán", "Chiến thắng trí tuệ"], kwRev: ["Bối rối", "Lời nói sắc nhọn", "Thiếu thông tin"], up: "Mọi sự mơ hồ đều bị cắt đứt! Một ý tưởng sắc bén, một quyết định dứt khoát và sự thật minh bạch sẽ mang lại bước đột phá lớn.", rev: "Hãy suy nghĩ thật kỹ trước khi phát ngôn hoặc ký kết để tránh hiểu lầm không đáng có." },
    { rank: 2, title: "Two of Swords", titleVi: "2 Kiếm (Lưỡng Lự Giữa Hai Ngả Đường)", kwUp: ["Đắn đo", "Cần giữ trung lập", "Tạm hoãn để suy xét"], kwRev: ["Nhìn thẳng sự thật", "Đưa ra quyết định", "Quá tải thông tin"], up: "Bạn đang đứng giữa hai lựa chọn cân sức và tạm khóa chặt cảm xúc. Hãy tháo băng bịt mắt và nhìn thẳng vào dữ kiện thực tế.", rev: "Đã đến lúc chấm dứt sự trì hoãn và dũng cảm đưa ra quyết định cuối cùng." },
    { rank: 3, title: "Three of Swords", titleVi: "3 Kiếm (Đối Diện Nỗi Đau Để Trưởng Thành)", kwUp: ["Tổn thương cảm xúc", "Sự thật mất lòng", "Giải tỏa nỗi buồn"], kwRev: ["Chữa lành vết thương", "Tha thứ", "Vượt qua sóng gió"], up: "Đôi khi đối diện thẳng thắn với một nỗi buồn hay sự thật đau lòng lại là bước đầu tiên để gột rửa và chữa lành trái tim.", rev: "Cơn mưa giông đã đi qua, vết thương lòng đang dần khép lại để nhường chỗ cho sự bình yên." },
    { rank: 4, title: "Four of Swords", titleVi: "4 Kiếm (Tĩnh Dưỡng & Phục Hồi Tâm Trí)", kwUp: ["Nghỉ ngơi", "Thiền định", "Tạm lùi lại nạp năng lượng"], kwRev: ["Quay lại hành động", "Mệt mỏi vì không chịu nghỉ"], up: "Tâm trí bạn đã làm việc quá vất vả. Hãy cho phép mình tạm gác lại âu lo, nghỉ ngơi tĩnh dưỡng để phục hồi sự minh mẫn.", rev: "Sau khoảng thời gian tĩnh lặng, bạn đã sẵn sàng quay trở lại cuộc sống với nguồn sinh lực mới." },
    { rank: 5, title: "Five of Swords", titleVi: "5 Kiếm (Cái Giá Của Sự Hơn Thua)", kwUp: ["Tranh cãi", "Thắng cuộc nhưng mất hòa khí", "Cần biết lùi đúng lúc"], kwRev: ["Làm lành", "Buông bỏ cái tôi", "Hòa giải"], up: "Hãy tự hỏi liệu chiến thắng trong một cuộc tranh cãi có đáng để đánh đổi bằng sự tổn thương mối quan hệ hay không.", rev: "Hạ bớt cái tôi và chọn sự bình yên thay vì cố chứng minh mình đúng bằng mọi giá." },
    { rank: 6, title: "Six of Swords", titleVi: "6 Kiếm (Vượt Sóng Sang Bờ Bình Yên)", kwUp: ["Chuyển dịch tích cực", "Rời xa bão giông", "Bình yên phía trước"], kwRev: ["Khó buông bỏ", "Chuyến đi trì hoãn"], up: "Con thuyền đang đưa bạn rời khỏi vùng nước xoáy đầy biến động để tiến về bến bờ tĩnh lặng và sáng sủa hơn.", rev: "Đừng ngoái đầu tiếc nuối những sóng gió cũ; hành trình phía trước mới là nơi bạn thuộc về." },
    { rank: 7, title: "Seven of Swords", titleVi: "7 Kiếm (Chiến Lược Khéo Léo & Thận Trọng)", kwUp: ["Chiến thuật thông minh", "Làm việc độc lập", "Cảnh giác"], kwRev: ["Thú nhận sự thật", "Đổi mới cách tiếp cận"], up: "Hãy hành xử khôn khéo, giữ kín kế hoạch quan trọng và đồng thời tỉnh táo kiểm chứng độ tin cậy của những lời hứa xung quanh.", rev: "Sự chân thành và minh bạch thẳng thắn sẽ giúp bạn tháo gỡ tình thế tốt hơn mọi tiểu xảo." },
    { rank: 8, title: "Eight of Swords", titleVi: "8 Kiếm (Thoát Khỏi Nhà Tù Tư Duy)", kwUp: ["Tự giới hạn bản thân", "Lo âu", "Bế tắc do suy nghĩ"], kwRev: ["Cởi bỏ trói buộc", "Tìm ra lối thoát", "Tự do tư tưởng"], up: "Những thanh kiếm vây quanh thực chất không khóa chặt lối đi của bạn. Chính nỗi sợ và định kiến mới là thứ đang trói buộc bạn.", rev: "Khi bạn thay đổi góc nhìn và tháo bỏ nỗi sợ, con đường tự do lập tức hiện ra trước mắt." },
    { rank: 9, title: "Nine of Swords", titleVi: "9 Kiếm (Vượt Qua Nỗi Lo Đêm Khuya)", kwUp: ["Suy nghĩ quá nhiều", "Trăn trở", "Áp lực tâm lý"], kwRev: ["Giải tỏa lo âu", "Đón ánh bình minh", "Chia sẻ tâm sự"], up: "Đa phần những kịch bản tồi tệ bạn đang lo lắng trong đêm chỉ tồn tại trong tâm trí. Hãy chia sẻ và nhìn sự việc dưới ánh sáng ban ngày.", rev: "Gánh nặng tâm lý đang dần được trút bỏ, trả lại cho bạn giấc ngủ an lành." },
    { rank: 10, title: "Ten of Swords", titleVi: "10 Kiếm (Chạm Đáy Để Đón Bình Minh Mới)", kwUp: ["Khép lại hoàn toàn", "Chấm dứt đau khổ", "Bình minh ló rạng"], kwRev: ["Hồi sinh", "Vượt qua khủng hoảng", "Bài học quý giá"], up: "Mọi thử thách khắc nghiệt nhất đã chạm tới điểm tận cùng và không thể tệ hơn được nữa. Nhìn kìa, chân trời vàng rực của bình minh mới đang ló dạng!", rev: "Sự hồi phục mạnh mẽ sau biến cố; bạn bước ra khỏi thử thách với sự thông thái kiên cường." },
    { rank: 11, title: "Page of Swords", titleVi: "Tiểu Đồng Kiếm (Trí Tò Mò & Nhạy Bén)", kwUp: ["Tư duy sắc sảo", "Học hỏi nhanh", "Tin tức mới", "Quan sát"], kwRev: ["Tin đồn", "Vội vàng phán xét", "Tranh luận vụn vặt"], up: "Sự nhạy bén, ham học hỏi và khả năng nắm bắt thông tin nhanh nhạy giúp bạn phát hiện ra những cơ hội mới mẻ.", rev: "Hãy kiểm chứng nguồn tin cẩn thận và dùng lời nói để xây dựng thay vì chỉ trích." },
    { rank: 12, title: "Knight of Swords", titleVi: "Hiệp Sĩ Kiếm (Tốc Độ & Quyết Đoán)", kwUp: ["Hành động thần tốc", "Thẳng thắn", "Theo đuổi mục tiêu tới cùng"], kwRev: ["Nóng vội", "Lời nói gây sát thương", "Thiếu chuẩn bị"], up: "Khi mục tiêu đã xác định, bạn lao về phía trước với tốc độ và quyết tâm không gì cản nổi.", rev: "Hãy kết hợp tốc độ của trí tuệ với sự thấu cảm để không vô tình làm tổn thương người đồng hành." },
    { rank: 13, title: "Queen of Swords", titleVi: "Nữ Hoàng Kiếm (Sắc Sảo & Độc Lập)", kwUp: ["Minh mẫn", "Thẳng thắn", "Độc lập", "Nhìn thấu bản chất"], kwRev: ["Khắt khe", "Lạnh lùng do tổn thương cũ"], up: "Trí tuệ sắc bén, ranh giới rõ ràng và sự công tâm giúp bạn nhìn thấu bản chất vấn đề mà không bị cảm xúc làm lu mờ.", rev: "Sự sắc sảo khi kết hợp thêm lòng bao dung sẽ tạo nên sức thuyết phục tuyệt đối." },
    { rank: 14, title: "King of Swords", titleVi: "Vua Kiếm (Trí Tuệ Tối Thượng & Công Minh)", kwUp: ["Chuyên gia", "Phán đoán chuẩn xác", "Logic", "Chính trực"], kwRev: ["Độc đoán", "Quá lý thuyết", "Thiếu cảm xúc"], up: "Tư duy logic thượng thừa, sự chính trực và lời khuyên từ chuyên gia sẽ là kim chỉ nam giúp bạn giải quyết bài toán lớn.", rev: "Đừng quên lắng nghe cả tiếng nói của trái tim bên cạnh những phân tích lý trí." }
  ],
  Pents: [
    { rank: 1, title: "Ace of Pentacles", titleVi: "Át Tiền (Hạt Giống Thịnh Vượng & Tài Lộc)", kwUp: ["Cơ hội tài chính", "Khởi đầu vững chắc", "Thịnh vượng", "Sức khỏe tốt"], kwRev: ["Bỏ lỡ cơ hội", "Chi tiêu thiếu kế hoạch"], up: "Một món quà của sự thịnh vượng, một cơ hội nghề nghiệp, đầu tư hoặc nền tảng vật chất bền vững đang được trao vào tay bạn.", rev: "Hãy quản lý tài chính cẩn trọng và chuẩn bị kỹ lưỡng để không bỏ lỡ vận may." },
    { rank: 2, title: "Two of Pentacles", titleVi: "2 Tiền (Nghệ Thuật Cân Bằng Cuộc Sống)", kwUp: ["Linh hoạt", "Quản lý thời gian & tài chính", "Thích nghi tốt"], kwRev: ["Quá tải", "Mất cân đối thu chi"], up: "Dù cuộc sống có nhiều việc phải xoay xở, sự linh hoạt và khéo léo sẽ giúp bạn giữ mọi thứ vận hành nhịp nhàng.", rev: "Hãy cắt giảm những việc không thiết yếu và lập lại bảng cân đối thời gian cũng như tài chính." },
    { rank: 3, title: "Three of Pentacles", titleVi: "3 Tiền (Hợp Tác Chuyên Nghiệp & Tay Nghề)", kwUp: ["Làm việc nhóm xuất sắc", "Chuyên môn cao", "Học hỏi nâng tầm"], kwRev: ["Thiếu phối hợp", "Làm việc rời rạc"], up: "Sự kết hợp ăn ý giữa các cá nhân có chuyên môn và tinh thần cầu thị sẽ tạo nên công trình đáng tự hào.", rev: "Cần lắng nghe và thống nhất mục tiêu chung với các cộng sự để đạt hiệu quả cao nhất." },
    { rank: 4, title: "Four of Pentacles", titleVi: "4 Tiền (An Toàn Tài Chính & Giữ Gìn)", kwUp: ["Tiết kiệm", "Vững vàng tài chính", "Bảo toàn thành quả"], kwRev: ["Quá khắt khe", "Sợ mất mát", "Hoặc chi tiêu bốc đồng"], up: "Sự cẩn trọng và tích lũy giúp bạn có được nền tảng an toàn đáng mơ ước.", rev: "Tiền bạc và tình cảm cần có sự lưu thông hợp lý; đừng để nỗi sợ mất mát khiến bạn đóng kín lòng mình." },
    { rank: 5, title: "Five of Pentacles", titleVi: "5 Tiền (Cùng Nhau Vượt Qua Thử Thách)", kwUp: ["Khó khăn tạm thời", "Cần tìm sự trợ giúp", "Đồng cam cộng khổ"], kwRev: ["Khởi sắc tài chính", "Tìm thấy lối ra", "Hồi phục"], up: "Khó khăn hiện tại chỉ là thử thách ngắn hạn. Hãy nhìn lên khung cửa sáng đèn ngay bên cạnh—luôn có sự giúp đỡ nếu bạn mở lời.", rev: "Giai đoạn eo hẹp đang khép lại, công việc và tinh thần của bạn đang hồi sinh tích cực." },
    { rank: 6, title: "Six of Pentacles", titleVi: "6 Tiền (Hào Phóng, Sẻ Chia & Quý Nhân)", kwUp: ["Quý nhân phù trợ", "Cho và nhận công bằng", "Thịnh vượng sẻ chia"], kwRev: ["Cho đi không đúng chỗ", "Sự phụ thuộc tài chính"], up: "Năng lượng của sự sung túc và lòng hào phóng. Bạn sẽ nhận được sự hỗ trợ từ quý nhân hoặc có điều kiện giúp đỡ người khác.", rev: "Hãy giữ sự công bằng trong cả việc giúp đỡ lẫn đón nhận để mối quan hệ luôn bền đẹp." },
    { rank: 7, title: "Seven of Pentacles", titleVi: "7 Tiền (Kiên Nhẫn Đợi Ngày Hái Quả)", kwUp: ["Đầu tư dài hạn", "Kiên nhẫn", "Đánh giá thành quả"], kwRev: ["Nóng ruột", "Đầu tư dàn trải"], up: "Hạt giống bạn gieo trồng và chăm bón bấy lâu đang lớn lên vững chắc. Hãy kiên nhẫn chờ đợi mùa thu hoạch bội thu.", rev: "Hãy rà soát lại xem khoản đầu tư thời gian hay công sức nào đang mang lại giá trị thực chất nhất." },
    { rank: 8, title: "Eight of Pentacles", titleVi: "8 Tiền (Tận Tâm Rèn Giũa Tinh Hoa)", kwUp: ["Chăm chỉ", "Nâng cao tay nghề", "Tỉ mỉ", "Chuyên tâm"], kwRev: ["Cầu toàn quá mức", "Làm việc thiếu cảm hứng"], up: "Sự kiên trì, tỉ mỉ trong từng chi tiết và tinh thần không ngừng trau dồi kỹ năng sẽ biến bạn thành bậc thầy trong lĩnh vực của mình.", rev: "Đừng quên nhìn bức tranh tổng thể và giữ ngọn lửa đam mê trong công việc hàng ngày." },
    { rank: 9, title: "Nine of Pentacles", titleVi: "9 Tiền (Độc Lập, Sung Túc & Tao Nhã)", kwUp: ["Tự chủ tài chính", "Tận hưởng thành quả", "Sang trọng", "Độc lập"], kwRev: ["Làm việc quên tận hưởng", "Phụ thuộc vật chất"], up: "Phần thưởng xứng đáng cho những nỗ lực bền bỉ: sự độc lập, tự chủ tài chính và một cuộc sống chất lượng, bình yên.", rev: "Hãy tự thưởng cho bản thân những phút giây thư giãn và trân trọng giá trị tinh thần." },
    { rank: 10, title: "Ten of Pentacles", titleVi: "10 Tiền (Di Sản Thịnh Vượng & Gia Tộc Bền Vững)", kwUp: ["Giàu có bền vững", "Gia đình sung túc", "Di sản lâu dài", "An cư lạc nghiệp"], kwRev: ["Tranh chấp tài sản nhỏ", "Cần củng cố nền tảng lâu dài"], up: "Đỉnh cao của sự thịnh vượng vật chất lẫn hạnh phúc gia đình qua nhiều thế hệ. Một nền tảng tài chính và sự nghiệp cực kỳ vững chắc.", rev: "Hãy ưu tiên sự hòa thuận gia đình và những giá trị bền vững dài hạn hơn lợi ích ngắn hạn." },
    { rank: 11, title: "Page of Pentacles", titleVi: "Tiểu Đồng Tiền (Cơ Hội Học Tập & Khởi Nghiệp)", kwUp: ["Cơ hội thực tế", "Học bổng/Kỹ năng mới", "Chăm chỉ", "Khởi đầu vững"], kwRev: ["Trì hoãn kế hoạch", "Thiếu tập trung"], up: "Một tin vui về học tập, công việc mới hoặc một dự án kinh doanh đầy tiềm năng thực tế đang mở ra trước mắt bạn.", rev: "Hãy bắt tay vào hành động từng bước nhỏ mỗi ngày để biến mục tiêu thành hiện thực." },
    { rank: 12, title: "Knight of Pentacles", titleVi: "Hiệp Sĩ Tiền (Kiên Trì, Đáng Tin Cậy & Bền Bỉ)", kwUp: ["Đáng tin cậy", "Chăm chỉ", "Kiên định", "An toàn vững chắc"], kwRev: ["Bảo thủ", "Chậm thay đổi", "Quá nguyên tắc"], up: "Chậm mà chắc! Sự tận tụy, uy tín và kiên trì không mệt mỏi của bạn đảm bảo thành công bền vững 100%.", rev: "Giữ vững sự chăm chỉ nhưng hãy cởi mở đón nhận thêm những phương pháp đổi mới hiệu quả." },
    { rank: 13, title: "Queen of Pentacles", titleVi: "Nữ Hoàng Tiền (Đảm Đang, Trù Phú & Ấm Áp)", kwUp: ["Thịnh vượng", "Chăm sóc chu đáo", "Thực tế", "Vững vàng tài chính"], kwRev: ["Ôm đồm việc nhà/việc công", "Quên chăm sóc bản thân"], up: "Người phụ nữ hoặc nguồn năng lượng của sự sung túc, vừa giỏi quán xuyến tài chính công việc vừa mang lại tổ ấm tràn đầy yêu thương.", rev: "Hãy dành thời gian yêu chiều bản thân để nguồn năng lượng trù phú luôn dồi dào." },
    { rank: 14, title: "King of Pentacles", titleVi: "Vua Tiền (Đỉnh Cao Thịnh Vượng & Bản Lĩnh Tài Chính)", kwUp: ["Thành đạt", "Giàu có", "Bảo trợ vững chắc", "Quản trị xuất sắc"], kwRev: ["Thực dụng quá mức", "Áp lực giữ vững vị thế"], up: "Biểu tượng tối cao của sự thành đạt, giàu có, uy tín và khả năng biến mọi dự án chạm tay vào thành vàng ròng.", rev: "Sự giàu có đích thực là khi vật chất thịnh vượng song hành cùng sự bình an và hào phóng trong tâm hồn." }
  ]
};

// Build complete 78-Card Array
const FULL_TAROT_DECK = [];

// 1. Add 22 Major Arcana
MAJOR_ARCANA_DATA.forEach((m) => {
  FULL_TAROT_DECK.push({
    id: `major_${m.index}`,
    index: m.index,
    arcana: "Major",
    arcanaVi: "Bộ Ẩn Chính (Major Arcana)",
    suit: "Major",
    suitVi: "Ẩn Chính",
    numeral: m.numeral,
    rank: m.index,
    name: m.name,
    nameVi: m.nameVi,
    element: m.element,
    astro: m.astro,
    keywordsUp: m.keywordsUp,
    keywordsRev: m.keywordsRev,
    meaningUp: m.meaningUp,
    meaningRev: m.meaningRev,
    fileKey: m.fileKey
  });
});

// 2. Add 56 Minor Arcana
let globalIdx = 22;
SUIT_CONFIGS.forEach((suitCfg) => {
  const suitCards = MINOR_CARDS_LORE[suitCfg.suit];
  suitCards.forEach((c) => {
    const padNum = String(c.rank).padStart(2, "0");
    FULL_TAROT_DECK.push({
      id: `${suitCfg.suit.toLowerCase()}_${padNum}`,
      index: globalIdx++,
      arcana: "Minor",
      arcanaVi: `Bộ Ẩn Phụ • ${suitCfg.suitVi}`,
      suit: suitCfg.suit,
      suitVi: suitCfg.suitVi,
      nouveauSuit: suitCfg.nouveauSuit,
      numeral: String(c.rank),
      rank: c.rank,
      name: c.title,
      nameVi: c.titleVi,
      element: suitCfg.element,
      astro: suitCfg.domain,
      keywordsUp: c.kwUp,
      keywordsRev: c.kwRev,
      meaningUp: c.up,
      meaningRev: c.rev,
      fileKey: `${suitCfg.suit}${padNum}`,
      solaIndex: suitCfg.solaOffset + (c.rank - 1)
    });
  });
});

/**
 * Resolve the exact External Front Image URL (and fallback URL) for any card (0..77)
 * in any of the 8 external decks.
 */
function getCardImageUrls(card, deckId = "rider-waite") {
  const effectiveDeck = deckId === "rider-waite-rare" ? "rider-waite" : deckId;

  if (effectiveDeck === "rider-waite" || effectiveDeck === "soimoi") {
    const file = `${card.fileKey}.jpg`;
    return {
      primary: `${CDN_BASE}/${effectiveDeck}/720px/${file}`,
      fallback: `${RAW_BASE}/${effectiveDeck}/720px/${file}`
    };
  }

  if (effectiveDeck === "marseille") {
    const file = card.arcana === "Major"
      ? MARSEILLE_MAJOR_FILES[card.rank]
      : `${card.fileKey}.png`;
    return {
      primary: `${CDN_BASE}/marseille/720px/${file}`,
      fallback: `${RAW_BASE}/marseille/720px/${file}`
    };
  }

  if (effectiveDeck === "vieville") {
    const file = card.arcana === "Major"
      ? VIEVILLE_MAJOR_FILES[card.rank]
      : `${card.fileKey}.jpg`;
    return {
      primary: `${CDN_BASE}/vieville/720px/${file}`,
      fallback: `${RAW_BASE}/vieville/720px/${file}`
    };
  }

  if (effectiveDeck === "tarot-nouveau") {
    const padRank = String(card.rank).padStart(2, "0");
    const file = card.arcana === "Major"
      ? (card.rank === 0 ? "00_Excuse.jpg" : `${padRank}_Atout.jpg`)
      : `${card.nouveauSuit}${padRank}.jpg`;
    return {
      primary: `${CDN_BASE}/tarot-nouveau/720px/${file}`,
      fallback: `${RAW_BASE}/tarot-nouveau/720px/${file}`
    };
  }

  if (effectiveDeck === "sola-busca") {
    const idx = card.arcana === "Major" ? card.rank : card.solaIndex;
    const file = `${String(idx).padStart(2, "0")}.jpg`;
    return {
      primary: `${CDN_BASE}/sola-busca/720px/${file}`,
      fallback: `${RAW_BASE}/sola-busca/720px/${file}`
    };
  }

  if (effectiveDeck === "krates-rws") {
    let file = "";
    if (card.arcana === "Major") {
      file = KRATES_MAJOR_FILES[card.rank];
    } else {
      const rankWord = RANK_WORDS[card.rank - 1];
      const suitWord = card.suit === "Pents" ? "pentacles" : card.suit.toLowerCase();
      file = `${rankWord}of${suitWord}.jpeg`;
    }
    return {
      primary: `${KRATES_CDN}/${file}`,
      fallback: `${KRATES_RAW}/${file}`
    };
  }

  // Default fallback to Rider-Waite
  return {
    primary: `${CDN_BASE}/rider-waite/720px/${card.fileKey}.jpg`,
    fallback: `${RAW_BASE}/rider-waite/720px/${card.fileKey}.jpg`
  };
}

/**
 * Resolve External Card Back URL
 */
function getCardBackUrls(backId = "rws-classic") {
  const found = EXTERNAL_CARD_BACKS.find((b) => b.id === backId) || EXTERNAL_CARD_BACKS[0];
  return {
    primary: found.url,
    fallback: found.fallbackUrl,
    name: found.name
  };
}

// Spread Configurations (Các kiểu trải bài 3 lá)
const SPREAD_TYPES = [
  {
    id: "past-present-future",
    name: "Quá Khứ • Hiện Tại • Tương Lai",
    desc: "Khám phá dòng chảy nhân quả từ quá khứ, thực tại đến xu hướng tương lai.",
    slots: [
      { position: 1, title: "Lá Số 1: Quá Khứ & Căn Nguyên", subtitle: "Nền tảng hoặc sự kiện dẫn tới hiện tại" },
      { position: 2, title: "Lá Số 2: Hiện Tại & Năng Lượng Chính", subtitle: "Bức tranh thực tế đang diễn ra quanh bạn" },
      { position: 3, title: "Lá Số 3: Tương Lai & Kết Quả Dự Báo", subtitle: "Hướng đi và kết quả nếu giữ năng lượng hiện tại" }
    ]
  },
  {
    id: "situation-obstacle-advice",
    name: "Tình Huống • Thử Thách • Lời Khuyên",
    desc: "Phù hợp nhất khi bạn đang đứng trước một quyết định hoặc bài toán khó.",
    slots: [
      { position: 1, title: "Lá Số 1: Tình Huống Cốt Lõi", subtitle: "Bản chất thực sự của vấn đề bạn đang hỏi" },
      { position: 2, title: "Lá Số 2: Thử Thách & Rào Cản", subtitle: "Điều đang cản trở hoặc bài học cần vượt qua" },
      { position: 3, title: "Lá Số 3: Lời Khuyên Từ Vũ Trụ", subtitle: "Hành động khôn ngoan nhất bạn nên thực hiện" }
    ]
  },
  {
    id: "mind-heart-action",
    name: "Tâm Trí • Trái Tim • Hành Động",
    desc: "Kết nối suy nghĩ lý trí, cảm xúc thật sâu kín và bước đi tiếp theo.",
    slots: [
      { position: 1, title: "Lá Số 1: Tiếng Nói Lý Trí (Mind)", subtitle: "Suy nghĩ, góc nhìn logic của bạn lúc này" },
      { position: 2, title: "Lá Số 2: Tiếng Gọi Trái Tim (Heart)", subtitle: "Cảm xúc thật và khao khát sâu thẳm bên trong" },
      { position: 3, title: "Lá Số 3: Hành Động Định Hướng (Action)", subtitle: "Cách dung hòa lý trí và cảm xúc để tiến bước" }
    ]
  },
  {
    id: "you-partner-relationship",
    name: "Bản Thân • Đối Phương • Mối Quan Hệ",
    desc: "Trải bài chuyên sâu cho Tình Yêu, Nhân Duyên hoặc Đối Tác quan trọng.",
    slots: [
      { position: 1, title: "Lá Số 1: Năng Lượng Của Bạn", subtitle: "Tâm thế và mong muốn của bạn trong mối quan hệ" },
      { position: 2, title: "Lá Số 2: Năng Lượng Đối Phương", subtitle: "Suy nghĩ, tình cảm và góc nhìn của người ấy" },
      { position: 3, title: "Lá Số 3: Tương Lai Mối Quan Hệ", subtitle: "Điểm giao thoa và định hướng phát triển của hai người" }
    ]
  }
];

// Reading Topic Presets (Chủ đề xem bài & gợi ý câu hỏi)
const READING_TOPICS = [
  {
    id: "love",
    label: "Tình Yêu & Nhân Duyên",
    icon: "fa-heart",
    recommendedSpread: "you-partner-relationship",
    sampleQuestions: [
      "Người ấy đang thực sự nghĩ gì về mối quan hệ của chúng tôi và tương lai hai đứa sẽ ra sao?",
      "Trong 3 tháng tới chuyện tình cảm của tôi có đón nhận nhân duyên mới hay bước ngoặt nào không?",
      "Tôi nên làm gì để hóa giải những hiểu lầm hiện tại và giúp tình yêu bền chặt hơn?"
    ]
  },
  {
    id: "career",
    label: "Sự Nghiệp & Công Danh",
    icon: "fa-briefcase",
    recommendedSpread: "situation-obstacle-advice",
    sampleQuestions: [
      "Công việc hiện tại của tôi có cơ hội thăng tiến không hay tôi nên tìm hướng đi mới?",
      "Dự án/kế hoạch tôi đang ấp ủ sẽ gặp thuận lợi và thử thách gì trong thời gian tới?",
      "Làm thế nào để tôi phát huy tối đa năng lực và đạt bước đột phá sự nghiệp năm nay?"
    ]
  },
  {
    id: "finance",
    label: "Tài Lộc & Đầu Tư",
    icon: "fa-coins",
    recommendedSpread: "past-present-future",
    sampleQuestions: [
      "Tình hình tài chính và dòng tiền của tôi trong 3-6 tháng tới sẽ biến chuyển như thế nào?",
      "Tôi cần lưu ý điều gì trước khi đưa ra quyết định đầu tư hoặc hợp tác kinh doanh sắp tới?",
      "Đâu là điểm nghẽn tài chính tôi cần tháo gỡ để thu hút sự thịnh vượng bền vững?"
    ]
  },
  {
    id: "study",
    label: "Học Tập & Thi Cử",
    icon: "fa-graduation-cap",
    recommendedSpread: "situation-obstacle-advice",
    sampleQuestions: [
      "Kỳ thi hoặc mục tiêu học tập sắp tới của tôi sẽ có kết quả ra sao và cần chuẩn bị thêm gì?",
      "Ngành học hoặc kỹ năng tôi đang theo đuổi có thực sự phù hợp với bản mệnh của tôi không?"
    ]
  },
  {
    id: "spiritual",
    label: "Thông Điệp Vũ Trụ & Bản Mệnh",
    icon: "fa-moon",
    recommendedSpread: "mind-heart-action",
    sampleQuestions: [
      "Vũ trụ đang muốn gửi gắm thông điệp và bài học tâm linh quan trọng nào đến tôi lúc này?",
      "Làm sao để tôi tìm lại sự cân bằng nội tâm và đánh thức nguồn năng lượng tích cực bên trong?"
    ]
  }
];

window.TarotData = {
  FULL_TAROT_DECK,
  EXTERNAL_TAROT_DECKS,
  EXTERNAL_CARD_BACKS,
  SPREAD_TYPES,
  READING_TOPICS,
  getCardImageUrls,
  getCardBackUrls
};
