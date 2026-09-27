/**
 * Central image registry — components never hardcode image URLs.
 *
 * `placeholder: true` marks development imagery: free-license Unsplash photos, NOT F2A's own
 * vehicles or customers. Replace them with F2A photography by changing `src` — a local file in
 * /public, Supabase Storage, Cloudinary, UploadThing or a CMS URL all work. Responsive srcsets
 * are generated automatically for Unsplash URLs (see components/ui/Img.tsx).
 *
 * F2A-owned assets (logo, EP. 406 artwork) come from the F2A CARS Facebook page.
 */
export type ImageAsset = {
  src: string
  alt: string
  placeholder?: boolean
  /** CSS object-position to keep the subject in frame when cropped, e.g. '70% 50%'. */
  position?: string
}

const unsplash = (id: string, alt: string, position?: string): ImageAsset => ({
  src: `https://images.unsplash.com/photo-${id}`,
  alt,
  placeholder: true,
  position,
})

export const images = {
  brand: {
    logo: { src: '/brand/f2a-logo-160.webp', alt: 'F2A Quality Cars logo' },
  },

  media: {
    ep406: {
      src: '/media/f2a-vlogs-ep-406.webp',
      alt: 'F2A Vlogs EP. 406 artwork: “Sinong former member ng Mavs Phenomenal Basketball ang bibili saten ng worth 4 million na supercar?”',
    },
    ep406Small: { src: '/media/f2a-vlogs-ep-406-640.webp', alt: 'F2A Vlogs EP. 406 artwork' },
  },

  heroes: {
    home: unsplash('1622637385417-00da7c636218', 'Red Ford Mustang GT under red lights in a dark parking garage', '68% 60%'),
    cars: unsplash('1611859266238-4b98091d9d9b', 'Black Nissan GT-R with glowing taillights on a misty mountain road', '60% 60%'),
    sell: unsplash('1654034177579-9bab10f4843f', 'Silver Ford Mustang doing a burnout in a cloud of tyre smoke', '40% 60%'),
    trade: unsplash('1728060838342-cb9744a27d1b', 'Front of a black BMW with glowing headlights in the dark'),
    consign: unsplash('1580014317999-e9f1936787a5', 'Red LED taillights of a black car in the dark'),
    financing: unsplash('1611099711902-1228419f7113', 'Illuminated car instrument cluster'),
    about: unsplash('1591293835940-934a7c4f2d9b', 'Classic white Ford Mustang with black racing stripes beside an industrial building'),
    vlogs: unsplash('1645400379459-f6fd3d963fd4', 'Black sports car in a dark studio'),
    contact: unsplash('1690349645856-95a2d75c3c3e', 'White Nissan GT-R in a dark studio', '50% 60%'),
    cta: unsplash('1698533199374-f6ecdaaf5d3a', 'Glowing headlights of a black car in a dark garage'),
  },

  services: {
    buy: unsplash('1691795680273-cb411e618dbd', 'White Porsche 911 parked in front of a building'),
    sell: unsplash('1761014586544-53fe5e1f1e25', 'Hands exchanging a car key'),
    trade: unsplash('1612610683796-3b7d3a65df3d', 'White BMW Z4 on a city street at night'),
    consign: unsplash('1624006599899-3a6e02a2c64f', 'White sports coupe with its headlights on at night'),
  },

  vehicles: {
    mustangWhite: unsplash('1655628266959-12ec3f839a46', 'White Ford Mustang GT at sunset in an empty parking lot'),
    mustangWhiteDetail: unsplash('1564435148092-c1afd52fffc4', 'Headlight detail of a white Ford Mustang'),
    mustangRed: unsplash('1616612357450-95b84d42f21a', 'Red Ford Mustang GT with black racing stripes'),
    gtrOrange: unsplash('1609964729554-a02fb2a04830', 'Orange Nissan GT-R parked in front of a building'),
    z4Red: unsplash('1702630157140-42e65d783c34', 'Orange BMW Z4 roadster parked in a field'),
    z4Red2: unsplash('1702630157165-212e67d4e9c2', 'Side detail of an orange BMW Z4 sDrive35i'),
    z4Red3: unsplash('1702630157197-22d93e4ef046', 'Orange BMW Z4 roadster, side view'),
    brzBlack: unsplash('1564233890277-c5c9618b7e63', 'Black Subaru BRZ coupe, rear three-quarter view'),
    brzBlack2: unsplash('1564233859784-ed4d28bd9cc3', 'Black Subaru BRZ coupe at dusk'),
    camaroBlue: unsplash('1552519507-da3b142c6e3d', 'Blue Chevrolet Camaro in the desert'),
    landCruiserWhite: unsplash('1709620435533-56483034bdd4', 'White Toyota Land Cruiser parked on a beach'),
    hiluxBlack: unsplash('1758393605683-e28bb39d8917', 'Black Toyota Hilux GR Sport pickup with a snorkel'),
    hiaceRear: unsplash('1650807486050-a142ea418b19', 'Rear of a white Toyota HiAce Premio van'),
    gClassBlack: unsplash('1648413653819-7c0fd93e8e6a', 'Black Mercedes-AMG G 63 on a wet track'),
    gClassBlack2: unsplash('1648413653877-ade5eefd2f1b', 'Black Mercedes-AMG G 63 in front of snowy mountains'),
    porscheWhite: unsplash('1691795680273-cb411e618dbd', 'White Porsche 911 parked in front of a building'),
    rangeRoverWhite: unsplash('1638686302275-0e87df720aca', 'White Range Rover parked beside autumn trees'),
    // Unbranded detail shots shared by sample listings
    dashboard: unsplash('1667893591090-19729ae8fee3', 'Instrument cluster and steering wheel'),
    cluster: unsplash('1611099711902-1228419f7113', 'Illuminated instrument cluster'),
  },

  stories: {
    keys: unsplash('1761014586544-53fe5e1f1e25', 'Hands exchanging a car key'),
    keyInHand: unsplash('1653565217811-85b41bcd1edb', 'Person holding a car key'),
    keyAndCar: unsplash('1643792801605-1f8081811439', 'Person holding a car key next to a silver car'),
  },

  vlogPlaceholders: {
    newArrival: unsplash('1591293836027-e05b48473b67', 'Classic white Ford Mustang in front of a garage door'),
    release: unsplash('1643792801605-1f8081811439', 'Person holding a car key next to a silver car'),
    review: unsplash('1658162083129-5e008c4e5747', 'White Nissan Skyline GT-R on a wet road'),
    feature: unsplash('1618782657774-e5d6625a980f', 'White widebody Nissan GT-R with a large rear wing'),
    vlog: unsplash('1654034177579-9bab10f4843f', 'Silver Ford Mustang doing a burnout'),
  },
}

export type GalleryCategory = 'SPORTS' | 'LUXURY' | 'SUV' | 'PICKUP' | 'VAN' | 'PERFORMANCE'

export const galleryCategories: GalleryCategory[] = ['SPORTS', 'LUXURY', 'SUV', 'PICKUP', 'VAN', 'PERFORMANCE']

/** Automotive gallery — vehicle types seen on the F2A feed. Placeholder photography until F2A supplies its own. */
export const gallery: { image: ImageAsset; category: GalleryCategory; tall?: boolean }[] = [
  { category: 'PERFORMANCE', tall: true, image: unsplash('1658162083129-5e008c4e5747', 'White Nissan Skyline GT-R on a wet road') },
  { category: 'SPORTS', image: unsplash('1655628266959-12ec3f839a46', 'White Ford Mustang GT at sunset') },
  { category: 'LUXURY', image: unsplash('1691795680273-cb411e618dbd', 'White Porsche 911 parked in front of a building') },
  { category: 'PICKUP', tall: true, image: unsplash('1758393605683-e28bb39d8917', 'Black Toyota Hilux GR Sport pickup with a snorkel') },
  { category: 'SUV', image: unsplash('1709620435533-56483034bdd4', 'White Toyota Land Cruiser parked on a beach') },
  { category: 'VAN', image: unsplash('1671281367997-29a7e3df7d99', 'White Volkswagen Caddy van at night') },
  { category: 'SPORTS', tall: true, image: unsplash('1564233890277-c5c9618b7e63', 'Black Subaru BRZ coupe') },
  { category: 'LUXURY', image: unsplash('1638686302275-0e87df720aca', 'White Range Rover parked beside autumn trees') },
  { category: 'PERFORMANCE', image: unsplash('1584273421792-84b448728b38', 'Black Nissan GT-R beside a chain-link fence') },
  { category: 'PICKUP', image: unsplash('1644902166413-b883bc021fd1', 'White Ford F-150 Raptor on a dirt road') },
  { category: 'SUV', tall: true, image: unsplash('1554841649-de947c4b954a', 'Vintage Toyota Land Cruiser in the desert') },
  { category: 'SPORTS', image: unsplash('1552519507-da3b142c6e3d', 'Blue Chevrolet Camaro coupe') },
  { category: 'LUXURY', tall: true, image: unsplash('1648413653819-7c0fd93e8e6a', 'Black Mercedes-Benz G-Class on a wet track') },
  { category: 'VAN', image: unsplash('1650807486050-a142ea418b19', 'Rear of a white Toyota HiAce van') },
  { category: 'PERFORMANCE', image: unsplash('1618782657774-e5d6625a980f', 'White widebody Nissan GT-R with a large rear wing') },
  { category: 'PICKUP', image: unsplash('1631377875413-b1e3e660bfa2', 'Silver Toyota Hilux on a dirt road') },
]
