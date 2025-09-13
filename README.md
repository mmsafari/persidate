# persidate

[![Version](https://img.shields.io/npm/v/persidate?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/persidate)
[![Build Size](https://img.shields.io/bundlephobia/minzip/persidate?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=persidate)
[![Downloads](https://img.shields.io/npm/dt/persidate.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/persidate)
[![SonarQube](https://sonarcloud.io/api/project_badges/measure?project=mmsafari_persidate&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mmsafari_persidate)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=mmsafari_persidate&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=mmsafari_persidate)

**`persidate`** is a lightweight JavaScript/TypeScript library designed for converting and managing Shamsi (Jalali) and Gregorian dates. It provides a clean and simple API for handling date conversions, formatting, and utility functions.

---

## Installation

```bash
npm install persidate
# or
yarn add persidate
```

Compatible with Node.js v14+ (tested up to v22)

>Try it in [Live Demo](https://k2xwfw.csb.app/).

## Benchmark

`persidate` delivers a cleaner, faster, and lighter solution for Jalali ↔ Gregorian date handling, making it a superior alternative to bulky or outdated libraries like **jalali-moment**, **dayjs**, and **idate**.

| Package       | Bundle size (Min+Gzip) | Notes |
|---------------|-------------------------|-------|
| **persidate** | **2.3 KB**              | **Fast, Lightweight, No deps** |
| jalali-moment | 78.4 KB                 | Verbose API, Legacy |
| dayjs         | 3 KB                    | Plugin-based Jalali support |
| idate         | 2.7 KB                  | Outdated, Legacy |

> Check out a small sandbox comparing **persidate**, dayjs, jalali-moment, and idate in tricky date conversion cases.
> [Open Sandbox](https://codesandbox.io/p/sandbox/inspiring-johnson-p86lrj)



## Features & Advantages

- **Fast & Lightweight** – Ultra-optimized conversions with no dependencies.
- **Full Jalali ↔ Gregorian Support** – Simple API for conversion, formatting, and utilities.
- **Developer-Friendly** – Clean TypeScript API, works for both Persian and non-Persian devs.
- **Reliable & Tested** – Verified with **SonarQube**, compatible with Node.js v14+.



## Functions

### Convert
##### Transform between Jalali and Gregorian.

	• convertToStandardDateTime
	• convertToISODateTime
	• convertToGregorianDate
	• convertToGregorianDateString
	• convertToJalaliDate

### Format
##### Display in specific formats (padded, localized).

	• formatToGregorianDate
	• formatToGregorianDateTime
	• formatToJalaliDatePadded
	• formatToLocalizedDate

### Get
##### Retrieve specific details (today, timestamp, etc).

	• getToday
	• getTimeFromDate
	• getDaysFromNow
	• getJalaliTimeStamp
	• getTimeAgo

### Utility
##### Miscellaneous operations (add days, compare dates).

	• addDaysToDate
	• isBeforeDate
	• isLeapYearJalali

### Constants
##### Static month/weekday names.

	• jalaliMonthNames
	• jalaliWeekdayNames

## Usage
Here are some quick examples:

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
console.log(convertToJalaliDate(1752771248824, "year"));               // 1404


// Timestamp to Gregorian date string
console.log(formatToGregorianDate(1697625600000)); // 2023-10-19

// Date object to Gregorian string
console.log(formatToGregorianDate(new Date('2024-10-18'))); // 2024-10-18

// Jalali date + time to Gregorian datetime string
console.log(formatToGregorianDateTime(new Date(), '14:30')); // 2024-10-17T14:30
console.log(formatToGregorianDateTime(1697625600000, '14:30')); // 2024-10-17T14:30

// Gregorian to Jalali (padded)
console.log(formatToJalaliDatePadded('2024-10-18')); // 1403-07-26
console.log(formatToJalaliDatePadded(new Date())); // 1403-07-26
console.log(formatToJalaliDatePadded(1697625600000)); // 1403-07-26

// Gregorian to localized Jalali string
console.log(formatToLocalizedDate('2024-10-18', 'jYYYY-jM-jD')); // 1403-7-26


// Get today's date (YYYY-MM-DD)
console.log(getToday()); // e.g. 2024-10-17

// Extract time from datetime string
console.log(getTimeFromDate('2024-10-18T14:30:00')); // 14:30:00
console.log(getTimeFromDate(new Date()));	// 12:43:00
console.log(getTimeFromDate(1697625600000)); // 12:43:00

// Days from now to future date
console.log(getDaysFromNow("2025-08-01T12:00:00")); // 20
console.log(getDaysFromNow(new Date("2025-07-20"))); // 8

// Convert Jalali to timestamp (ms)
console.log(getJalaliTimeStamp("1404-01-01")); // 1710873600000

// Time difference in Persian (e.g. "۲ روز پیش")
console.log(getTimeAgo(new Date()));
console.log(getTimeAgo("2025-07-20"));
console.log(getTimeAgo(1697625600000));


// Add N days to a date
const today = new Date();
const plusTen = addDaysToDate(today, 10);
console.log(plusTen);

// Compare two dates
const date1 = '2024-10-18';
const date2 = '2025-01-01';
console.log(isBeforeDate(date1, date2)); // true

// Check if the given Jalali year is a leap year
console.log(isLeapYearJalali(1403)); // true
```

## Contributors

- **mmsafari**: [GitHub](https://github.com/mmsafari) · [LinkedIn](https://www.linkedin.com/in/mmsafari/)
