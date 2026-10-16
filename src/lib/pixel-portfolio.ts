import celebration from '@/assets/pixel-IMG_5556.jpg.asset.json';
import arrival from '@/assets/pixel-IMG_5558.jpg.asset.json';
import gathering from '@/assets/pixel-IMG_6831.jpg.asset.json';
import photographer from '@/assets/pixel-IMG_6807.jpg.asset.json';
import guests from '@/assets/pixel-IMG_6789.jpg.asset.json';
import catering from '@/assets/pixel-IMG_6788.jpg.asset.json';
import reception from '@/assets/pixel-IMG_6781.jpg.asset.json';
import table from '@/assets/pixel-IMG_6778.jpg.asset.json';
import company from '@/assets/pixel-IMG_6777.jpg.asset.json';
import livestream from '@/assets/pixel-livestream.png.asset.json';

const photo = (image: { url: string }, caption: string, width = 1920, height = 1280) => ({ src: image.url, caption, width, height });
export const portfolio = [
  { id: 'live-production', title: 'Live production', category: 'Livestreaming', medium: 'Broadcast setup', summary: 'A closer look at the live production desk, screens and broadcast controls.', focus: 'Production desk · monitoring · live feed', images: [photo(livestream, 'Livestream production desk with broadcast screens and controls.', 1448, 1086)] },
  { id: 'celebration-arrivals', title: 'Celebration & arrivals', category: 'Events', medium: 'Photography', summary: 'Decorated arrivals and the people gathered around them, captured in a collection of celebration photographs.', focus: 'Arrivals · decorations · candid moments', images: [photo(celebration, 'Friends and family beside a car decorated with gold and black balloons.'), photo(arrival, 'Guests gathered around a red car decorated with a gold ribbon.')] },
  { id: 'reception-details', title: 'Reception details', category: 'Details', medium: 'Photography', summary: 'Flowers, gold drapery, table settings and the catering preparations that bring an occasion together.', focus: 'Venue styling · flowers · reception tables', images: [photo(reception, 'Reception buffet with gold drapery and floral arrangements.'), photo(catering, 'Catering team preparing to serve at the reception.'), photo(table, 'Reception table with red roses, gold accents and guests.'), photo(company, 'Guests seated at a reception table decorated with red flowers.')] },
  { id: 'people-perspectives', title: 'People & perspectives', category: 'Events', medium: 'Photography', summary: 'Conversations, shared moments and a behind-the-scenes view of a photographer at work.', focus: 'Guests · candid portraits · behind the scenes', images: [photo(gathering, 'Guests sharing a moment beneath a colourful event canopy.'), photo(guests, 'Guests in conversation beside the reception buffet.'), photo(photographer, 'A photographer capturing the gathering among guests and floral arrangements.')] },
] as const;