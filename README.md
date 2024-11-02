# persidate

`persidate` is a lightweight JavaScript/TypeScript package for converting and managing Shamsi (Jalali) and Gregorian dates. This package provides a simple interface to handle date conversions and formatting.

## Usage
`Here's a simple example of how to use persidate in your project:`

```javascript

// Convert Gregorian date to Shamsi
const shamsiDate = formatJalaliDate('2024-10-18');
console.log(shamsiDate); // Output: 1403-7-26 

// Convert Shamsi date to Gregorian
const miladiDate = convertToGregorianDate(1403, 7, 26);
console.log(miladiDate); // Output: 2024-10-18

// Format a date to Shamsi with Persian month
const formattedShamsi = formatJalaliWithPersianMonth('2024-10-18');
console.log(formattedShamsi); // Output: 26 مهر 1403
```
### Functions

```javascript
convertToStandardDateTime,      
convertToISOStandard,           
incrementDays,             
convertToGregorianDate,        
formatFullGregorianDate,       
formatFullGregorianDateTime,   
getJalaliYear,              
convertToFullJalaliDate,      
formatJalaliWithPersianMonth,   
convertToJalaliDay,           
getJalaliDayNumber,      
convertToJalaliWithPersianMonthAndDay, 
convertToJalaliMonth,          
convertToJalaliMonth,          
formatJalaliDate, 
formatJalaliDateWithPadding,
getPersianMonthAndDayJalali,   
getDetailedJalaliDate,         
isDateBefore,                
calculateDateDifference,       
extractTime,                   
getCurrentFullTime,            
splitTime,                     
persianJalaliMonths,           
jalaliWeekDays,             
getTodayDate,            
formatLocalizedDateString, 
getJalaliMonthIndex,        
reverseJalaliMonthIndex,  
```

## Features

- `Convert between Shamsi (Jalali) and Miladi (Gregorian) dates.`
- `Format dates for display in Shamsi.`
- `Utility functions for date manipulation (e.g., adding days).`

## Contributors ✨

`mmsafari:` [https://github.com/mmsafari](mmsafari)
