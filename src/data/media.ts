import film1 from '@/assets/sln-film-1.webm.asset.json';
import film2 from '@/assets/sln-film-2.webm.asset.json';
import still1 from '@/assets/billboard-1.jpg.asset.json';
import still2 from '@/assets/billboard-2.jpg.asset.json';

export const adFormats = ['10 Seconds', '15 Seconds'];

export const mediaLocations = [
  {
    id: 'bilekahalli',
    number: '01',
    name: 'BILEKAHALLI SIGNAL',
    addressLines: ['Malabar Gold Point', 'Bannerghatta Main Road', 'Bengaluru, Karnataka'],
    video: film1.url,
    poster: still1.url,
    note: null as string | null,
    specs: [
      ['DISPLAY SIZE', '5760 mm × 5760 mm'],
      ['DISPLAY DIMENSION', '18.89 ft × 18.89 ft'],
      ['RESOLUTION', '1152 × 1152 px'],
      ['DAILY PLAYTIME', '15 HOURS'],
      ['MEDIA TYPE', 'P5 Outdoor SMD LED'],
      ['LAMP TECHNOLOGY', 'High-quality Kinglight Lamps'],
      ['AD FORMAT', '10 Seconds / 15 Seconds'],
    ],
  },
  {
    id: 'hommadevanahalli',
    number: '02',
    name: 'HOMMADEVANAHALLI',
    addressLines: ['Narayan Reddy Circle', 'Bus Stop', 'Bengaluru, Karnataka'],
    video: film2.url,
    poster: still2.url,
    // Values shown exactly as supplied by the media owner — do not convert.
    note: 'SPECIFICATIONS PROVIDED BY MEDIA OWNER',
    specs: [
      ['DISPLAY / SIZE INFORMATION', '30m × 30m · 900 × 900 sqft'],
      ['RESOLUTION', '18.89 ft × 18.89 ft'],
      ['DAILY PLAYTIME', '15 HOURS'],
      ['MEDIA TYPE', 'P5 Outdoor SMD LED'],
      ['LAMP TECHNOLOGY', 'High-quality Kinglight Lamps'],
      ['AD FORMAT', '10 Seconds / 15 Seconds'],
    ],
  },
];

export const nonLedMedia = {
  area: ['Bannerghatta Road', 'Bengaluru - 560083'],
  roadMedia: { measurement: '2.5 × 5', availability: 'All available road media locations' },
  unipoles: [
    { size: '30 × 30', sides: 'FRONT & BACK' },
    { size: '15 × 20', sides: 'FRONT & BACK' },
    { size: '50 × 50', sides: 'FRONT & BACK' },
    { size: '40 × 70', sides: 'FRONT & BACK' },
    { size: '25 × 70', sides: 'SINGLE SIDE' },
  ],
  holdings: [{ size: '30 × 30', availability: 'ALL' }],
};

export const services = [
  'HIGH-RESOLUTION P5 LED ADVERTISING BOARDS',
  'ROADSIDE ADVERTISING MEDIA',
  'UNIPOLE ADVERTISING BOARDS',
  'HOLDING ADVERTISING BOARDS',
  'OUTDOOR BILLBOARD / HOARDING MEDIA',
  'LARGE-FORMAT OUTDOOR ADVERTISING',
];
