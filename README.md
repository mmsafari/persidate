# persidate
[![NPM Version](https://img.shields.io/npm/v/persidate)](https://www.npmjs.com/package/persidate)

`persidate` is a lightweight JavaScript/TypeScript library designed for converting and managing Shamsi (Jalali) and Gregorian dates. It provides a clean and simple API for handling date conversions, formatting, and utility functions.

## Installation

Install `persidate` using npm:
```bash
npm install persidate
``` 

## Usage
`Here's a simple example of how to use persidate in your project:`

```javascript
// Convert Gregorian date to Shamsi
const shamsiDate = convertToJalaliDate('2024-10-18');
console.log(shamsiDate); // Output: 1403-7-26 

// Convert Shamsi date to Gregorian as a Date object
const miladiDate = convertToGregorianDate("1403-8-16");
console.log(miladiDate); // Output: Wed Nov 06 2024 00:00:00 GMT+0330 (Iran Standard Time)

// Convert Shamsi date to Gregorian as a formatted string
const miladiDateString = convertToGregorianDateString("1403/8/16");
console.log(miladiDateString); // Output: 2024/11/6

// Format a Gregorian date to Shamsi with Persian month names
const formattedShamsi = formatToJalaliWithMonth('2024-10-18');
console.log(formattedShamsi); // Output: 26 مهر 1403

// Convert Gregorian date to localized Shamsi format
const localizedShamsi = formatToLocalizedDate('2024-10-18', 'jYYYY-jM-jD');
console.log(localizedShamsi); // Output: 1403-7-26
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

## Contributors ✨

`mmsafari:` [https://github.com/mmsafari](mmsafari)
