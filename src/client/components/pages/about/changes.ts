type Release = {
  date: string;
  version: string;
  changeLog: string[];
};

// Locate new release information at the top of array
const releases: Release[] = [
  {
    date: '19/03/2023',
    version: '1.4.0',
    changeLog: [
      'Improve express server and api',
      'Add endpoints and resolvers for entities (User-Basket-Product-Address)',
      'Migrate old main logic into the server side',
      'Add internationalization',
      'Add PDP (Product Details Page)',
      'Add Infinite scroll in PLP (Product List Page)',
      'Minor fixes and improvements',
    ],
  },
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
