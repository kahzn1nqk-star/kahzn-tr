/**
 * TAROT MYSTIC - Astrology, Numerology & Birth Profile Calculator
 * Analyzes Name, Age, and Date of Birth (Ngày tháng năm sinh)
 * to enrich both the UI and the AI Tarot Reading prompt.
 */

const ZODIAC_SIGNS = [
  { name: "Ma Kết (Capricorn)", symbol: "♑", element: "Đất (Earth)", ruler: "Sao Thổ", start: [12, 22], end: [1, 19] },
  { name: "Bảo Bình (Aquarius)", symbol: "♒", element: "Khí (Air)", ruler: "Sao Thiên Vương", start: [1, 20], end: [2, 18] },
  { name: "Song Ngư (Pisces)", symbol: "♓", element: "Nước (Water)", ruler: "Sao Hải Vương", start: [2, 19], end: [3, 20] },
  { name: "Bạch Dương (Aries)", symbol: "♈", element: "Lửa (Fire)", ruler: "Sao Hỏa", start: [3, 21], end: [4, 19] },
  { name: "Kim Ngưu (Taurus)", symbol: "♉", element: "Đất (Earth)", ruler: "Sao Kim", start: [4, 20], end: [5, 20] },
  { name: "Song Tử (Gemini)", symbol: "♊", element: "Khí (Air)", ruler: "Sao Thủy", start: [5, 21], end: [6, 21] },
  { name: "Cự Giải (Cancer)", symbol: "♋", element: "Nước (Water)", ruler: "Mặt Trăng", start: [6, 22], end: [7, 22] },
  { name: "Sư Tử (Leo)", symbol: "♌", element: "Lửa (Fire)", ruler: "Mặt Trời", start: [7, 23], end: [8, 22] },
  { name: "Xử Nữ (Virgo)", symbol: "♍", element: "Đất (Earth)", ruler: "Sao Thủy", start: [8, 23], end: [9, 22] },
  { name: "Thiên Bình (Libra)", symbol: "♎", element: "Khí (Air)", ruler: "Sao Kim", start: [9, 23], end: [10, 23] },
  { name: "Bọ Cạp (Scorpio)", symbol: "♏", element: "Nước (Water)", ruler: "Sao Diêm Vương", start: [10, 24], end: [11, 21] },
  { name: "Nhân Mã (Sagittarius)", symbol: "♐", element: "Lửa (Fire)", ruler: "Sao Mộc", start: [11, 22], end: [12, 21] }
];

const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

const LIFE_PATH_DESC = {
  1: "Số 1 • Người Tiên Phong Độc Lập & Bản Lĩnh Lãnh Đạo",
  2: "Số 2 • Người Hòa Giải Tinh Tế, Giàu Trực Giác & Thấu Cảm",
  3: "Số 3 • Người Truyền Cảm Hứng Sáng Tạo & Giao Tiếp Xuất Sắc",
  4: "Số 4 • Người Kiến Tạo Thực Tế, Kỷ Luật & Vững Chãi",
  5: "Số 5 • Tâm Hồn Tự Do, Đam Mê Khám Phá & Đổi Mới",
  6: "Số 6 • Người Chữa Lành Giàu Tình Yêu Thương & Trách Nhiệm",
  7: "Số 7 • Nhà Triết Học Nội Tâm, Thông Thái & Tâm Linh Sâu Sắc",
  8: "Số 8 • Bản Lĩnh Điều Hành, Thịnh Vượng & Thành Tựu Lớn",
  9: "Số 9 • Lý Tưởng Nhân Văn Cao Đẹp & Tâm Hồn Bao Dung",
  11: "Số 11/2 • Con Số Bậc Thầy Trực Giác & Khai Sáng Tâm Linh (Master 11)",
  22: "Số 22/4 • Kiến Trúc Sư Đại Tài Biến Ước Mơ Lớn Thành Hiện Thực (Master 22)",
  33: "Số 33/6 • Bậc Thầy Chữa Lành & Tình Yêu Vô Điều Kiện (Master 33)"
};

const BIRTH_TAROT_MAP = {
  1: "I - The Magician (Nhà Ảo Thuật)",
  2: "II - The High Priestess (Nữ Tư Tế)",
  3: "III - The Empress (Nữ Hoàng)",
  4: "IV - The Emperor (Hoàng Đế)",
  5: "V - The Hierophant (Giáo Hoàng)",
  6: "VI - The Lovers (Tình Nhân)",
  7: "VII - The Chariot (Cỗ Xe Chiến Thắng)",
  8: "VIII - Strength (Sức Mạnh Nội Tâm)",
  9: "IX - The Hermit (Ẩn Sĩ)",
  11: "XI - Justice & II - The High Priestess",
  22: "0 - The Fool & IV - The Emperor",
  33: "VI - The Lovers & III - The Empress"
};

function stripVietnameseTones(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
}

function reduceDigits(num, allowMaster = true) {
  let n = Number(num);
  while (n > 9) {
    if (allowMaster && (n === 11 || n === 22 || n === 33)) break;
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

function getWesternZodiac(day, month) {
  for (const z of ZODIAC_SIGNS) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return z;
    }
  }
  return ZODIAC_SIGNS[0];
}

function getEasternElement(year) {
  const canIndex = Math.floor(((year - 4) % 10 + 10) % 10 / 2);
  const chiIndex = Math.floor(((year - 4) % 12 + 12) % 12 / 2) % 3;
  // Simplified 60-year Jiazi NaYin five-element formula
  const canVal = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][((year - 4) % 10 + 10) % 10];
  const chiVal = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][((year - 4) % 12 + 12) % 12];
  let sum = canVal + chiVal;
  if (sum > 5) sum -= 5;
  const elements = {
    1: "Mệnh Kim (Vàng/Kim Loại)",
    2: "Mệnh Thủy (Nước)",
    3: "Mệnh Hỏa (Lửa)",
    4: "Mệnh Thổ (Đất)",
    5: "Mệnh Mộc (Cây Cối)"
  };
  const canChiName = `${CAN[year % 10]} ${CHI[year % 12]}`;
  return {
    canChi: canChiName,
    element: elements[sum] || "Mệnh Thổ"
  };
}

function calculateNameNumber(fullName = "") {
  const clean = stripVietnameseTones(fullName).replace(/[^A-Z]/g, "");
  if (!clean) return 7;
  let total = 0;
  for (let i = 0; i < clean.length; i++) {
    const val = ((clean.charCodeAt(i) - 65) % 9) + 1;
    total += val;
  }
  return reduceDigits(total, false);
}

function analyzeUserProfile({ fullName = "", dob = "", ageInput = "" }) {
  const nowYear = new Date().getFullYear();
  let day = 15, month = 6, year = 2000;
  let hasValidDob = false;

  if (dob && /^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    const parts = dob.split("-").map(Number);
    year = parts[0];
    month = parts[1];
    day = parts[2];
    hasValidDob = true;
  } else if (ageInput && Number(ageInput) > 0) {
    year = nowYear - Number(ageInput);
  }

  const calculatedAge = ageInput && Number(ageInput) > 0
    ? Number(ageInput)
    : Math.max(1, nowYear - year);

  const zodiac = getWesternZodiac(day, month);
  const eastern = getEasternElement(year);

  // Life path number
  const dReduced = reduceDigits(day, false);
  const mReduced = reduceDigits(month, false);
  const yReduced = reduceDigits(
    String(year).split("").reduce((a, b) => a + Number(b), 0),
    false
  );
  const lifePath = reduceDigits(dReduced + mReduced + yReduced, true);
  const baseLifePath = reduceDigits(lifePath, false);

  // Personal Year Number for current year
  const personalYear = reduceDigits(
    dReduced + mReduced + reduceDigits(nowYear, false),
    false
  );

  const destinyNumber = calculateNameNumber(fullName);

  const formattedDob = hasValidDob
    ? `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`
    : `Năm sinh ~${year}`;

  return {
    fullName: fullName.trim() || "Khách Hữu Duyên",
    age: calculatedAge,
    dobRaw: dob,
    dobFormatted: formattedDob,
    day,
    month,
    year,
    zodiac,
    canChi: eastern.canChi,
    easternElement: eastern.element,
    lifePath,
    lifePathLabel: LIFE_PATH_DESC[lifePath] || LIFE_PATH_DESC[baseLifePath],
    birthTarot: BIRTH_TAROT_MAP[lifePath] || BIRTH_TAROT_MAP[baseLifePath],
    destinyNumber,
    personalYear
  };
}

window.AstrologyEngine = {
  analyzeUserProfile
};
