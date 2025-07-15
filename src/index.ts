import { parseArabic } from "./parse-arabic";
declare global {
	interface Date {
		addDaysToDate(days: number): Date;
	}
}

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
 * @param {Date | string} date - The input date.
 * @returns {string} Adjusted ISO date string.
 */
export const convertToISODateTime = (date: Date | string): string => {
	const formattedDate = typeof date === "string" ? new Date(date) : date;
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
 * @param {Date | string | number} date - The Gregorian date input.
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
	date: Date | string | number,
	format?:
		| "day"
		| "weekday"
		| "month"
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
		/[-\/]/
	);
	const [year, month, day] = parts;
	const weekday = jalaliWeekdayNames[parsedDate.getDay()];
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
 * @param {number} year - Jalali year.
 * @param {number} month - Jalali month.
 * @param {number} day - Jalali day.
 * @param {number} time - Time in the format HH:mm.
 * @returns {string} Gregorian date string with time in the format YYYY-MM-DDTHH:mm.
 */
export const formatToGregorianDateTime = (
	year: number,
	month: number,
	day: number,
	time: string
): string => {
	const date = toGregorian(year, month, day);
	return `${date[0]}-${("0" + date[1]).slice(-2)}-${("0" + date[2]).slice(
		-2
	)}T${time}`;
};

/**
 * Converts a Gregorian date to a formatted Jalali date with padded month and day.
 * @param {Date | string} date - Gregorian date object.
 * @returns {string} Jalali date in the format YYYY-MM-DD with zero-padded month and day.
 */
export const formatToJalaliDatePadded = (date: Date | string): string => {
	const formattedDate = typeof date === "string" ? new Date(date) : date;
	const parts = parseArabic(formattedDate.toLocaleDateString(locale)).split(
		/[/-]/
	);
	let month = parts[1]?.length < 2 ? `0${parts[1]}` : parts[1];
	let day = parts[2]?.length < 2 ? `0${parts[2]}` : parts[2];

	return `${parts[0]}-${month}-${day}`;
};

/**
 * Formats a date string according to the specified format.
 * @param {string|Date} date - The input date string or Date object.
 * @param {string} format - The desired output format (e.g., 'jD jMMMM jYY', 'YYYY/MM/DD').
 * @returns {string|null} Formatted date string or null if date is invalid.
 */
export const formatToLocalizedDate = (
	date: string | Date,
	format: string
): string | null => {
	if (!date) return null;
	if (date instanceof Date) {
		date = date.toISOString();
	}

	if (format === "jYYYY-jM-jD") {
		return convertToJalaliDate(date);
	}
	if (format === "jYYYY-jMM-jDD") {
		return formatToJalaliDatePadded(date);
	}
	if (format === "jMMMM") {
		return convertToJalaliDate(date, "month");
	}
	if (format === "jD") {
		return convertToJalaliDate(date, "day");
	}
	if (format === "jDDD") {
		return convertToJalaliDate(date, "dayMonth");
	}
	if (format === "jDDD-jMM-jYY") {
		return convertToJalaliDate(date, "dayMonthYear");
	}
	if (typeof date === "string") {
		if (date.includes("/")) date = date.replace(/\//g, "-");
	}

	const spited: any = convertToISODateTime(date)?.split("T");
	const clockSpited = spited[1]?.split(":");

	if (format === "YYYY-MM-DD") {
		return spited[0];
	}
	if (format === "YYYY/MM/DD") return spited[0]?.replace(/-/g, "/");
	if (format === "YYYY/MM/DD HH:mm")
		return (
			spited[0]?.replace(/-/g, "/") +
			" " +
			clockSpited[0] +
			":" +
			clockSpited[1]
		);
	if (format === "HH:mm") return clockSpited[0] + ":" + clockSpited[1];
	if (format === "YYYY/MM/DDTHH:mm:ss")
		return (
			spited[0]?.replace(/-/g, "/") +
			"T" +
			clockSpited[0] +
			":" +
			clockSpited[1] +
			":" +
			clockSpited[2]?.split(".")[0]
		);
	return null;
};

/**
 * Extracts the Jalali (jalali) year from a Gregorian date string.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali year.
 */
export const getJalaliYear = (dateString: string): string => {
	const date = new Date(dateString);
	const parts = parseArabic(date.toLocaleDateString(locale)).split(/[-\/]/);
	return parts[0];
};

/**
 * Converts a date's year, month, and day to Jalali (jalali) date.
 * @param {number} year - Gregorian year.
 * @param {number} month - Gregorian month (0-indexed).
 * @param {number} day - Gregorian day.
 * @returns {string} Jalali date string.
 */
export const getJalaliDateDetails = (
	year: number,
	month: number,
	day: number
): string => {
	const date = new Date(year, month, day).toLocaleDateString(locale);
	return date;
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
 * Extracts the time (HH:mm) from a full date-time string in the format YYYY-MM-DDTHH:mm:ss.
 * @param {string} timeString - Full date-time string.
 * @returns {string} Extracted time in HH:mm format.
 */
export const getCurrentTime = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString?.split("T", 2);
		return parts[1]?.slice(0, 5);
	} else {
		return "";
	}
};

/**
 * Extracts time from a date string in the format YYYY-MM-DDTHH:mm:ss.
 * @param {string} timeString - Date string with time.
 * @returns {string} Time in the format HH:mm.
 */
export const getTimeFromDate = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString.split("T", 2);
		return parts[1]?.slice(0, 5);
	}
	return "";
};

/**
 * Splits a time string in the format HH:mm:ss and returns only the hours and minutes.
 * @param {string} timeString - Time string.
 * @returns {Object} Time in the format {hour: string, minute: string, second: string}.
 */
export const getTimeParts = (timeString: string): Object => {
	if (typeof timeString !== "undefined") {
		const parts = timeString.split(":", 2);
		return {
			hour: parts[0],
			minute: parts[1],
			second: parts[2],
		};
	}
	return {};
};

/**
 * Calculates the number of days between now and a given date.
 * @param {string | Date} inputDate - A Date object or a string parsable by `new Date()`.
 * @returns {number} Number of days until the date (can be negative if in the past).
 */
export const getDaysFromNow = (inputDate: string | Date): number => {
	const targetDate =
		typeof inputDate === "string" ? new Date(inputDate) : inputDate;

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
 * @param {Date | string} date - The input date, either a Date object or a string parsable by `new Date()`.
 * @param {string} [suffix='پیش'] - Optional string to append, like 'پیش', 'قبل', or custom. Defaults to 'پیش'.
 * @returns {string} A Persian relative time string such as "۵ دقیقه پیش"
 */
export const getTimeAgo = (date: Date | string, suffix: string = 'پیش'): string => {
	const d = typeof date === "string" ? new Date(date) : date;
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
	for (gm = 0; gm < 13; gm++) {
		if (gd <= sal_a[gm]) break;
		gd -= sal_a[gm];
	}
	return [gy, gm, gd];
};
