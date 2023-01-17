type Release = {
  date: string;
  version: string;
  changeLog: string[];
};

// Locate new release information at the top of array
const releases: Release[] = [
  {
    date: '31/10/2022',
    version: '1.3.0',
    changeLog: [
      'Add custom reusable Input component',
      'Add validation rules for our fields',
      'Create variables for give custom design',
      'Add mobile navigation bar',
      'Add Order success page to show after the order gets completed',
      'Create callApi module to centralise all our http requests',
      'Add firebase user-persistence logic to keep the user signed even in a new tab',
      'Add express server deployed with api',
      'Minor fixes and improvements',
    ],
  },
  {
    date: '15/10/2022',
    version: '1.2.0',
    changeLog: ['Add address book feature', 'Fix logo not working as link to homepage', 'Minor fixes and improvements'],
  },
  {
    date: '25/09/2022',
    version: '1.1.0',
    changeLog: [
      'Add profile page with user information',
      'Add shipping and payment pages for checkout',
      'Add About page with release information',
      'Redesign Login and Register forms',
      'Stability improvements and styles fixes',
    ],
  },
];

export default releases;
