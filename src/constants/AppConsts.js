const NAV = [
  {
    title: 'Shop',
    slug: '/',
    isActive: false,
  },
  {
    title: 'Education',
    slug: '/product/mentoring-program-day',
    isActive: false,
  },
  {
    title: 'Biography',
    slug: '/biography',
    isActive: false,
  },
  {
    title: 'My Account',
    slug: '/my-account',
    isActive: false,
  },
  {
    title: 'Contact',
    slug: '/contact',
    isActive: false,
  },
];

const SOCIAL_NAV = [
  {
    name: 'Facebook',
    title: 'Join us on Facebook',
    url: 'https://www.facebook.com/krissorbieLLC/',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    title: 'Join us on Instagram',
    url: 'https://www.instagram.com/krissorbie/',
    icon: 'instagram',
  },
  {
    name: 'Twitter',
    title: 'Join us on Twitter',
    url: 'https://twitter.com/krissorbie',
    icon: 'twitter',
  },
  {
    name: 'Pinterest',
    title: 'Join us on Pinterest',
    url: 'https://in.pinterest.com/krissorbie/',
    icon: 'pinterest',
  },
  {
    name: 'Linkedin',
    title: 'Join us on Linkedin',
    url: 'https://www.linkedin.com/in/kris-sorbie-26718b7',
    icon: 'linkedin',
  },
];

const SHIPPING_STATES = [
  {
    name: 'Select an option',
    value: '',
  },
  {
    name: 'Alabama',
    value: 'AL',
  },
  {
    name: 'Alaska',
    value: 'AK',
  },
  {
    name: 'Arizona',
    value: 'AZ',
  },
  {
    name: 'Arkansas',
    value: 'AR',
  },
  {
    name: 'California',
    value: 'CA',
  },
  {
    name: 'Colorado',
    value: 'CO',
  },
  {
    name: 'Colorado',
    value: 'CO',
  },
  {
    name: 'Conneticut',
    value: 'CT',
  },
  {
    name: 'Delaware',
    value: 'DE',
  },
  {
    name: 'District Of Columbia',
    value: 'DC',
  },
  {
    name: 'Florida',
    value: 'FL',
  },
  {
    name: 'Georgia',
    value: 'GA',
  },
  {
    name: 'Hawaii',
    value: 'HI',
  },
  {
    name: 'Idaho',
    value: 'ID',
  },
  {
    name: 'Illinois',
    value: 'IL',
  },
  {
    name: 'Indiana',
    value: 'IN',
  },
  {
    name: 'Iowa',
    value: 'IA',
  },
  {
    name: 'Kansas',
    value: 'KS',
  },
  {
    name: 'Kentuchy',
    value: 'KY',
  },
  {
    name: 'Louisiana',
    value: 'LA',
  },
  {
    name: 'Maine',
    value: 'ME',
  },
  {
    name: 'Maryland',
    value: 'MD',
  },
  {
    name: 'Massachusetts',
    value: 'MA',
  },
  {
    name: 'Michigan',
    value: 'MI',
  },
  {
    name: 'Minnesota',
    value: 'MN',
  },
  {
    name: 'Mississippi',
    value: 'MS',
  },
  {
    name: 'Missouri',
    value: 'MO',
  },
  {
    name: 'Montana',
    value: 'MT',
  },
  {
    name: 'Nebraska',
    value: 'NE',
  },
  {
    name: 'Nevada',
    value: 'NV',
  },
  {
    name: 'New Hampshire',
    value: 'NH',
  },
  {
    name: 'New Jersey',
    value: 'NJ',
  },
  {
    name: 'New Mexico',
    value: 'NM',
  },
  {
    name: 'New York',
    value: 'NY',
  },
  {
    name: 'North Carolina',
    value: 'NC',
  },
  {
    name: 'North Dakota',
    value: 'ND',
  },
  {
    name: 'Ohio',
    value: 'OH',
  },
  {
    name: 'Oklahoma',
    value: 'OK',
  },
  {
    name: 'Oregon',
    value: 'OR',
  },
  {
    name: 'Pennsylvania',
    value: 'PA',
  },
  {
    name: 'Rhode Island',
    value: 'RI',
  },
  {
    name: 'South Carolina',
    value: 'SC',
  },
  {
    name: 'South Dakota',
    value: 'SD',
  },
  {
    name: 'Tennessee',
    value: 'TN',
  },
  {
    name: 'Texas',
    value: 'TX',
  },
  {
    name: 'Utah',
    value: 'UT',
  },
  {
    name: 'Vermont',
    value: 'VT',
  },
  {
    name: 'Virginia',
    value: 'VA',
  },
  {
    name: 'Washington',
    value: 'WA',
  },
  {
    name: 'West Virginia',
    value: 'WV',
  },
  {
    name: 'Wisconsin',
    value: 'WI',
  },
  {
    name: 'Wyoming',
    value: 'WY',
  },
  {
    name: 'Armed Forces (AA)',
    value: 'AA',
  },
  {
    name: 'Armed Forces (AE)',
    value: 'AE',
  },
  {
    name: 'Armed Forces (AP)',
    value: 'AP',
  },
  {
    name: 'America Samoa',
    value: 'AS',
  },
  {
    name: 'Guam',
    value: 'GU',
  },
  {
    name: 'Northern Mariana Islands',
    value: 'NM',
  },
  {
    name: 'Puerto Rico',
    value: 'PR',
  },
  {
    name: 'US Minor Outlying Islands',
    value: 'UM',
  },
  {
    name: 'US Virgin Islands',
    value: 'VI',
  },
];

const STATES = [
  {
    id: 3525,
    name: 'Alabama',
    abbr: 'AL',
    country_id: 232,
  },
  {
    id: 3524,
    name: 'Alaska',
    abbr: 'AK',
    country_id: 232,
  },
  {
    id: 3527,
    name: 'American Samoa',
    abbr: 'AS',
    country_id: 232,
  },
  {
    id: 3528,
    name: 'Arizona',
    abbr: 'AZ',
    country_id: 232,
  },
  {
    id: 3526,
    name: 'Arkansas',
    abbr: 'AR',
    country_id: 232,
  },
  {
    id: 3582,
    name: 'Armed Forces Africa, Canada, Europe, Middle East',
    abbr: 'AE',
    country_id: 232,
  },
  {
    id: 3581,
    name: 'Armed Forces Americas (except Canada)',
    abbr: 'AA',
    country_id: 232,
  },
  {
    id: 3583,
    name: 'Armed Forces Pacific',
    abbr: 'AP',
    country_id: 232,
  },
  {
    id: 3529,
    name: 'California',
    abbr: 'CA',
    country_id: 232,
  },
  {
    id: 3530,
    name: 'Colorado',
    abbr: 'CO',
    country_id: 232,
  },
  {
    id: 3531,
    name: 'Connecticut',
    abbr: 'CT',
    country_id: 232,
  },
  {
    id: 3533,
    name: 'Delaware',
    abbr: 'DE',
    country_id: 232,
  },
  {
    id: 3532,
    name: 'District of Columbia',
    abbr: 'DC',
    country_id: 232,
  },
  {
    id: 3534,
    name: 'Florida',
    abbr: 'FL',
    country_id: 232,
  },
  {
    id: 3535,
    name: 'Georgia',
    abbr: 'GA',
    country_id: 232,
  },
  {
    id: 3536,
    name: 'Guam',
    abbr: 'GU',
    country_id: 232,
  },
  {
    id: 3537,
    name: 'Hawaii',
    abbr: 'HI',
    country_id: 232,
  },
  {
    id: 3539,
    name: 'Idaho',
    abbr: 'ID',
    country_id: 232,
  },
  {
    id: 3540,
    name: 'Illinois',
    abbr: 'IL',
    country_id: 232,
  },
  {
    id: 3541,
    name: 'Indiana',
    abbr: 'IN',
    country_id: 232,
  },
  {
    id: 3538,
    name: 'Iowa',
    abbr: 'IA',
    country_id: 232,
  },
  {
    id: 3542,
    name: 'Kansas',
    abbr: 'KS',
    country_id: 232,
  },
  {
    id: 3543,
    name: 'Kentucky',
    abbr: 'KY',
    country_id: 232,
  },
  {
    id: 3544,
    name: 'Louisiana',
    abbr: 'LA',
    country_id: 232,
  },
  {
    id: 3547,
    name: 'Maine',
    abbr: 'ME',
    country_id: 232,
  },
  {
    id: 3546,
    name: 'Maryland',
    abbr: 'MD',
    country_id: 232,
  },
  {
    id: 3545,
    name: 'Massachusetts',
    abbr: 'MA',
    country_id: 232,
  },
  {
    id: 3548,
    name: 'Michigan',
    abbr: 'MI',
    country_id: 232,
  },
  {
    id: 3549,
    name: 'Minnesota',
    abbr: 'MN',
    country_id: 232,
  },
  {
    id: 3552,
    name: 'Mississippi',
    abbr: 'MS',
    country_id: 232,
  },
  {
    id: 3550,
    name: 'Missouri',
    abbr: 'MO',
    country_id: 232,
  },
  {
    id: 3553,
    name: 'Montana',
    abbr: 'MT',
    country_id: 232,
  },
  {
    id: 3556,
    name: 'Nebraska',
    abbr: 'NE',
    country_id: 232,
  },
  {
    id: 3560,
    name: 'Nevada',
    abbr: 'NV',
    country_id: 232,
  },
  {
    id: 3557,
    name: 'New Hampshire',
    abbr: 'NH',
    country_id: 232,
  },
  {
    id: 3558,
    name: 'New Jersey',
    abbr: 'NJ',
    country_id: 232,
  },
  {
    id: 3559,
    name: 'New Mexico',
    abbr: 'NM',
    country_id: 232,
  },
  {
    id: 3561,
    name: 'New York',
    abbr: 'NY',
    country_id: 232,
  },
  {
    id: 3554,
    name: 'North Carolina',
    abbr: 'NC',
    country_id: 232,
  },
  {
    id: 3555,
    name: 'North Dakota',
    abbr: 'ND',
    country_id: 232,
  },
  {
    id: 3551,
    name: 'Northern Mariana Islands',
    abbr: 'MP',
    country_id: 232,
  },
  {
    id: 3562,
    name: 'Ohio',
    abbr: 'OH',
    country_id: 232,
  },
  {
    id: 3563,
    name: 'Oklahoma',
    abbr: 'OK',
    country_id: 232,
  },
  {
    id: 3564,
    name: 'Oregon',
    abbr: 'OR',
    country_id: 232,
  },
  {
    id: 3565,
    name: 'Pennsylvania',
    abbr: 'PA',
    country_id: 232,
  },
  {
    id: 3566,
    name: 'Puerto Rico',
    abbr: 'PR',
    country_id: 232,
  },
  {
    id: 3567,
    name: 'Rhode Island',
    abbr: 'RI',
    country_id: 232,
  },
  {
    id: 3568,
    name: 'South Carolina',
    abbr: 'SC',
    country_id: 232,
  },
  {
    id: 3569,
    name: 'South Dakota',
    abbr: 'SD',
    country_id: 232,
  },
  {
    id: 3570,
    name: 'Tennessee',
    abbr: 'TN',
    country_id: 232,
  },
  {
    id: 3571,
    name: 'Texas',
    abbr: 'TX',
    country_id: 232,
  },
  {
    id: 3572,
    name: 'United States Minor Outlying Islands',
    abbr: 'UM',
    country_id: 232,
  },
  {
    id: 3573,
    name: 'Utah',
    abbr: 'UT',
    country_id: 232,
  },
  {
    id: 3576,
    name: 'Vermont',
    abbr: 'VT',
    country_id: 232,
  },
  {
    id: 3575,
    name: 'Virgin Islands',
    abbr: 'VI',
    country_id: 232,
  },
  {
    id: 3574,
    name: 'Virginia',
    abbr: 'VA',
    country_id: 232,
  },
  {
    id: 3577,
    name: 'Washington',
    abbr: 'WA',
    country_id: 232,
  },
  {
    id: 3579,
    name: 'West Virginia',
    abbr: 'WV',
    country_id: 232,
  },
  {
    id: 3578,
    name: 'Wisconsin',
    abbr: 'WI',
    country_id: 232,
  },
  {
    id: 3580,
    name: 'Wyoming',
    abbr: 'WY',
    country_id: 232,
  },
];

export { NAV, SOCIAL_NAV, SHIPPING_STATES, STATES };
