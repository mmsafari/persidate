# 📅 persidate

[![Version](https://img.shields.io/npm/v/persidate?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/persidate)
[![Build Size](https://img.shields.io/bundlephobia/minzip/persidate?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=persidate)
[![Downloads](https://img.shields.io/npm/dt/persidate.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/persidate)

**`persidate`** is a lightweight JavaScript/TypeScript library designed for converting and managing Shamsi (Jalali) and Gregorian dates. It provides a clean and simple API for handling date conversions, formatting, and utility functions.

---

## 🚀 Installation

Using npm:
```bash
npm install persidate
```

Using yarn:
```bash
yarn add persidate
```

---

## Available Functions

### Convert

	• convertToStandardDateTime
	• convertToISODateTime
	• convertToGregorianDate
	• convertToGregorianDateString
	• convertToJalaliDate

### Format

	• formatToGregorianDate
	• formatToGregorianDateTime
	• formatToJalaliDatePadded
	• formatToLocalizedDate

### Get

	• getJalaliYear
	• getJalaliDateDetails
	• getToday
	• getCurrentTime
	• getTimeFromDate
	• getDaysFromNow
	• getTimeParts
	• getJalaliTimeStamp
	• getTimeAgo

### Utility

	• addDaysToDate
	• isBeforeDate

### Constants

	• jalaliMonthNames
	• jalaliWeekdayNames

## Function Naming Patterns

The library follows these naming patterns for better consistency and developer experience:

	• convert: For transforming between formats (e.g., Gregorian ↔ Jalali).
	• format: For displaying dates in specific formats (e.g., padded, localized).
	• get: For retrieving specific details (e.g., year, month, time).
	• utility: For miscellaneous operations (e.g., comparisons, adding days).
	• constants: Static arrays or objects (e.g., month and weekday names).

## Features

	• Convert between Shamsi (Jalali) and Gregorian (Miladi) dates.
	• Persian formatting with month/weekday names.
	• Utility functions for date manipulation (e.g., adding days, comparing dates).

## Improvements:

	1. Consistent headings: Simplifies navigation for users.
	2. Better function categorization: Clear and concise explanation of each group.
	3. Cleaner examples: Makes it easier for new users to understand the API.
	4. Polished grammar and style: Improves readability and professionalism.

## Usage
`Here's a simple example of how to use persidate in your project:`

```ts
// Convert to local ISO string
const localISO = convertToStandardDateTime(new Date('2024-10-18T10:00:00Z'));
console.log(localISO); // 2024-10-18T13:30:00

// Convert to ISO with timezone adjustment
const isoDate = convertToISODateTime('2024-10-18T10:00:00Z');
console.log(isoDate); // 2024-10-18T11:00:00

// Convert Jalali (Shamsi) to Gregorian Date object
const miladi = convertToGregorianDate("1403-8-16");
console.log(miladi); // Wed Nov 06 2024 ...

// Convert Jalali to formatted Gregorian string
const miladiStr = convertToGregorianDateString("1403/8/16");
console.log(miladiStr); // 2024/11/6

// Convert Gregorian to Jalali with default format
const shamsi1 = convertToJalaliDate("2024-10-18");
console.log(shamsi1); // 1403-07-27

//convert Georgian date to Jalali
const shamsi2 = convertToJalaliDate(new Date());
console.log(germanDate); // 1403-07-27

// Convert Gregorian to Jalali with custom formats
console.log(convertToJalaliDate("2024-10-18", "dayMonth"));             // 27 مهر
console.log(convertToJalaliDate("2024-10-18", "dayMonthYear"));        // 27 مهر 1403
console.log(convertToJalaliDate("2024-10-18", "weekdayDayMonth"));     // جمعه 27 مهر
console.log(convertToJalaliDate("2024-10-18", "weekdayDayMonthYear")); // جمعه 27 مهر 1403
console.log(convertToJalaliDate("2024-10-18", "day"));                 // 27
console.log(convertToJalaliDate("2024-10-18", "weekday"));             // جمعه
console.log(convertToJalaliDate("2024-10-18", "month"));               // مهر


// Timestamp to Gregorian date string
console.log(formatToGregorianDate(1697625600000)); // 2023-10-19

// Date object to Gregorian string
console.log(formatToGregorianDate(new Date('2024-10-18'))); // 2024-10-18

// Jalali date + time to Gregorian datetime string
console.log(formatToGregorianDateTime(1403, 7, 26, '14:30')); // 2024-10-17T14:30

// Gregorian to Jalali (padded)
console.log(formatToJalaliDatePadded('2024-10-18')); // 1403-07-26

// Gregorian to localized Jalali string
console.log(formatToLocalizedDate('2024-10-18', 'jYYYY-jM-jD')); // 1403-7-26



// Get Jalali year from Gregorian string
console.log(getJalaliYear('2024-10-18')); // 1403

// Get Jalali details from Gregorian year/month/day
console.log(getJalaliDateDetails(2024, 9, 18)); // 1403/07/26

// Get today's date (YYYY-MM-DD)
console.log(getToday()); // e.g. 2024-10-17

// Extract time from datetime string
console.log(getCurrentTime('2024-10-18T14:30:00')); // 14:30
console.log(getTimeFromDate('2024-10-18T14:30:00')); // 14:30

// Parse time parts from HH:mm:ss
console.log(getTimeParts('14:30:45'));
// { hour: '14', minute: '30', second: '45' }

// Days from now to future date
console.log(getDaysFromNow("2025-08-01T12:00:00")); // 20
console.log(getDaysFromNow(new Date("2025-07-20"))); // 8

// Convert Jalali to timestamp (ms)
console.log(getJalaliTimeStamp("1404-01-01")); // 1710873600000

// Time difference in Persian (e.g. "۲ روز پیش")
console.log(getTimeAgo(new Date("2025-07-20")));



// Add N days to a date
const today = new Date();
const plusTen = addDaysToDate(today, 10);
console.log(plusTen);

// Compare two dates
const date1 = '2024-10-18';
const date2 = '2025-01-01';
console.log(isBeforeDate(date1, date2)); // true
```

## Contributors

`mmsafari:` [https://github.com/mmsafari](mmsafari)
