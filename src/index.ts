// Helper imports
import { parseArabic } from "./parse-arabic";
declare global {
	interface Date {
		addDays(days: number): Date;
	}
}

// Extending Date prototype
const DT: any = Date.prototype;

/**
 * Converts date to ISO format in local time.
 * @param {Date} date - The input date.
 * @returns {string} Local ISO date string.
 */
export const toStandardNewClock = (date: Date): string => {
	const tzoffset = date?.getTimezoneOffset() * 60000; // Offset in milliseconds
	const localISOTime = new Date(date.getTime() - tzoffset)
		?.toISOString()
		?.slice(0, -1);
	return localISOTime;
};

/**
 * Converts date to ISO format with a timezone offset adjustment.
 * @param {Date} date - The input date.
 * @returns {string} Adjusted ISO date string.
 */
export const toStandard = (date: Date): string => {
	const tzoffset = (date?.getTimezoneOffset() - 60) * 60000; // Adjusted offset
	const localISOTime = new Date(date.getTime() - tzoffset)
		?.toISOString()
		?.slice(0, -1);
	return localISOTime;
};

/**
 * Adds days to the Date object.
 * @param {number} days - Number of days to add.
 * @returns {Date} Updated date with added days.
 */
DT.addDays = function (days: number): Date {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

/**
 * Adds a specific number of days to the given date.
 * @param {Date} date - Input date.
 * @param {number} days - Number of days to add.
 * @returns {Date} Updated date.
 */
export const addDaysToDate = (date: Date, days: number): Date => {
	return date.addDays(days);
};

/**
 * Converts Jalali (Shamsi) date to Gregorian date.
 * @param {number} year - Jalali year.
 * @param {number} month - Jalali month.
 * @param {number} day - Jalali day.
 * @returns {Date} Gregorian date.
 */
export const toGregorianDate = (
	year: number,
	month: number,
	day: number
): Date => {
	const date = jalaliToGregorian(year, month, day);
	return new Date(date[0], date[1] - 1, date[2]); // month is 0-indexed in JavaScript
};

/**
 * Converts Jalali date to Gregorian date string in the format YYYY/MM/DD.
 * @param {number} year - Jalali year.
 * @param {number} month - Jalali month.
 * @param {number} day - Jalali day.
 * @returns {string} Gregorian date string.
 */
export const jalaliToFullGregorianDateString = (
	year: number,
	month: number,
	day: number
): string => {
	const date = jalaliToGregorian(year, month, day);
	return `${date[0]}/${date[1]}/${date[2]}`;
};

/**
 * Converts Jalali date and time to Gregorian date string with time.
 * @param {number} year - Jalali year.
 * @param {number} month - Jalali month.
 * @param {number} day - Jalali day.
 * @param {number} time - Time in the format HH:mm.
 * @returns {string} Gregorian date string with time in the format YYYY-MM-DDTHH:mm.
 */
export const jalaliToFullGregorianDateTime = (
	year: number,
	month: number,
	day: number,
	time: string
): string => {
	const date = jalaliToGregorian(year, month, day);
	return `${date[0]}-${("0" + date[1]).slice(-2)}-${("0" + date[2]).slice(
		-2
	)}T${time}`;
};

/**
 * Extracts the Jalali (Shamsi) year from a Gregorian date string.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali year.
 */
export const getShamsiYear = (dateString: string): string => {
	const date = new Date(dateString);
	const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return parts[0];
};

/**
 * Converts Gregorian date string to Jalali (Shamsi) date.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date string.
 */
export const toShamsiDate = (dateString: string): string => {
	const date = new Date(dateString);
	return parseArabic(date.toLocaleDateString("fa-IR"));
};

/**
 * Splits a time string in the format HH:mm:ss and returns only the hours and minutes.
 * @param {string} timeString - Time string.
 * @returns {string} Time in the format HH:mm.
 */
export const splitTime = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString.split(":", 2);
		return `${parts[0]}:${parts[1]}`;
	}
	return "";
};

/**
 * Compares two date strings and checks if the first date is before the second.
 * @param {string} first - First date string.
 * @param {string} second - Second date string.
 * @returns {boolean} True if first date is before second date.
 */
export const isBefore = (first: string, second: string): boolean => {
	const firstTime = new Date(first).getTime();
	const secondTime = new Date(second).getTime();
	return firstTime < secondTime;
};

/**
 * Extracts time from a date string in the format YYYY-MM-DDTHH:mm:ss.
 * @param {string} timeString - Date string with time.
 * @returns {string} Time in the format HH:mm.
 */
export const extractTimeFromDateTime = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString.split("T", 2);
		return parts[1]?.slice(0, 5);
	}
	return "";
};

// Define arrays for Jalali months and days
export const shamsiMonths: string[] = [
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
export const shamsiDays: string[] = [
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
const jalaliToGregorian = (
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

