import { parseArabic } from "./parse-arabic";

const DT: any = Date.prototype;
export const toStandard = (date: any) => {
  var tzoffset = (date?.getTimezoneOffset() - 60) * 60000;
  var localISOTime = new Date(date - tzoffset)?.toISOString()?.slice(0, -1);

  return localISOTime;
};
DT.addDays = function (days: number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export const add = (date: { addDays: (arg0: any) => any }, days: any) => {
  return date.addDays(days);
};
export const toMiladi = (year: any, month: any, day: any) => {
  const date = jalaliToGregorian(year, month, day);
  return new Date(date[0], date[1], date[2]);
};
export const dateStringtoFullMiladi = (year: any, month: any, day: any) => {
  const date = jalaliToGregorian(year, month, day);
  return `${date[0]}/${date[1]}/${date[2]}`;
};
export const dateStringtoFullMiladiWithTime = (
  year: number,
  month: number,
  day: number,
  time: number
) => {
  const date = jalaliToGregorian(year, month, day);
  return `${date[0]}-${("0" + date[1]).slice(-2)}-${("0" + date[2]).slice(
    -2
  )}T${time}`;
};
export const shamsiYear = (dateString: string) => {
  const date = new Date(dateString);
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return parts[0];
};
export const toShamsiDate = (dateString: string) => {
  const date = new Date(dateString);
  return parseArabic(date.toLocaleDateString("fa-IR"));
};
export const splitTime = (timeString: string) => {
  if (typeof timeString !== "undefined") {
    const parts = timeString?.split(":", 2);
    return `${parts[0]}:${parts[1]}`;
  } else {
    return "";
  }
};

export const isBefore = (first: string, second: string) => {
  const firstTime = new Date(first).getTime();
  const secondTime = new Date(second).getTime();
  return firstTime < secondTime;
};
export const getFullTime = (timeString: string) => {
  if (typeof timeString !== "undefined") {
    const parts = timeString?.split("T", 2);
    return parts[1]?.slice(0, 5);
  } else {
    return "";
  }
};
export const dateStringtoFullShamsiwithPersianMonth = (dateString: string) => {
  const date = new Date(dateString);
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${parts[2]} ${shamsiMonths[parts[1] - 1]} ${parts[0]}`;
};
export const datetoShamsiDay = (dateString: string) => {
  const date = new Date(dateString);
  return `${shamsiDays[date.getDay()]}`;
};
export const datetoShamsiDayNumber = (date: Date) => {
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${parts[2]}`;
};
export const datetoShamsiMonth = (date: Date) => {
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${shamsiMonths[parts[1] - 1]}`;
};
export const datetoShamsiDate = (date: Date) => {
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
};
export const datetoShamsiDateWithFormat = (date: Date) => {
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  var month = "";
  var day = "";
  if (parts[1]?.length < 2) month = `0${parts[1]}`;
  else month = `${parts[1]}`;
  if (parts[2]?.length < 2) day = `0${parts[2]}`;
  else day = `${parts[2]}`;
  return `${parts[0]}-${month}-${day}`;
};

export const dateStringtoShamsiwithPersianMonthandDay = (
  dateString: string | number | Date
) => {
  const date = new Date(dateString);
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${parts[2]} ${shamsiMonths[parts[1] - 1]}`;
};
export const dateStringtoShamsiwithPersianMonthandPersianDay = (
  dateString: string | number | Date
) => {
  const date = new Date(dateString);
  const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
  return `${shamsiDays[date.getDay()]} ${parts[2]} ${
    shamsiMonths[parts[1] - 1]
  }`;
};
export const toShamsibyDetails = (
  year: number,
  month: number,
  day: number | undefined
) => {
  const date = new Date(year, month, day).toLocaleDateString("fa-IR");
  return date;
};
export const toShamsiMonthIndex = (monthString: string | number) => {
  const monthofyear = {
    فروردین: 1,
    اردیبهشت: 2,
    خرداد: 3,
    تیر: 4,
    مرداد: 5,
    شهریور: 6,
    مهر: 7,
    آبان: 8,
    آذر: 9,
    دی: 10,
    بهمن: 11,
    اسفند: 12,
  };
  return monthofyear[monthString];
};

export const formatDateString = (date: string, format: string) => {
  if (!date) return null;
  if (format === "jD jMMMM jYY")
    return dateStringtoFullShamsiwithPersianMonth(date);
  if (format === "jYYYY-jM-jD") {
    return datetoShamsiDate(date);
  }
  if (format === "jYYYY-jMM-jDD") {
    return datetoShamsiDateWithFormat(date);
  }
  if (format === "jMMMM") {
    return datetoShamsiMonth(date);
  }
  if (format === "jD") {
    return datetoShamsiDayNumber(date);
  }
  if (typeof date === "string") {
    if (date.includes("/")) date = date.replaceAll("/", "-");
    date = new Date(date);
  }
  const splited = toStandard(date)?.split("T");
  const clockSplited = splited[1]?.split(":");
  if (format === "YYYY-MM-DD") {
    return splited[0];
  }
  if (format === "YYYY/MM/DD") return splited[0]?.replaceAll("-", "/");
  if (format === "YYYY/MM/DD HH:mm")
    return (
      splited[0]?.replaceAll("-", "/") +
      " " +
      clockSplited[0] +
      ":" +
      clockSplited[1]
    );
  if (format === "HH:mm") return clockSplited[0] + ":" + clockSplited[1];
  if (format === "YYYY/MM/DDTHH:mm:ss")
    return (
      splited[0]?.replaceAll("-", "/") +
      "T" +
      clockSplited[0] +
      ":" +
      clockSplited[1] +
      ":" +
      clockSplited[2]?.split(".")[0]
    );
  return null;
};
export const shamsiMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const shamsiDays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  var gy: any = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  var days: any =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  gy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;
  var gd: any = days + 1;
  var sal_a = [
    0,
    31,
    (gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  var gm: any;
  for (gm = 0; gm < 13; gm++) {
    var v = sal_a[gm];
    if (gd <= v) break;
    gd -= v;
  }
  return [gy, gm, gd];
};
export const persianCharacter = [
  "آ",
  "ا",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ک",
  "گ",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ی",
];
