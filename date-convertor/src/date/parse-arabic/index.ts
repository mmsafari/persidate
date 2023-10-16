const convertPattern = (str: string) => {
   const string = str + '';
   return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (x) => {
     return `${x.charCodeAt(0) & 0xf}`;
   });
 };
export const parseArabic = (str: string) => {
   str = convertPattern(str);
   const persianNumbers = [
     /۰/g,
     /۱/g,
     /۲/g,
     /۳/g,
     /۴/g,
     /۵/g,
     /۶/g,
     /۷/g,
     /۸/g,
     /۹/g,
   ];
   const arabicNumbers = [
     /٠/g,
     /١/g,
     /٢/g,
     /٣/g,
     /٤/g,
     /٥/g,
     /٦/g,
     /٧/g,
     /٨/g,
     /٩/g,
   ];
   if (typeof str === 'string') {
     for (let i = 0; i < 10; i++) {
       str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
     }
   }
   return str;
 };