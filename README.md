# persidate

`persidate` is a lightweight JavaScript/TypeScript package for converting and managing Shamsi (Jalali) and Gregorian dates. This package provides a simple interface to handle date conversions and formatting.

## Installation

You can install `persidate` via npm:

```bash
npm install persidate
``` 

## Usage
`Here's a simple example of how to use persidate in your project:`


```html

import { toShamsiDate, toMiladi, dateStringtoFullShamsiwithPersianMonth } from 'persidate';

// Convert Gregorian date to Shamsi
const shamsiDate = toShamsiDate('2024-10-18');
console.log(shamsiDate); // Output: 26 مهر 1403

// Convert Shamsi date to Gregorian
const miladiDate = toMiladi(1403, 7, 26);
console.log(miladiDate); // Output: 2024-10-18T00:00:00.000Z

// Format a date to Shamsi with Persian month
const formattedShamsi = dateStringtoFullShamsiwithPersianMonth('2024-10-18');
console.log(formattedShamsi); // Output: 26 مهر 1403
```

## Features

- `Convert between Shamsi (Jalali) and Gregorian dates.`
- `Format dates for display in Shamsi.`
- `Utility functions for date manipulation (e.g., adding days).`

## Contributors ✨

`mmsafari`