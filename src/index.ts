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
	return `${gYear}/${gMonth.toString().padStart(2, '0')}/${gDay.toString().padStart(2, '0')}`;
};

/**
 * Converts a Gregorian date to a formatted Jalali (jalali) date.
 * @param {Date | string | number} date - Gregorian date object.
 * @returns {string} Jalali date in the format YYYY-MM-DD.
 */
export const convertToJalaliDate = (date: Date | string | number): string => {
	const parsedDate =
		typeof date === "number" || typeof date === "string"
			? new Date(date)
			: date;
	const parts = parseArabic(parsedDate.toLocaleDateString("fa-IR")).split("/");
	return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

/**
 * Converts a Gregorian date string to the Jalali day name.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali day name.
 */
export const convertToJalaliDay = (dateString: string): string => {
	const date = new Date(dateString);
	return `${jalaliWeekdayNames[date.getDay()]}`;
};

/**
 * Converts a Gregorian date to the Jalali month in Persian.
 * @param {Date | string} date - Gregorian date object.
 * @returns {string} Jalali month in Persian.
 */
export const convertToJalaliMonth = (date: Date | string): string => {
	const formattedDate = typeof date === "string" ? new Date(date) : date;
	const parts: any = parseArabic(
		formattedDate.toLocaleDateString(locale)
	).split("/");
	return `${jalaliMonthNames[parseInt(parts[1], 10) - 1]}`;
};

/**
 * Converts a Gregorian date string to full Jalali (jalali) date with Persian month names.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Full Jalali date with Persian month names.
 */
export const convertToJalaliWithMonth = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString(locale)).split("/");
	return `${parts[2]} ${jalaliMonthNames[parts[1] - 1]} ${parts[0]}`;
};

/**
 * Converts a Gregorian date string to a Jalali date with Persian day and month.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date with Persian day and month.
 */
export const convertToJalaliWithMonthAndDay = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString(locale)).split("/");
	return `${jalaliWeekdayNames[date.getDay()]} ${parts[2]} ${
		jalaliMonthNames[parts[1] - 1]
	}`;
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
		"/"
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

	if (format === "jD jMMMM jYY") return convertToJalaliWithMonth(date);
	if (format === "jYYYY-jM-jD") {
		return convertToJalaliDate(date);
	}
	if (format === "jYYYY-jMM-jDD") {
		return formatToJalaliDatePadded(date);
	}
	if (format === "jMMMM") {
		return convertToJalaliMonth(date);
	}
	if (format === "jD") {
		return convertToJalaliDay(date);
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
	const parts = parseArabic(date.toLocaleDateString(locale)).split("/");
	return parts[0];
};

/**
 * Extracts the Jalali day number from a Gregorian date string.
 * @param {Date} date - Gregorian date object.
 * @returns {string} Jalali day number.
 */
export const getJalaliDayNumber = (date: Date): string => {
	const parts = parseArabic(date.toLocaleDateString(locale)).split("/");
	return `${parts[2]}`;
};

/**
 * Converts a Gregorian date string to a Jalali date with Persian month and day.
 * @param {string} dateString - Gregorian date string.
 * @returns {string} Jalali date with Persian month and day.
 */
export const getJalaliMonthAndDay = (dateString: string): string => {
	const date = new Date(dateString);
	const parts: any = parseArabic(date.toLocaleDateString(locale)).split("/");
	return `${parts[2]} ${jalaliMonthNames[parts[1] - 1]}`;
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
 * Calculates the number of days between the current date and a specified date.
 * @param {string} data - Desired date as a string in the format MM/DD/YYYY HH:mm:ss.
 * @returns {number} Number of days between the two dates.
 */
export const getDaysFromNow = (data: string): number => {
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
