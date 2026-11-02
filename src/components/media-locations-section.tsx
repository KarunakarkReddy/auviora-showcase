import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { companyData } from '@/data/company';
import { adFormats, mediaLocations, nonLedMedia, upcomingLocations } from '@/data/media';

type LocationStatus = 'OPERATIONAL' | 'INVENTORY · CONFIRM AVAILABILITY' | 'UPCOMING';

type LocationDetail = {
  id: string;
  title: string;
  area: string;
  format: string;
  status: LocationStatus;
  description: string;
  image: string | null;
  alt: string;
  specifications: [string, string][];
  mapUrl: string | null;
  whatsappUrl: string | null;
  enquiryMessage?: string;
};

const listedHoardingSizes: [string, string][] = nonLedMedia.Hoarding.map(({ size }) => [
  'LISTED HOARDING SIZE',
  `${size} (unit not specified)`,
]);

const nonLedLocationCards: LocationDetail[] = [
  {
    id: 'road-media',
    title: 'ROAD MEDIA',
    area: nonLedMedia.area.join(' · '),
    format: 'Roadside advertising',
    status: 'INVENTORY · CONFIRM AVAILABILITY',
    description:
      'Road media placements are listed for Bannerghatta Road. Confirm the specific site and current availability with our team.',
    image: '/images/road-media-live.JPG',
    alt: 'Road media advertising along Bannerghatta Road',
    specifications: [['LISTED MEASUREMENT', `${nonLedMedia.roadMedia.measurement} (unit not specified)`]],
    mapUrl: null,
    whatsappUrl: null,
    enquiryMessage:
      "Hi SLN Auviora Media, I'm interested in Road Media advertising on Bannerghatta Road, Bengaluru. Please share availability, pricing and campaign details.",
  },
  {
    id: 'unipoles-hoardings',
    title: 'UNIPOLES & HOARDINGS',
    area: 'Bannerghatta · Begur · Electronic City Roads',
    format: 'Unipole and hoarding media',
    status: 'INVENTORY · CONFIRM AVAILABILITY',
    description:
      'The current media listing names these Bengaluru road corridors. Individual site details, dimensions and availability are confirmed on enquiry.',
    image: '/images/unipole.JPG',
    alt: 'Unipole advertising boards along a road',
    specifications: [],
    mapUrl: null,
    whatsappUrl: null,
    enquiryMessage:
      "Hi, I'm interested in Unipole and Hoarding advertising across Bengaluru. Please share available locations, rates and booking details.",
  },
  {
    id: 'gantries',
    title: 'GANTRIES',
    area: 'Bannerghatta Road · Begur Road',
    format: 'Road-spanning outdoor media',
    status: 'INVENTORY · CONFIRM AVAILABILITY',
    description:
      'Gantry media is listed for these road corridors. Confirm the individual placement and current availability before booking.',
    image: '/images/gyantri1.JPG',
    alt: 'Outdoor advertising gantry',
    specifications: [],
    mapUrl: null,
    whatsappUrl: null,
    enquiryMessage:
      "Hi, I'm interested in Gantry advertising on Bannerghatta Road / Begur Road. Please share availability and pricing.",
  },
  {
    id: 'large-hoardings',
    title: 'LARGE OUTDOOR HOARDINGS',
    area: 'Electronic City Road · Bannerghatta Road',
    format: 'Large-format outdoor advertising',
    status: 'INVENTORY · CONFIRM AVAILABILITY',
    description:
      'Large-format hoarding opportunities are listed across these corridors. Site-specific dimensions and availability are confirmed on enquiry.',
    image: '/images/large-outdoor-hoardings1.jpg',
    alt: 'Large-format roadside advertising hoarding',
    specifications: listedHoardingSizes,
    mapUrl: null,
    whatsappUrl: null,
    enquiryMessage:
      "Hi, I'm interested in Large Outdoor Hoarding advertising near Electronic City Road / Bannerghatta Road. Please share details and pricing.",
  },
  {
    id: 'mobile-billboards',
    title: 'MOBILE BILLBOARDS',
    area: 'Bengaluru',
    format: 'Elevated and static mobile billboards',
    status: 'INVENTORY · CONFIRM AVAILABILITY',
    description:
      'Elevated and static mobile billboard formats are included in the current media portfolio. Ask the team about campaign routes and availability.',
    image: '/images/mobile_billboards.jpg',
    alt: 'Elevated mobile billboard advertising in Bengaluru',
    specifications: [],
    mapUrl: null,
    whatsappUrl: null,
    enquiryMessage:
      "Hi, I'm interested in Mobile Billboard advertising in Bengaluru. Please share packages, availability and pricing.",
  },
];

const upcomingLocationCards: LocationDetail[] = upcomingLocations.map((name, index) => ({
  id: `upcoming-${index}`,
  title: name,
  area: name,
  format: 'Planned outdoor media location',
  status: 'UPCOMING',
  description:
    'This location is upcoming and is not being presented as operational advertising inventory.',
  image: null,
  alt: '',
  specifications: [],
  mapUrl: null,
  whatsappUrl: null,
}));

export function MediaLocationsSection() {
  const [selectedLocation, setSelectedLocation] = useState<LocationDetail | null>(null);
  const reducedMotion = useReducedMotion();
  const getLocationWhatsAppUrl = (message: string) => {
    const url = new URL(companyData.whatsapp);
    url.searchParams.set('text', message);
    return url.toString();
  };
  const getRevealProps = (index: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.14 },
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      delay: reducedMotion ? 0 : (index % 3) * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      id="media"
      className="media media-network"
      aria-labelledby="media-network-heading"
    >
      <div className="section-pad media-network-inner">
        <header className="media-network-heading">
          <span className="eyebrow">04 / OUR MEDIA NETWORK</span>
          <div className="media-network-heading-row">
            <h2 className="display" id="media-network-heading">
              YOUR BRAND.<br />
              <em>THE RIGHT LOCATION.</em>
            </h2>
            <p>
              Discover strategic outdoor advertising opportunities across Bengaluru and put your
              brand in front of the right audience.
            </p>
          </div>
        </header>

        <div className="media-network-grid">
          {mediaLocations.map((location, index) => {
            const detailSpecifications: [string, string][] = location.specs.map(([label, value]) => [
              label,
              label === 'DAILY PLAYTIME'
                ? `${value} · subject to the confirmed operating schedule`
                : label === 'AD FORMAT'
                  ? adFormats.join(' / ')
                  : value,
            ]);
            detailSpecifications.push(
              [
                'PUBLISHED DAILY SESSIONS',
                '7:00 AM–1:00 PM and 2:00 PM–11:00 PM; confirm the current schedule',
              ],
              ['PLAYBACK FREQUENCY', 'Approximately once every minute'],
            );
            const detail: LocationDetail = {
              id: location.id,
              title: location.name,
              area: location.addressLines.join(' · '),
              format: 'P5 Outdoor SMD LED',
              status: 'OPERATIONAL',
              description:
                'High-resolution outdoor LED advertising at the Bilekahalli Signal. Confirm the current operating schedule and campaign availability with our team.',
              image: location.poster,
              alt: 'SLN Auviora Media LED billboard at Bilekahalli Signal',
              specifications: detailSpecifications,
              mapUrl: location.mapUrl,
              whatsappUrl: getLocationWhatsAppUrl(location.enquiryMessage),
            };
            const cardSpecifications = detailSpecifications.filter(([label]) =>
              ['DISPLAY SIZE', 'RESOLUTION', 'DAILY PLAYTIME', 'AD FORMAT'].includes(label),
            );

            return (
              <article
                className="media-featured-card"
                id={index === 0 ? 'locations' : undefined}
                key={location.id}
              >
                <motion.button
                  {...getRevealProps(index)}
                  type="button"
                  className="media-featured-visual"
                  onClick={() => setSelectedLocation(detail)}
                  aria-label={`View specifications for ${location.name}`}
                >
                  <img src={location.poster} alt="" loading="lazy" decoding="async" />
                  <span className="media-location-status media-location-status--operational">
                    <span />
                    OPERATIONAL LOCATION
                  </span>
                  <span className="media-featured-caption">
                    <span>01 / FEATURED LED LOCATION</span>
                    <strong>{location.name}</strong>
                    <span>{location.addressLines.join(' · ')}</span>
                  </span>
                  <span className="media-featured-view">
                    VIEW LOCATION DETAILS <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </motion.button>

                <motion.div {...getRevealProps(index + 1)} className="media-featured-information">
                  <span className="media-network-kicker">
                    <MapPin size={14} aria-hidden="true" /> BENGALURU, KARNATAKA
                  </span>
                  <h3>{location.name}</h3>
                  <p className="media-featured-address">{location.addressLines.join(', ')}</p>
                  <p className="media-featured-summary">
                    A high-visibility P5 LED placement at Bilekahalli Signal, positioned to bring
                    outdoor campaigns into the everyday flow of Bannerghatta Main Road.
                  </p>

                  <dl className="media-featured-specs">
                    {cardSpecifications.map(([label, value]) => (
                      <div key={label}>
                        <dt>
                          {label === 'DAILY PLAYTIME'
                            ? 'DAILY DISPLAY TIME'
                            : label === 'AD FORMAT'
                              ? 'AD DURATION'
                              : label}
                        </dt>
                        <dd>
                          {value}
                        </dd>
                      </div>
                    ))}
                    <div>
                      <dt>TECHNOLOGY</dt>
                      <dd>{detail.format}</dd>
                    </div>
                  </dl>

                  <div className="media-featured-actions">
                    <a className="media-network-quote" href="#contact">
                      GET A MEDIA QUOTE <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    {location.mapUrl && (
                      <a
                        className="media-google-maps-button"
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 48 48" aria-hidden="true">
                          <defs>
                            <clipPath id="google-maps-pin-featured">
                              <path d="M24 2C14.6 2 7 9.6 7 19c0 12.2 17 27 17 27s17-14.8 17-27C41 9.6 33.4 2 24 2Z" />
                            </clipPath>
                          </defs>
                          <g clipPath="url(#google-maps-pin-featured)">
                            <path fill="#4285F4" d="M0 0h24v48H0z" />
                            <path fill="#34A853" d="M24 24h24v24H24z" />
                            <path fill="#FBBC04" d="M24 0h24v24H24z" />
                            <path fill="#EA4335" d="M24 0h-4v18h28V0z" />
                          </g>
                          <circle cx="24" cy="19" r="7" fill="#fff" />
                        </svg>
                        <span>OPEN IN GOOGLE MAPS</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>

        <div className="media-network-inventory">
          <div className="media-network-subheading">
            <div>
              <span className="eyebrow">NON-LED OUTDOOR MEDIA</span>
              <h3 className="display">
                MORE WAYS<br />
                <em>TO BE SEEN.</em>
              </h3>
            </div>
            <p>
              Explore the non-LED formats and road corridors listed in our media portfolio.
              Specific sites and current availability are confirmed on enquiry.
            </p>
          </div>
          <div className="media-location-grid">
            {nonLedLocationCards.map((location, index) => (
              <motion.button
                {...getRevealProps(index + 2)}
                type="button"
                className={`media-location-card media-location-card--${index + 1}`}
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                aria-label={`View ${location.title} information for ${location.area}`}
              >
                {location.image && (
                  <img src={location.image} alt="" loading="lazy" decoding="async" />
                )}
                <span className="media-location-card-shade" aria-hidden="true" />
                <span className="media-location-status">
                  <span />
                  AVAILABILITY BY ENQUIRY
                </span>
                <span className="media-location-card-copy">
                  <span className="media-location-format">{location.format}</span>
                  <strong>{location.title}</strong>
                  <span className="media-location-area">
                    <MapPin size={13} aria-hidden="true" />
                    {location.area}
                  </span>
                </span>
                <span className="media-location-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="media-network-upcoming">
          <div>
            <span className="eyebrow">PLANNED NETWORK EXPANSION</span>
            <h3 className="display">
              COMING <em>UP NEXT.</em>
            </h3>
            <p>These locations are upcoming and are not represented as operational inventory.</p>
          </div>
          <div className="media-upcoming-cards">
            {upcomingLocationCards.map((location, index) => (
              <motion.button
                {...getRevealProps(index + 7)}
                type="button"
                className="media-upcoming-card"
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                aria-label={`${location.title}, upcoming media location. View details.`}
              >
                <span className="media-upcoming-mark" aria-hidden="true">
                  <MapPin size={20} />
                </span>
                <span className="media-upcoming-label">UPCOMING</span>
                <strong>{location.title}</strong>
                <span className="media-upcoming-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div {...getRevealProps(9)} className="media-network-cta">
          <span className="media-network-kicker">PLAN YOUR NEXT CAMPAIGN</span>
          <h3 className="display">
            FIND YOUR NEXT<br />
            <em>ADVERTISING LOCATION.</em>
          </h3>
          <p>
            Explore our media opportunities and find the right outdoor advertising space for your
            brand.
          </p>
          <a className="media-network-quote" href="#contact">
            ENQUIRE NOW <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <Dialog
        open={selectedLocation !== null}
        onOpenChange={open => {
          if (!open) setSelectedLocation(null);
        }}
      >
        <DialogContent className="media-location-dialog">
          {selectedLocation && (
            <>
              {selectedLocation.image ? (
                <img
                  className="media-location-dialog-image"
                  src={selectedLocation.image}
                  alt={selectedLocation.alt}
                />
              ) : (
                <div className="media-location-dialog-upcoming" aria-hidden="true">
                  <MapPin size={28} />
                </div>
              )}
              <div className="media-location-dialog-content">
                <span
                  className={`media-location-dialog-status${selectedLocation.status === 'OPERATIONAL' ? ' is-operational' : selectedLocation.status === 'UPCOMING' ? ' is-upcoming' : ''}`}
                >
                  {selectedLocation.status}
                </span>
                <DialogTitle className="media-location-dialog-title">
                  {selectedLocation.title}
                </DialogTitle>
                <DialogDescription className="media-location-dialog-description">
                  <MapPin size={14} aria-hidden="true" /> {selectedLocation.area}
                </DialogDescription>
                <p className="media-location-dialog-copy">{selectedLocation.description}</p>
                <dl className="media-location-dialog-specs">
                  <div>
                    <dt>MEDIA FORMAT</dt>
                    <dd>{selectedLocation.format}</dd>
                  </div>
                  {selectedLocation.specifications.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="media-location-dialog-actions">
                  <DialogClose asChild>
                    <a
                      className="media-network-quote"
                      href={
                        selectedLocation.enquiryMessage
                          ? getLocationWhatsAppUrl(selectedLocation.enquiryMessage)
                          : '#contact'
                      }
                      target={selectedLocation.enquiryMessage ? '_blank' : undefined}
                      rel={selectedLocation.enquiryMessage ? 'noopener noreferrer' : undefined}
                    >
                      {selectedLocation.status === 'UPCOMING'
                        ? 'ENQUIRE ABOUT FUTURE LOCATIONS'
                        : selectedLocation.status === 'OPERATIONAL'
                          ? 'GET A MEDIA QUOTE'
                          : 'ASK ABOUT AVAILABILITY'}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </DialogClose>
                  {selectedLocation.mapUrl && (
                    <a
                      className="media-google-maps-button"
                      href={selectedLocation.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 48 48" aria-hidden="true">
                        <defs>
                          <clipPath id="google-maps-pin-dialog">
                            <path d="M24 2C14.6 2 7 9.6 7 19c0 12.2 17 27 17 27s17-14.8 17-27C41 9.6 33.4 2 24 2Z" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#google-maps-pin-dialog)">
                          <path fill="#4285F4" d="M0 0h24v48H0z" />
                          <path fill="#34A853" d="M24 24h24v24H24z" />
                          <path fill="#FBBC04" d="M24 0h24v24H24z" />
                          <path fill="#EA4335" d="M24 0h-4v18h28V0z" />
                        </g>
                        <circle cx="24" cy="19" r="7" fill="#fff" />
                      </svg>
                      <span>OPEN IN GOOGLE MAPS</span>
                    </a>
                  )}
                  {selectedLocation.whatsappUrl && (
                    <a
                      className="media-network-text-link"
                      href={selectedLocation.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WHATSAPP <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
