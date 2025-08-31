import { parseArabic } from "./parse-arabic";
declare global {
	interface Date {
		addDaysToDate(days: number): Date;
	}
}

type DateInput = Date | string | number;

type ISupportedDateFormats =
	| "jYYYY-jM-jD"
	| "jYYYY-jMM-jDD"
	| "jMMMM"
	| "jD"
	| "jDDD"
	| "jDDD-jMM-jYY"
	| "YYYY-MM-DD"
	| "YYYY/MM/DD"
	| "YYYY/MM/DD HH:mm"
	| "HH:mm"
	| "YYYY/MM/DDTHH:mm:ss";

// Extending Date prototype
const DT: any = Date.prototype;

/**
 * Locale setting for Persian (Iran) format.
 * @constant {string} locale - Locale code for Persian (Iran).
 */
const locale = "fa-IR";

/**
 * Converts date to ISO format in local time.
 * @param {Date} date - The input date.
 * @returns {string} Local ISO date string.
 */
export const convertToStandardDateTime = (date: Date): string => {
	const tzoffset = date?.getTimezoneOffset() * 60000; // Offset in milliseconds
	const localISOTime = new Date(date.getTime() - tzoffset)
		?.toISOString()
		?.slice(0, -1);
	return localISOTime;
};

/**
 * Converts date to ISO format with a timezone offset adjustment.
 * @param {DateInput} date - The input date.
 * @returns {string} Adjusted ISO date string.
 */
export const convertToISODateTime = (date: DateInput): string => {
	const formattedDate =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;
	const tzoffset = (formattedDate.getTimezoneOffset() - 60) * 60000;
	const localISOTime = new Date(formattedDate.getTime() - tzoffset)
		.toISOString()
		.slice(0, -1);
	return localISOTime;
};

/**
 * Converts Jalali date string to Gregorian Date object.
 * @param {string} jalaliDate - Jalali date string in the format YYYY/MM/DD or YYYY-MM-DD.
 * @returns {Date} Gregorian Date object.
 */
export const convertToGregorianDate = (jalaliDate: string): Date => {
	const [year, month, day] = jalaliDate.split(/[/-]/).map(Number);
	const [gYear, gMonth, gDay] = toGregorian(year, month, day);
	return new Date(gYear, gMonth - 1, gDay); // JS months are 0-indexed
};

/**
 * Converts Jalali date string to Gregorian date string in the format YYYY/MM/DD.
 * @param {string} jalaliDate - Jalali date string in the format YYYY/MM/DD or YYYY-MM-DD.
 * @returns {string} Gregorian date string in the format YYYY/MM/DD.
 */
export const convertToGregorianDateString = (jalaliDate: string): string => {
	const [year, month, day] = jalaliDate.split(/[/-]/).map(Number);
	const [gYear, gMonth, gDay] = toGregorian(year, month, day);
	return `${gYear}/${gMonth.toString().padStart(2, "0")}/${gDay
		.toString()
		.padStart(2, "0")}`;
};

/**
 * Converts a Gregorian date to a Jalali date in a specified format.
 *
 * @param {DateInput} date - The Gregorian date input.
 * @param { "day" | "weekday" | "month" | "dayMonth" | "dayMonthYear" | "weekdayDayMonth" | "weekdayDayMonthYear" } [format] -
 *   Optional format for the output:
 *   - If omitted, returns "YYYY-MM-DD"
 *   - "day": Returns day (e.g. "26")
 *   - "weekday": Returns weekday (e.g. "جمعه")
 *   - "month": Returns month (e.g. "مهر")
 *   - "dayMonth": Returns day and month (e.g. "26 مهر")
 *   - "dayMonthYear": Returns full date (e.g. "26 مهر 1403")
 *   - "weekdayDayMonth": Returns weekday + day + month (e.g. "جمعه 26 مهر")
 *   - "weekdayDayMonthYear": Full format (e.g. "جمعه 26 مهر 1403")
 *
 * @returns {string} Jalali date in desired format or "YYYY-MM-DD" by default.
 *
 * @example
 * convertToJalaliDate("2024-10-18"); // → "1403-07-27"
 * convertToJalaliDate("2024-10-18", "dayMonthYear"); // → "27 مهر 1403"
 * convertToJalaliDate(new Date(), "weekday"); // → "دوشنبه"
 */
export const convertToJalaliDate = (
	date: DateInput,
	format?:
		| "day"
		| "weekday"
		| "month"
		| "year"
		| "dayMonth"
		| "dayMonthYear"
		| "weekdayDayMonth"
		| "weekdayDayMonthYear"
): string => {
	const parsedDate =
		typeof date === "number" || typeof date === "string"
			? new Date(date)
			: date;

	const parts: any = parseArabic(parsedDate.toLocaleDateString("fa-IR")).split(
		/[-/]/
	);
	const [year, month, day] = parts;
	const weekday = jalaliWeekdayNamesGregorianFormat[parsedDate.getDay()];
	const persianMonth = jalaliMonthNames[month - 1];

	// Default fallback: YYYY-MM-DD
	if (!format) {
		return `${year}-${month}-${day}`;
	}

	switch (format) {
		case "day":
			return `${day}`;
		case "weekday":
			return `${weekday}`;
		case "month":
			return `${persianMonth}`;
		case "year":
			return `${year}`;
		case "dayMonth":
			return `${day} ${persianMonth}`;
		case "dayMonthYear":
			return `${day} ${persianMonth} ${year}`;
		case "weekdayDayMonth":
			return `${weekday} ${day} ${persianMonth}`;
		case "weekdayDayMonthYear":
			return `${weekday} ${day} ${persianMonth} ${year}`;
		default:
			return `${year}-${month}-${day}`;
	}
};

/**
 * Converts a given timestamp or Date object to a Gregorian date string in the format YYYY-MM-DD.
 * @param {number | Date} date - Unix timestamp or Date object.
 * @returns {string} Gregorian date string in the format YYYY-MM-DD.
 */
export const formatToGregorianDate = (date: number | Date): string => {
	const formattedDate = typeof date === "number" ? new Date(date) : date;
	const year = formattedDate.getFullYear();
	const month = formattedDate.getMonth() + 1;
	const day = formattedDate.getDate();
	return `${year}-${month.toString()}-${day.toString()}`;
};

/**
 * Converts Jalali date and time to Gregorian date string with time.
 * @param {number | Date} date - Unix timestamp or Date object.
 * @returns {string} Gregorian date string with time in the format YYYY-MM-DDTHH:mm.
 */
export const formatToGregorianDateTime = (
	date: number | Date,
	time: string
): string => {
	const formattedDate = formatToGregorianDate(date);
	return `${formattedDate}T${time}`;
};

/**
 * Converts a Gregorian date to a formatted Jalali date with padded month and day.
 * @param {DateInput} date - Gregorian date object.
 * @returns {string} Jalali date in the format YYYY-MM-DD with zero-padded month and day.
 */
export const formatToJalaliDatePadded = (date: DateInput): string => {
	const formattedDate =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;
	const parts = parseArabic(formattedDate.toLocaleDateString(locale)).split(
		/[/-]/
	);
	let month = parts[1]?.length < 2 ? `0${parts[1]}` : parts[1];
	let day = parts[2]?.length < 2 ? `0${parts[2]}` : parts[2];

	return `${parts[0]}-${month}-${day}`;
};

/**
 * Formats a date string according to the specified format.
 * @param {string | Date} date - The input date string or Date object.
 * @param {SupportedDateFormats} format - The desired output format.
 * @returns {string | null} Formatted date string or null if invalid.
 */
export const formatToLocalizedDate = (
	date: DateInput,
	format: ISupportedDateFormats
): string | null => {
	if (!date) return null;

	if (date instanceof Date) {
		date = date.toISOString();
	}

	const jalaliFormats: Record<string, () => string | null> = {
		"jYYYY-jMM-jDD": () => formatToJalaliDatePadded(date),
		"jYYYY-jM-jD": () => convertToJalaliDate(date),
		jMMMM: () => convertToJalaliDate(date, "month"),
		jD: () => convertToJalaliDate(date, "day"),
		jDDD: () => convertToJalaliDate(date, "dayMonth"),
		"jDDD-jMM-jYY": () => convertToJalaliDate(date, "dayMonthYear"),
	};

	if (jalaliFormats[format]) {
		return jalaliFormats[format]();
	}

	if (typeof date === "string" && date.includes("/")) {
		date = date.replace(/\//g, "-");
	}

	const [isoDate, isoTime] = convertToISODateTime(date)?.split("T") || [];
	const [hours, minutes, seconds] = isoTime?.split(":") || [];

	const gregorianFormats: Record<string, () => string | null> = {
		"YYYY-MM-DD": () => isoDate,
		"YYYY/MM/DD": () => isoDate?.replace(/-/g, "/"),
		"YYYY/MM/DD HH:mm": () =>
			`${isoDate?.replace(/-/g, "/")} ${hours}:${minutes}`,
		"HH:mm": () => `${hours}:${minutes}`,
		"YYYY/MM/DDTHH:mm:ss": () =>
			`${isoDate?.replace(/-/g, "/")}T${hours}:${minutes}:${
				seconds?.split(".")[0]
			}`,
	};

	return gregorianFormats[format]?.() ?? null;
};

/**
 * Gets today's date in ISO format (YYYY-MM-DD).
 * @returns {string} Today's date in "YYYY-MM-DD" format.
 */
export const getToday = (): string => {
	const date = new Date().toISOString();
	const splitDate = date.split("T")[0];
	return splitDate;
};

/**
 * Extracts time from a date string or Date object in the format HH:mm.
 * @param {string | number | Date} date - Date as string (YYYY-MM-DDTHH:mm:ss) or Date object.
 * @returns {string} Time in the format HH:mm.
 */
export const getTimeFromDate = (
	date: string | number | Date = new Date()
): string => {
	const dateObj =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;

	if (!isNaN(dateObj.getTime())) {
		// Check if date is valid
		const hours = String(dateObj.getHours()).padStart(2, "0");
		const minutes = String(dateObj.getMinutes()).padStart(2, "0");
		const seconds = String(dateObj.getSeconds()).padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}

	return "";
};

/**
 * Calculates the number of days between now and a given date.
 * @param {string | Date | number} inputDate - A Date object or a string parsable by `new Date() or timeStamp`.
 * @returns {number} Number of days until the date (can be negative if in the past).
 */
export const getDaysFromNow = (inputDate: string | Date): number => {
	const targetDate =
		typeof inputDate === "string" || typeof inputDate === "number"
			? new Date(inputDate)
			: inputDate;

	if (isNaN(targetDate.getTime())) {
		throw new Error("Invalid date format. Use ISO format or Date object.");
	}

	const now = new Date();
	const msDiff = targetDate.getTime() - now.getTime();
	const daysDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

	return daysDiff;
};

/**
 * Get Jalali (Persian) date string to a Unix timestamp in milliseconds.
 * @param {string} jalaliDate - Jalali date in the format "YYYY-MM-DD"
 * @returns {number} Unix timestamp (milliseconds since 1970-01-01)
 */
export const getJalaliTimeStamp = (jalaliDate: string): number => {
	const gregorianDate = convertToGregorianDate(jalaliDate); // "2025-03-20"
	const timestamp = new Date(gregorianDate).getTime(); //timestamp in milliseconds
	return timestamp;
};

/**
 * Returns a string indicating how long ago the given date was,
 * in Persian language format.
 *
 * @param {DateInput} date - The input date, either a Date object or a string parsable by `new Date()`.
 * @param {string} [suffix='پیش'] - Optional string to append, like 'پیش', 'قبل', or custom. Defaults to 'پیش'.
 * @returns {string} A Persian relative time string such as "۵ دقیقه پیش"
 */
export const getTimeAgo = (date: DateInput, suffix: string = "پیش"): string => {
	const d =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();

	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHr = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHr / 24);
	const diffMonth = Math.floor(diffDay / 30);
	const diffYear = Math.floor(diffDay / 365);

	if (diffSec < 60) return `لحظاتی ${suffix}`;
	if (diffMin < 60) return `${diffMin} دقیقه ${suffix}`;
	if (diffHr < 24) return `${diffHr} ساعت ${suffix}`;
	if (diffDay < 30) return `${diffDay} روز ${suffix}`;
	if (diffMonth < 12) return `${diffMonth} ماه ${suffix}`;
	return `${diffYear} سال ${suffix}`;
};

/**
 * Adds days to the Date object.
 * @param {number} days - Number of days to add.
 * @returns {Date} Updated date with added days.
 */
DT.addDaysToDate = function (days: number): Date {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

/**
 * Adds a specific number of days to the given date.
 * @param {Date} date - Input date.
 * @param {number} daysCount - Number of days to add.
 * @returns {Date} Updated date.
 */
export const addDaysToDate = (date: Date, daysCount: number): Date => {
	return date.addDaysToDate(daysCount);
};

/**
 * Compares two date strings and checks if the first date is before the second.
 * @param {string} first - First date string.
 * @param {string} second - Second date string.
 * @returns {boolean} True if first date is before second date.
 */
export const isBeforeDate = (first: string, second: string): boolean => {
	const firstTime = new Date(first).getTime();
	const secondTime = new Date(second).getTime();
	return firstTime < secondTime;
};

/**
 * Check if the given Jalali year is a leap year.
 * @param {number} jalaliYear - Jalali year.
 * @returns {boolean} True if the Jalali year is a leap year.
 */
export const isLeapYearJalali = (jalaliYear: number): boolean => {
	const [gy] = toGregorian(jalaliYear, 1, 1);
	return (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
};

// Define arrays for Jalali months and days
export const jalaliMonthNames: string[] = [
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

export const jalaliWeekdayNames: string[] = [
	"شنبه",
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه",
];

const jalaliWeekdayNamesGregorianFormat: string[] = [
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه",
	"شنبه",
];

/**
 * Converts Jalali date to Gregorian date.
 * @param {number} jy - Jalali year.
 * @param {number} jm - Jalali month.
 * @param {number} jd - Jalali day.
 * @returns {[number, number, number]} Gregorian year, month, and day.
 */
const toGregorian = (
	jy: number,
	jm: number,
	jd: number
): [number, number, number] => {
	let gy = jy <= 979 ? 621 : 1600;
	jy -= jy <= 979 ? 0 : 979;

	let days =
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

	let gd = days + 1;
	const sal_a = [
		0,
		31,
		(gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
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
	let gm = 0;
	for (; gm < 13; gm++) {
		if (gd <= sal_a[gm]) break;
		gd -= sal_a[gm];
	}
	return [gy, gm, gd];
};
