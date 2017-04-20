const CHECKOUT_BILLING = {
  formTitle: 'Billing Address',
  formSubtitle: 'Set the billing address',
  buttonText: 'Proceed',
  bottomButtonText: 'Use a different address'
};

const CHECKOUT_SHIPPING = {
  formTitle: 'Shipping Address',
  formSubtitle: 'Set the shipping address',
  buttonText: 'Proceed',
  bottomButtonText: 'Use a different address'
};

const CHECKOUT_BILLING_FIELDS = [
  {
    name: 'firstname',
    label: 'First Name',
    required: true,
    className: 'inputleft',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'firstname'
  },
  {
    name: 'lastname',
    label: 'Last Name',
    required: true,
    className: 'inputright',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'lastname'
  },
  {
    name: 'company',
    label: 'Company Name',
    required: false,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'company'
  },
  {
    name: 'email',
    label: 'Email Address',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    required: true,
    className: '',
    isInput: true,
    type: 'tel',
    placeholder: '',
    disabled: false,
    value: 'phone'
  },
  {
    name: 'country',
    label: 'Country',
    required: true,
    className: '',
    isStatic: true,
    value: ' United States (US)'
  },
  {
    name: 'address1',
    label: 'Address',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: 'Street address',
    disabled: false,
    value: 'address1'
  },
  {
    name: 'address2',
    label: '',
    required: false,
    className: 'inputmtneg15',
    isInput: true,
    type: 'text',
    placeholder: 'Apartment, suite, unit etc. (optional)',
    disabled: false,
    value: 'address2'
  },
  {
    name: 'city',
    label: 'Town / City',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'city'
  },
  {
    name: 'state',
    label: 'state',
    required: true,
    className: 'inputleft',
    selectClass: 'checkoutselect',
    isSelect: true,
    type: 'text',
    value: 'state',
    options: 'options'
  },
  {
    name: 'zipcode',
    label: 'Zip',
    required: true,
    className: 'inputright',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'zipcode'
  }
];

const CHECKOUT_SHIPPING_FIELDS = [
  {
    name: 'firstname',
    label: 'First Name',
    required: true,
    className: 'inputleft',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'firstname'
  },
  {
    name: 'lastname',
    label: 'Last Name',
    required: true,
    className: 'inputright',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'lastname'
  },
  {
    name: 'company',
    label: 'Company Name',
    required: false,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'company'
  },
  {
    name: 'email',
    label: 'Email Address',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: true,
    value: 'email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    required: true,
    className: '',
    isInput: true,
    type: 'tel',
    placeholder: '',
    disabled: false,
    value: 'phone'
  },
  {
    name: 'country',
    label: 'Country',
    required: true,
    className: '',
    isStatic: true,
    value: ' United States (US)'
  },
  {
    name: 'address1',
    label: 'Address',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: 'Street address',
    disabled: false,
    value: 'address1'
  },
  {
    name: 'address2',
    label: '',
    required: false,
    className: 'inputmtneg15',
    isInput: true,
    type: 'text',
    placeholder: 'Apartment, suite, unit etc. (optional)',
    disabled: false,
    value: 'address2'
  },
  {
    name: 'city',
    label: 'Town / City',
    required: true,
    className: '',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'city'
  },
  {
    name: 'state',
    label: 'state',
    required: true,
    className: 'inputleft',
    selectClass: 'checkoutselect',
    isSelect: true,
    type: 'text',
    value: 'state',
    options: 'options'
  },
  {
    name: 'zipcode',
    label: 'Zip',
    required: true,
    className: 'inputright',
    isInput: true,
    type: 'text',
    placeholder: '',
    disabled: false,
    value: 'zipcode'
  }
];

const STATES = [
  {
    id: 3525,
    name: 'Alabama',
    abbr: 'AL',
    country_id: 232
  },
  {
    id: 3524,
    name: 'Alaska',
    abbr: 'AK',
    country_id: 232
  },
  {
    id: 3527,
    name: 'American Samoa',
    abbr: 'AS',
    country_id: 232
  },
  {
    id: 3528,
    name: 'Arizona',
    abbr: 'AZ',
    country_id: 232
  },
  {
    id: 3526,
    name: 'Arkansas',
    abbr: 'AR',
    country_id: 232
  },
  {
    id: 3582,
    name: 'Armed Forces Africa, Canada, Europe, Middle East',
    abbr: 'AE',
    country_id: 232
  },
  {
    id: 3581,
    name: 'Armed Forces Americas (except Canada)',
    abbr: 'AA',
    country_id: 232
  },
  {
    id: 3583,
    name: 'Armed Forces Pacific',
    abbr: 'AP',
    country_id: 232
  },
  {
    id: 3529,
    name: 'California',
    abbr: 'CA',
    country_id: 232
  },
  {
    id: 3530,
    name: 'Colorado',
    abbr: 'CO',
    country_id: 232
  },
  {
    id: 3531,
    name: 'Connecticut',
    abbr: 'CT',
    country_id: 232
  },
  {
    id: 3533,
    name: 'Delaware',
    abbr: 'DE',
    country_id: 232
  },
  {
    id: 3532,
    name: 'District of Columbia',
    abbr: 'DC',
    country_id: 232
  },
  {
    id: 3534,
    name: 'Florida',
    abbr: 'FL',
    country_id: 232
  },
  {
    id: 3535,
    name: 'Georgia',
    abbr: 'GA',
    country_id: 232
  },
  {
    id: 3536,
    name: 'Guam',
    abbr: 'GU',
    country_id: 232
  },
  {
    id: 3537,
    name: 'Hawaii',
    abbr: 'HI',
    country_id: 232
  },
  {
    id: 3539,
    name: 'Idaho',
    abbr: 'ID',
    country_id: 232
  },
  {
    id: 3540,
    name: 'Illinois',
    abbr: 'IL',
    country_id: 232
  },
  {
    id: 3541,
    name: 'Indiana',
    abbr: 'IN',
    country_id: 232
  },
  {
    id: 3538,
    name: 'Iowa',
    abbr: 'IA',
    country_id: 232
  },
  {
    id: 3542,
    name: 'Kansas',
    abbr: 'KS',
    country_id: 232
  },
  {
    id: 3543,
    name: 'Kentucky',
    abbr: 'KY',
    country_id: 232
  },
  {
    id: 3544,
    name: 'Louisiana',
    abbr: 'LA',
    country_id: 232
  },
  {
    id: 3547,
    name: 'Maine',
    abbr: 'ME',
    country_id: 232
  },
  {
    id: 3546,
    name: 'Maryland',
    abbr: 'MD',
    country_id: 232
  },
  {
    id: 3545,
    name: 'Massachusetts',
    abbr: 'MA',
    country_id: 232
  },
  {
    id: 3548,
    name: 'Michigan',
    abbr: 'MI',
    country_id: 232
  },
  {
    id: 3549,
    name: 'Minnesota',
    abbr: 'MN',
    country_id: 232
  },
  {
    id: 3552,
    name: 'Mississippi',
    abbr: 'MS',
    country_id: 232
  },
  {
    id: 3550,
    name: 'Missouri',
    abbr: 'MO',
    country_id: 232
  },
  {
    id: 3553,
    name: 'Montana',
    abbr: 'MT',
    country_id: 232
  },
  {
    id: 3556,
    name: 'Nebraska',
    abbr: 'NE',
    country_id: 232
  },
  {
    id: 3560,
    name: 'Nevada',
    abbr: 'NV',
    country_id: 232
  },
  {
    id: 3557,
    name: 'New Hampshire',
    abbr: 'NH',
    country_id: 232
  },
  {
    id: 3558,
    name: 'New Jersey',
    abbr: 'NJ',
    country_id: 232
  },
  {
    id: 3559,
    name: 'New Mexico',
    abbr: 'NM',
    country_id: 232
  },
  {
    id: 3561,
    name: 'New York',
    abbr: 'NY',
    country_id: 232
  },
  {
    id: 3554,
    name: 'North Carolina',
    abbr: 'NC',
    country_id: 232
  },
  {
    id: 3555,
    name: 'North Dakota',
    abbr: 'ND',
    country_id: 232
  },
  {
    id: 3551,
    name: 'Northern Mariana Islands',
    abbr: 'MP',
    country_id: 232
  },
  {
    id: 3562,
    name: 'Ohio',
    abbr: 'OH',
    country_id: 232
  },
  {
    id: 3563,
    name: 'Oklahoma',
    abbr: 'OK',
    country_id: 232
  },
  {
    id: 3564,
    name: 'Oregon',
    abbr: 'OR',
    country_id: 232
  },
  {
    id: 3565,
    name: 'Pennsylvania',
    abbr: 'PA',
    country_id: 232
  },
  {
    id: 3566,
    name: 'Puerto Rico',
    abbr: 'PR',
    country_id: 232
  },
  {
    id: 3567,
    name: 'Rhode Island',
    abbr: 'RI',
    country_id: 232
  },
  {
    id: 3568,
    name: 'South Carolina',
    abbr: 'SC',
    country_id: 232
  },
  {
    id: 3569,
    name: 'South Dakota',
    abbr: 'SD',
    country_id: 232
  },
  {
    id: 3570,
    name: 'Tennessee',
    abbr: 'TN',
    country_id: 232
  },
  {
    id: 3571,
    name: 'Texas',
    abbr: 'TX',
    country_id: 232
  },
  {
    id: 3572,
    name: 'United States Minor Outlying Islands',
    abbr: 'UM',
    country_id: 232
  },
  {
    id: 3573,
    name: 'Utah',
    abbr: 'UT',
    country_id: 232
  },
  {
    id: 3576,
    name: 'Vermont',
    abbr: 'VT',
    country_id: 232
  },
  {
    id: 3575,
    name: 'Virgin Islands',
    abbr: 'VI',
    country_id: 232
  },
  {
    id: 3574,
    name: 'Virginia',
    abbr: 'VA',
    country_id: 232
  },
  {
    id: 3577,
    name: 'Washington',
    abbr: 'WA',
    country_id: 232
  },
  {
    id: 3579,
    name: 'West Virginia',
    abbr: 'WV',
    country_id: 232
  },
  {
    id: 3578,
    name: 'Wisconsin',
    abbr: 'WI',
    country_id: 232
  },
  {
    id: 3580,
    name: 'Wyoming',
    abbr: 'WY',
    country_id: 232
  }
];

export {
  CHECKOUT_BILLING_FIELDS,
  CHECKOUT_SHIPPING_FIELDS,
  CHECKOUT_BILLING,
  CHECKOUT_SHIPPING,
  STATES
};
