const codes = [
  {
    name: 'AL',
    value: 355,
  },
  {
    name: 'DZ',
    value: 213,
  },
  {
    name: 'AF',
    value: 93,
  },
  {
    name: 'AR',
    value: 54,
  },
  {
    name: 'AE',
    value: 971,
  },
  {
    name: 'AW',
    value: 297,
  },
  {
    name: 'OM',
    value: 968,
  },
  {
    name: 'AZ',
    value: 994,
  },
  {
    name: 'EG',
    value: 20,
  },
  {
    name: 'ET',
    value: 251,
  },
  {
    name: 'IE',
    value: 353,
  },
  {
    name: 'EE',
    value: 372,
  },
  {
    name: 'AD',
    value: 376,
  },
  {
    name: 'AO',
    value: 244,
  },
  {
    name: 'AI',
    value: 1264,
  },
  {
    name: 'AG',
    value: 1268,
  },
  {
    name: 'AT',
    value: 43,
  },
  {
    name: 'AU',
    value: 61,
  },
  {
    name: 'MO',
    value: 853,
  },
  {
    name: 'BB',
    value: 1246,
  },
  {
    name: 'PG',
    value: 675,
  },
  {
    name: 'BS',
    value: 1242,
  },
  {
    name: 'PK',
    value: 92,
  },
  {
    name: 'PY',
    value: 595,
  },
  {
    name: 'PS',
    value: 970,
  },
  {
    name: 'BH',
    value: 973,
  },
  {
    name: 'PA',
    value: 507,
  },
  {
    name: 'BR',
    value: 55,
  },
  {
    name: 'BY',
    value: 375,
  },
  {
    name: 'BM',
    value: 1441,
  },
  {
    name: 'BG',
    value: 359,
  },
  {
    name: 'MP',
    value: 1670,
  },
  {
    name: 'BJ',
    value: 229,
  },
  {
    name: 'BE',
    value: 32,
  },
  {
    name: 'IS',
    value: 354,
  },
  {
    name: 'PR',
    value: 1,
  },
  {
    name: 'PL',
    value: 48,
  },
  {
    name: 'BA',
    value: 387,
  },
  {
    name: 'BO',
    value: 591,
  },
  {
    name: 'BZ',
    value: 501,
  },
  {
    name: 'PW',
    value: 680,
  },
  {
    name: 'BW',
    value: 267,
  },
  {
    name: 'BT',
    value: 975,
  },
  {
    name: 'BF',
    value: 226,
  },
  {
    name: 'BI',
    value: 257,
  },
  {
    name: 'KP',
    value: 850,
  },
  {
    name: 'GQ',
    value: 240,
  },
  {
    name: 'DK',
    value: 45,
  },
  {
    name: 'DE',
    value: 49,
  },
  {
    name: 'TL',
    value: 670,
  },
  {
    name: 'TG',
    value: 228,
  },
  {
    name: 'DM',
    value: 1767,
  },
  {
    name: 'DO',
    value: 1809,
  },
  {
    name: 'RU',
    value: 7,
  },
  {
    name: 'EC',
    value: 593,
  },
  {
    name: 'ER',
    value: 291,
  },
  {
    name: 'FR',
    value: 33,
  },
  {
    name: 'FO',
    value: 298,
  },
  {
    name: 'PF',
    value: 689,
  },
  {
    name: 'GF',
    value: 594,
  },
  {
    name: 'PM',
    value: 508,
  },
  {
    name: 'VA',
    value: 39,
  },
  {
    name: 'PH',
    value: 63,
  },
  {
    name: 'FJ',
    value: 679,
  },
  {
    name: 'FI',
    value: 358,
  },
  {
    name: 'CV',
    value: 238,
  },
  {
    name: 'FK',
    value: 500,
  },
  {
    name: 'GM',
    value: 220,
  },
  {
    name: 'CG',
    value: 242,
  },
  {
    name: 'CD',
    value: 243,
  },
  {
    name: 'CO',
    value: 57,
  },
  {
    name: 'CR',
    value: 506,
  },
  {
    name: 'GD',
    value: 1473,
  },
  {
    name: 'GL',
    value: 299,
  },
  {
    name: 'GE',
    value: 995,
  },
  {
    name: 'GG',
    value: 44,
  },
  {
    name: 'CU',
    value: 53,
  },
  {
    name: 'GP',
    value: 590,
  },
  {
    name: 'GU',
    value: 1671,
  },
  {
    name: 'GY',
    value: 592,
  },
  {
    name: 'KZ',
    value: 7,
  },
  {
    name: 'HT',
    value: 509,
  },
  {
    name: 'KR',
    value: 82,
  },
  {
    name: 'NL',
    value: 31,
  },
  {
    name: 'BQ',
    value: 599,
  },
  {
    name: 'ME',
    value: 382,
  },
  {
    name: 'HN',
    value: 504,
  },
  {
    name: 'KI',
    value: 686,
  },
  {
    name: 'DJ',
    value: 253,
  },
  {
    name: 'KG',
    value: 996,
  },
  {
    name: 'GN',
    value: 224,
  },
  {
    name: 'GW',
    value: 245,
  },
  {
    name: 'CA',
    value: 1,
  },
  {
    name: 'GH',
    value: 233,
  },
  {
    name: 'GA',
    value: 241,
  },
  {
    name: 'KH',
    value: 855,
  },
  {
    name: 'CZ',
    value: 420,
  },
  {
    name: 'ZW',
    value: 263,
  },
  {
    name: 'CM',
    value: 237,
  },
  {
    name: 'QA',
    value: 974,
  },
  {
    name: 'KY',
    value: 1345,
  },
  {
    name: 'KM',
    value: 269,
  },
  {
    name: 'XK',
    value: 381,
  },
  {
    name: 'CI',
    value: 225,
  },
  {
    name: 'KW',
    value: 965,
  },
  {
    name: 'HR',
    value: 385,
  },
  {
    name: 'KE',
    value: 254,
  },
  {
    name: 'CK',
    value: 682,
  },
  {
    name: 'CW',
    value: 599,
  },
  {
    name: 'LV',
    value: 371,
  },
  {
    name: 'LS',
    value: 266,
  },
  {
    name: 'LA',
    value: 856,
  },
  {
    name: 'LB',
    value: 961,
  },
  {
    name: 'LT',
    value: 370,
  },
  {
    name: 'LR',
    value: 231,
  },
  {
    name: 'LY',
    value: 218,
  },
  {
    name: 'LI',
    value: 423,
  },
  {
    name: 'RE',
    value: 262,
  },
  {
    name: 'LU',
    value: 352,
  },
  {
    name: 'RW',
    value: 250,
  },
  {
    name: 'RO',
    value: 40,
  },
  {
    name: 'MG',
    value: 261,
  },
  {
    name: 'IM',
    value: 44,
  },
  {
    name: 'MV',
    value: 960,
  },
  {
    name: 'MT',
    value: 356,
  },
  {
    name: 'MW',
    value: 265,
  },
  {
    name: 'MY',
    value: 60,
  },
  {
    name: 'ML',
    value: 223,
  },
  {
    name: 'MK',
    value: 389,
  },
  {
    name: 'MH',
    value: 692,
  },
  {
    name: 'MQ',
    value: 596,
  },
  {
    name: 'YT',
    value: 262,
  },
  {
    name: 'MU',
    value: 230,
  },
  {
    name: 'MR',
    value: 222,
  },
  {
    name: 'US',
    value: 1,
  },
  {
    name: 'AS',
    value: 1684,
  },
  {
    name: 'VI',
    value: 1340,
  },
  {
    name: 'MN',
    value: 976,
  },
  {
    name: 'MS',
    value: 1664,
  },
  {
    name: 'BD',
    value: 880,
  },
  {
    name: 'PE',
    value: 51,
  },
  {
    name: 'FM',
    value: 691,
  },
  {
    name: 'MM',
    value: 95,
  },
  {
    name: 'MD',
    value: 373,
  },
  {
    name: 'MA',
    value: 212,
  },
  {
    name: 'MC',
    value: 377,
  },
  {
    name: 'MZ',
    value: 258,
  },
  {
    name: 'MX',
    value: 52,
  },
  {
    name: 'NA',
    value: 264,
  },
  {
    name: 'ZA',
    value: 27,
  },
  {
    name: 'SS',
    value: 211,
  },
  {
    name: 'NR',
    value: 674,
  },
  {
    name: 'NI',
    value: 505,
  },
  {
    name: 'NP',
    value: 977,
  },
  {
    name: 'NE',
    value: 227,
  },
  {
    name: 'NG',
    value: 234,
  },
  {
    name: 'NU',
    value: 683,
  },
  {
    name: 'NO',
    value: 47,
  },
  {
    name: 'NF',
    value: 672,
  },
  {
    name: 'PT',
    value: 351,
  },
  {
    name: 'JP',
    value: 81,
  },
  {
    name: 'SE',
    value: 46,
  },
  {
    name: 'CH',
    value: 41,
  },
  {
    name: 'SV',
    value: 503,
  },
  {
    name: 'WS',
    value: 685,
  },
  {
    name: 'RS',
    value: 381,
  },
  {
    name: 'SL',
    value: 232,
  },
  {
    name: 'SN',
    value: 221,
  },
  {
    name: 'CY',
    value: 357,
  },
  {
    name: 'SC',
    value: 248,
  },
  {
    name: 'SA',
    value: 966,
  },
  {
    name: 'BL',
    value: 590,
  },
  {
    name: 'ST',
    value: 239,
  },
  {
    name: 'SH',
    value: 290,
  },
  {
    name: 'KN',
    value: 1869,
  },
  {
    name: 'LC',
    value: 1758,
  },
  {
    name: 'MF',
    value: 590,
  },
  {
    name: 'SX',
    value: 599,
  },
  {
    name: 'SM',
    value: 378,
  },
  {
    name: 'VC',
    value: 1784,
  },
  {
    name: 'LK',
    value: 94,
  },
  {
    name: 'SK',
    value: 421,
  },
  {
    name: 'SI',
    value: 386,
  },
  {
    name: 'SZ',
    value: 268,
  },
  {
    name: 'SD',
    value: 249,
  },
  {
    name: 'SR',
    value: 597,
  },
  {
    name: 'SB',
    value: 677,
  },
  {
    name: 'SO',
    value: 252,
  },
  {
    name: 'TJ',
    value: 992,
  },
  {
    name: 'TW',
    value: 886,
  },
  {
    name: 'TH',
    value: 66,
  },
  {
    name: 'TZ',
    value: 255,
  },
  {
    name: 'TO',
    value: 676,
  },
  {
    name: 'TC',
    value: 1649,
  },
  {
    name: 'TT',
    value: 1868,
  },
  {
    name: 'TN',
    value: 216,
  },
  {
    name: 'TV',
    value: 688,
  },
  {
    name: 'TR',
    value: 90,
  },
  {
    name: 'TM',
    value: 993,
  },
  {
    name: 'TK',
    value: 690,
  },
  {
    name: 'WF',
    value: 681,
  },
  {
    name: 'VU',
    value: 678,
  },
  {
    name: 'GT',
    value: 502,
  },
  {
    name: 'VE',
    value: 58,
  },
  {
    name: 'BN',
    value: 673,
  },
  {
    name: 'UG',
    value: 256,
  },
  {
    name: 'UA',
    value: 380,
  },
  {
    name: 'UY',
    value: 598,
  },
  {
    name: 'UZ',
    value: 998,
  },
  {
    name: 'GR',
    value: 30,
  },
  {
    name: 'ES',
    value: 34,
  },
  {
    name: 'EH',
    value: 212,
  },
  {
    name: 'HK',
    value: 852,
  },
  {
    name: 'SG',
    value: 65,
  },
  {
    name: 'NC',
    value: 687,
  },
  {
    name: 'NZ',
    value: 64,
  },
  {
    name: 'HU',
    value: 36,
  },
  {
    name: 'SY',
    value: 963,
  },
  {
    name: 'JM',
    value: 1876,
  },
  {
    name: 'AM',
    value: 374,
  },
  {
    name: 'YE',
    value: 967,
  },
  {
    name: 'IQ',
    value: 964,
  },
  {
    name: 'IR',
    value: 98,
  },
  {
    name: 'IL',
    value: 972,
  },
  {
    name: 'IT',
    value: 39,
  },
  {
    name: 'IN',
    value: 91,
  },
  {
    name: 'ID',
    value: 62,
  },
  {
    name: 'GB',
    value: 44,
  },
  {
    name: 'VG',
    value: 1284,
  },
  {
    name: 'IO',
    value: 246,
  },
  {
    name: 'JO',
    value: 962,
  },
  {
    name: 'VN',
    value: 84,
  },
  {
    name: 'ZM',
    value: 260,
  },
  {
    name: 'JE',
    value: 44,
  },
  {
    name: 'TD',
    value: 235,
  },
  {
    name: 'GI',
    value: 350,
  },
  {
    name: 'CL',
    value: 56,
  },
  {
    name: 'CF',
    value: 236,
  },
  {
    name: 'CN',
    value: 86,
  },
];

export default codes;
