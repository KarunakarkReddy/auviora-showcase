import film1 from '@/assets/sln-film-1.webm.asset.json';
const still1 = '/images/sln-main-live-pic.png';
export const adFormats = ['10 Seconds', '15 Seconds'];
export const mediaLocations = [
  {
    id: 'bilekahalli',
    number: '01',
    name: 'BILEKAHALLI SIGNAL',
    addressLines: ['Malabar Gold Point', 'Bannerghatta Main Road', 'Bengaluru, Karnataka'],
    video: film1.url,
    poster: still1,
    note: null as string | null,
    specs: [
      ['DISPLAY SIZE', '5760 mm × 5760 mm'],
      ['DISPLAY DIMENSION', '18.89 ft × 18.89 ft'],
      ['RESOLUTION', '1152 × 1152 px'],
      ['DAILY PLAYTIME', '13 - 15 HOURS'],
      ['MEDIA TYPE', 'P5 Outdoor SMD LED'],
      ['LAMP TECHNOLOGY', 'High-quality Kinglight Lamps'],
      ['AD FORMAT', '10 Seconds / 15 Seconds'],
    ],
  },
];

export const nonLedMedia = {
  area: ['Bannerghatta Road - 560083'],
  roadMedia: { measurement: '2.5 × 5', availability: 'All available road media locations' },
  unipoles: [
    { location: 'Bannerughatta road, begur road and electronic city road' },
  ],
  holdings: [{ size: '30 × 30', availability: 'ALL' }],
  outdoorBoardings: { size: '10 × 50' },
};

export const services = [
  'HIGH-RESOLUTION P5 LED ADVERTISING BOARDS',
  'ROADSIDE ADVERTISING MEDIA',
  'UNIPOLE ADVERTISING BOARDS',
  'HOLDING ADVERTISING BOARDS',
  'OUTDOOR BILLBOARD / HOARDING MEDIA',
  'LARGE-FORMAT OUTDOOR ADVERTISING',
];

export const upcomingLocations = ['SARJAPURA ROAD', 'KANKAPURA ROAD'];
