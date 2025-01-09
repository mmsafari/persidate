# persidate
[![NPM Version](https://img.shields.io/npm/v/persidate)](https://www.npmjs.com/package/persidate)

`persidate` is a lightweight JavaScript/TypeScript library designed for converting and managing Shamsi (Jalali) and Gregorian dates. It provides a clean and simple API for handling date conversions, formatting, and utility functions.

## Installation

Install `persidate` using npm:
```bash
npm install persidate
``` 

## Available Functions

### Convert

	•	convertToStandardDateTime
	•	convertToISODateTime
	•	convertToGregorianDate
	•	convertToGregorianDateString
	•	convertToJalaliDate
	•	convertToJalaliDay
	•	convertToJalaliWithMonth
	•	convertToJalaliWithMonthAndDay
	•	convertToJalaliMonth

### Format

	•	formatToGregorianDate
	•	formatToGregorianDateTime
	•	formatToJalaliDatePadded
	•	formatToLocalizedDate

### Get

	•	getJalaliYear
	•	getJalaliDayNumber
	•	getJalaliMonthAndDay
	•	getJalaliDateDetails
	•	getToday
	•	getCurrentTime
	•	getTimeFromDate
	•	getDaysFromNow
	•	getTimeParts

### Utility

	. addDaysToDate
	. isBeforeDate

### Constants

	. jalaliMonthNames
	. jalaliWeekdayNames

## Function Patterns

The library follows these naming patterns for better consistency and developer experience:

	•	convert: For transforming between formats (e.g., Gregorian ↔ Jalali).
	•	format: For displaying dates in specific formats (e.g., padded, localized).
	•	get: For retrieving specific details (e.g., year, month, time).
	•	utility: For miscellaneous operations (e.g., comparisons, adding days).
	•	constants: Static arrays or objects (e.g., month and weekday names).

## Features

	•	Convert between Shamsi (Jalali) and Gregorian (Miladi) dates.
	•	Format dates for display in localized formats.
	•	Utility functions for date manipulation (e.g., adding days, comparing dates).

## Improvements:

	1.	Consistent headings: Simplifies navigation for users.
	2.	Better function categorization: Clear and concise explanation of each group.
	3.	Cleaner examples: Makes it easier for new users to understand the API.
	4.	Polished grammar and style: Improves readability and professionalism.

## Usage
`Here's a simple example of how to use persidate in your project:`

```javascript

// Convert any given date to standard ISO format in local time
const localISODate = convertToStandardDateTime(new Date('2024-10-18T10:00:00Z'));
console.log(localISODate); // Output: 2024-10-18T13:30:00 (depending on your timezone)

// Convert a given date to ISO format with timezone offset adjustment
const isoDate = convertToISODateTime('2024-10-18T10:00:00Z');
console.log(isoDate); // Output: 2024-10-18T11:00:00 (depending on your timezone)

// Convert Shamsi date to Gregorian as a Date object
const miladiDate = convertToGregorianDate("1403-8-16");
console.log(miladiDate); // Output: Wed Nov 06 2024 00:00:00 GMT+0330 (Iran Standard Time)

// Convert Shamsi date to Gregorian as a formatted string
const miladiDateString = convertToGregorianDateString("1403/8/16");
console.log(miladiDateString); // Output: 2024/11/6

// Convert Gregorian date to Shamsi
const shamsiDate = convertToJalaliDate('2024-10-18');
console.log(shamsiDate); // Output: 1403-7-26 

// Convert a Gregorian date string to the Jalali day name
const jalaliDay = convertToJalaliDay('2024-10-18');
console.log(jalaliDay); // Output: پنج‌شنبه

// Convert a Gregorian date string or Date object to the Jalali month in Persian
const jalaliMonth = convertToJalaliMonth('2024-10-18');
console.log(jalaliMonth); // Output: مهر

// Format a Gregorian date to Shamsi with Persian month names
const formattedShamsi = convertToJalaliWithMonth('2024-10-18');
console.log(formattedShamsi); // Output: 26 مهر 1403

// Convert a Gregorian date string to the Jalali day name and month
const jalaliDate = convertToJalaliWithMonthAndDay('2024-10-18');
console.log(jalaliDate); // Output: پنج‌شنبه 27 مهر

// Convert a Unix timestamp to Gregorian date string in YYYY-MM-DD format
const gregorianDate = formatToGregorianDate(1697625600000); // Timestamp for '2023-10-19T00:00:00Z'
console.log(gregorianDate); // Output: 2023-10-19

// Convert a Date object to Gregorian date string in YYYY-MM-DD format
const dateObject = new Date('2024-10-18');
const gregorianDateFromObject = formatToGregorianDate(dateObject);
console.log(gregorianDateFromObject); // Output: 2024-10-18

// Convert a Jalali date with time to Gregorian date string with time
const gregorianDateTime = formatToGregorianDateTime(1403, 7, 26, '14:30');
console.log(gregorianDateTime); // Output: 2024-10-17T14:30

// Convert Gregorian date to Jalali date with padded month and day
const jalaliDatePadded = formatToJalaliDatePadded('2024-10-18');
console.log(jalaliDatePadded); // Output: 1403-07-26

// Get the Jalali year from a Gregorian date string
const jalaliYear = getJalaliYear('2024-10-18');
console.log(jalaliYear); // Output: 1403

// Get the Jalali day number from a Gregorian date object
const dateObject = new Date('2024-10-18');
const jalaliDay = getJalaliDayNumber(dateObject);
console.log(jalaliDay); // Output: 26

// Get the Jalali month and day from a Gregorian date string
const jalaliMonthAndDay = getJalaliMonthAndDay('2024-10-18');
console.log(jalaliMonthAndDay); // Output: 26 مهر

// Get the Jalali date details from Gregorian year, month, and day
const jalaliDateDetails = getJalaliDateDetails(2024, 9, 18); // 2024-10-18
console.log(jalaliDateDetails); // Output: 1403/07/26

// Get today's date in YYYY-MM-DD format
const today = getToday();
console.log(today); // Output: 2024-10-17

// Get the current time (HH:mm) from a full date-time string
const currentTime = getCurrentTime('2024-10-18T14:30:00');
console.log(currentTime); // Output: 14:30

// Extract time from a full date-time string
const extractedTime = getTimeFromDate('2024-10-18T14:30:00');
console.log(extractedTime); // Output: 14:30

// Get the time parts from a time string (HH:mm:ss)
const timeParts = getTimeParts('14:30:45');
console.log(timeParts); // Output: { hour: '14', minute: '30', second: '45' }

// Get the number of days between today and a specified date
const daysFromNow = getDaysFromNow('01/15/2025 12:00:00');
console.log(daysFromNow); // Output: 6

// Convert Gregorian date to localized Shamsi format
const localizedShamsi = formatToLocalizedDate('2024-10-18', 'jYYYY-jM-jD');
console.log(localizedShamsi); // Output: 1403-7-26

// Add 10 days to today's date
const today = new Date();
const newDate = addDaysToDate(today, 10);
console.log(newDate); // Outputs a new date 10 days ahead of today

// Check if first date is before second date
const date1 = '2024-10-18';
const date2 = '2025-01-01';
const result = isBeforeDate(date1, date2);
console.log(result); // Outputs: true (since 2024-10-18 is before 2025-01-01)

```

## Contributors ✨

`mmsafari:` [https://github.com/mmsafari](mmsafari)
