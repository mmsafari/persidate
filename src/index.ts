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
const toStandardNewClock = (date: Date): string => {
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
const toStandard = (date: Date): string => {
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
const addDays = (date: Date, days: number): Date => {
	return date.addDays(days);
};

/**
 * Converts Jalali (jalali) date to Gregorian date.
 * @param {number} year - Jalali year.
 * @param {number} month - Jalali month.
 * @param {number} day - Jalali day.
 * @returns {Date} Gregorian date.
 */
const toGregorianDate = (year: number, month: number, day: number): Date => {
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
const jalaliToFullGregorianDateString = (
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
const jalaliToFullGregorianDateTime = (
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
 * Extracts the Jalali (jalali) year from a Gregorian date string.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali year.
 */
const getJalaliYear = (dateString: string): string => {
	const date = new Date(dateString);
	const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return parts[0];
};

/**
 * Converts Gregorian date string to Jalali (jalali) date.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date string.
 */
const toJalaliFullDate = (dateString: string): string => {
	const date = new Date(dateString);
	return parseArabic(date.toLocaleDateString("fa-IR"));
};

/**
 * Splits a time string in the format HH:mm:ss and returns only the hours and minutes.
 * @param {string} timeString - Time string.
 * @returns {string} Time in the format HH:mm.
 */
const splitTime = (timeString: string): string => {
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
const isBefore = (first: string, second: string): boolean => {
	const firstTime = new Date(first).getTime();
	const secondTime = new Date(second).getTime();
	return firstTime < secondTime;
};

/**
 * Extracts time from a date string in the format YYYY-MM-DDTHH:mm:ss.
 * @param {string} timeString - Date string with time.
 * @returns {string} Time in the format HH:mm.
 */
const extractTimeFromDateTime = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString.split("T", 2);
		return parts[1]?.slice(0, 5);
	}
	return "";
};

// Define arrays for Jalali months and days
const jalaliMonths: string[] = [
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
const jalaliDays: string[] = [
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

const todaysDate = () => {
	const date = new Date().toISOString();
	const splitDate = date.split("T")[0];
	return splitDate;
};

/**
 * Formats a date string according to the specified format.
 * @param {string|Date} date - The input date string or Date object.
 * @param {string} format - The desired output format (e.g., 'jD jMMMM jYY', 'YYYY/MM/DD').
 * @returns {string|null} Formatted date string or null if date is invalid.
 */
const formatDateString = (
	date: string | Date,
	format: string
): string | null => {
	if (!date) return null;
	if (format === "jD jMMMM jYY") return toFullJalaliWithPersianMonth(date);
	if (format === "jYYYY-jM-jD") {
		return toJalaliDate(date);
	}
	if (format === "jYYYY-jMM-jDD") {
		return toJalaliDateWithFormat(date);
	}
	if (format === "jMMMM") {
		return toJalaliMonth(date);
	}
	if (format === "jD") {
		return toJalaliDay(date);
	}
	if (typeof date === "string") {
		if (date?.includes("/")) date = date?.replaceAll("/", "-");
		date = new Date(date);
	}
	const splited: any = toStandard(date)?.split("T");
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

/**
 * Converts a Persian month name to its index in the Jalali calendar.
 * @param {string} monthString - Persian month name.
 * @returns {number} Index of the month (1-12).
 */
const toJalaliMonthIndex = (monthString: string): number => {
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
	return monthofyear[monthString as string];
};

/**
 * Converts a Jalali month index to its Persian name.
 * @param {number} monthString - Month index (1-12).
 * @returns {string} Persian month name.
 */
const toJalaliMonthIndexReverse = (monthNumber: number): string => {
	const monthOfYear = {
		1: "فروردین",
		2: "اردیبهشت",
		3: "خرداد",
		4: "تیر",
		5: "مرداد",
		6: "شهریور",
		7: "مهر",
		8: "آبان",
		9: "آذر",
		10: "دی",
		11: "بهمن",
		12: "اسفند",
	};
	return monthOfYear[monthNumber];
};

/**
 * Extracts the time (HH:mm) from a full date-time string in the format YYYY-MM-DDTHH:mm:ss.
 * @param {string} timeString - Full date-time string.
 * @returns {string} Extracted time in HH:mm format.
 */
const getFullTime = (timeString: string): string => {
	if (typeof timeString !== "undefined") {
		const parts = timeString?.split("T", 2);
		return parts[1]?.slice(0, 5);
	} else {
		return "";
	}
};

/**
 * Converts a Gregorian date string to full Jalali (jalali) date with Persian month names.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Full Jalali date with Persian month names.
 */
const toFullJalaliWithPersianMonth = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return `${parts[2]} ${jalaliMonths[parts[1] - 1]} ${parts[0]}`;
};

/**
 * Converts a Gregorian date string to the Jalali day name.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali day name.
 */
const toJalaliDay = (dateString: string): string => {
	const date = new Date(dateString);
	return `${jalaliDays[date.getDay()]}`;
};

/**
 * Extracts the Jalali day number from a Gregorian date string.
 * @param {Date} date - Gregorian date object.
 * @returns {string} Jalali day number.
 */
const toJalaliDayNumber = (date: Date): string => {
	const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return `${parts[2]}`;
};

/**
 * Converts a Gregorian date to the Jalali month in Persian.
 * @param {Date} date - Gregorian date object.
 * @returns {string} Jalali month in Persian.
 */
const toJalaliMonth = (date: Date): string => {
	const parts: any = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return `${jalaliMonths[parts[1] - 1]}`;
};

/**
 * Converts a Gregorian date to a formatted Jalali (jalali) date.
 * @param {Date} date - Gregorian date object.
 * @returns {string} Jalali date in the format YYYY-MM-DD.
 */
const toJalaliDate = (date: Date): string => {
	const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("-");
	return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

/**
 * Converts a Gregorian date to a formatted Jalali date with padded month and day.
 * @param {Date} date - Gregorian date object.
 * @returns {string} Jalali date in the format YYYY-MM-DD with zero-padded month and day.
 */
const toJalaliDateWithFormat = (date: Date): string => {
	const parts = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	let month = "";
	let day = "";
	if (parts[1]?.length < 2) month = `0${parts[1]}`;
	else month = `${parts[1]}`;
	if (parts[2]?.length < 2) day = `0${parts[2]}`;
	else day = `${parts[2]}`;
	return `${parts[0]}-${month}-${day}`;
};

/**
 * Converts a Gregorian date string to a Jalali date with Persian month and day.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date with Persian month and day.
 */
const toJalaliWithPersianMonthAndDay = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return `${parts[2]} ${jalaliMonths[parts[1] - 1]}`;
};

/**
 * Converts a Gregorian date string to a Jalali date with Persian day and month.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date with Persian day and month.
 */
const toJalaliWithPersianMonthAndPersianDay = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString("fa-IR")).split("/");
	return `${jalaliDays[date.getDay()]} ${parts[2]} ${
		jalaliMonths[parts[1] - 1]
	}`;
};

/**
 * Converts a date's year, month, and day to Jalali (jalali) date.
 * @param {number} year - Gregorian year.
 * @param {number} month - Gregorian month (0-indexed).
 * @param {number} day - Gregorian day.
 * @returns {string} Jalali date string.
 */
const toJalaliByDetails = (
	year: number,
	month: number,
	day: number
): string => {
	const date = new Date(year, month, day).toLocaleDateString("fa-IR");
	return date;
};

/**
 * Calculates the number of days between the current date and a specified date.
 * @param {string} data - Desired date as a string in the format MM/DD/YYYY HH:mm:ss.
 * @returns {number} Number of days between the two dates.
 */
const distanceDate = (data: string): number => {
	function parseDate(dateString: any) {
		const [datePart, timePart] = dateString.split(" ");
		const [month, day, year] = datePart.split("/");
		const [hours, minutes, seconds] = timePart.split(":");
		return new Date(year, month - 1, day, hours, minutes, seconds);
	}
	const orderDate = parseDate(data);
	const currentDate = new Date();
	const timeDifference = +orderDate - +currentDate;
	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	return daysDifference;
};

export {
	toStandardNewClock,
	toStandard,
	addDays,
	toGregorianDate,
	jalaliToFullGregorianDateString,
	jalaliToFullGregorianDateTime,
	getJalaliYear,
	toJalaliFullDate,
	splitTime,
	isBefore,
	extractTimeFromDateTime,
	jalaliMonths,
	jalaliDays,
	todaysDate,
	formatDateString,
	toJalaliMonthIndex,
	toJalaliMonthIndexReverse,
	getFullTime,
	toFullJalaliWithPersianMonth,
	toJalaliDay,
	toJalaliDayNumber,
	toJalaliMonth,
	toJalaliDate,
	toJalaliDateWithFormat,
	toJalaliWithPersianMonthAndDay,
	toJalaliWithPersianMonthAndPersianDay,
	toJalaliByDetails,
	distanceDate,
};
