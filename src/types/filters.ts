// Todo: potreban je bolji naming, Filters je genericki pojam i bez znanja o projektu ne mozemo znati na sta se odnose
// ja bih ovo nazvao IGetCharactersFilters, i da, konvencija za interfejs naming je da se prefixuje sa I kako bi znali da se radi o interfejsu a ne klasi nekoj
interface Filters {
  name: string;
  value: string;
}

export default Filters;
