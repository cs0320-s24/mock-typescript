const dolRIHeader: string[][] = [
  [
    "State",
    "Data Type",
    "Average Weekly Earnings",
    "Number of Workers",
    "Earnings Disparity",
    "Employed Percent",
  ],
  ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
  ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
  [
    "RI",
    "Native American/American Indian",
    " $471.07 ",
    "2315.505646",
    " $0.45 ",
    "0%",
  ],
  [
    "RI",
    "Asian-Pacific Islander",
    '" $1,080.09 "',
    "18956.71657",
    " $1.02 ",
    "4%",
  ],
  ["RI", "Hispanic/Latino", "x $673.14 ", "74596.18851", " $0.64 ", "14%"],
  ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
];

const dolRINoHeader: string[][] = [
  [
    "State",
    "Data Type",
    "Average Weekly Earnings",
    "Number of Workers",
    "Earnings Disparity",
    "Employed Percent",
  ],
  ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
  ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
  [
    "RI",
    "Native American/American Indian",
    " $471.07 ",
    "2315.505646",
    " $0.45 ",
    "0%",
  ],
  [
    "RI",
    "Asian-Pacific Islander",
    '" $1,080.09 "',
    "18956.71657",
    " $1.02 ",
    "4%",
  ],
  ["RI", "Hispanic/Latino", "x $673.14 ", "74596.18851", " $0.64 ", "14%"],
  ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
];

const empty: string[][] = [[]];

export const dataMap: { [key: string]: string[][] } = {
  "census/dol_ri_earnings_disparity.csv": dolRIHeader,
  "census/dol_ri_earnings_disparity_no_header.csv": dolRINoHeader,
  "empty.csv": empty,
};
