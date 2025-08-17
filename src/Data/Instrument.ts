export interface Instrument {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
  specifications: {
    brand: string;
    model: string;
    material: string;
    origin: string;
    weight?: string;
    dimensions?: string;
  };
}

export const instruments: Instrument[] = [
  {
    id: '1',
    name: 'Yamaha C40 Classical Guitar',
    category: 'String',
    price: 199,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    description: 'A perfect entry-level classical guitar with nylon strings, ideal for beginners and students.',
    featured: true,
    specifications: {
      brand: 'Yamaha',
      model: 'C40',
      material: 'Spruce top, Meranti back and sides',
      origin: 'Indonesia',
      weight: '1.6 kg',
      dimensions: '39" x 14" x 4"'
    }
  },
  {
    id: '2',
    name: 'Pearl Export Series Drum Set',
    category: 'Percussion',
    price: 699,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Complete 5-piece drum set with cymbals, perfect for rock and pop music.',
    specifications: {
      brand: 'Pearl',
      model: 'Export EXX725',
      material: 'Poplar/Asian Mahogany',
      origin: 'China',
      weight: '45 kg',
      dimensions: 'Various sizes'
    }
  },
  {
    id: '3',
    name: 'Yamaha YAS-280 Alto Saxophone',
    category: 'Wind',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1551847124-4c32d484e65f?w=400&h=300&fit=crop',
    description: 'Student-level alto saxophone with excellent tone quality and reliable mechanics.',
    featured: true,
    specifications: {
      brand: 'Yamaha',
      model: 'YAS-280',
      material: 'Brass body, lacquered finish',
      origin: 'China',
      weight: '2.3 kg',
      dimensions: '24" x 8" x 6"'
    }
  },
  {
    id: '4',
    name: 'Casio CDP-S110 Digital Piano',
    category: 'Keyboard',
    price: 449,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop',
    description: 'Compact digital piano with 88 weighted keys and realistic piano sound.',
    specifications: {
      brand: 'Casio',
      model: 'CDP-S110',
      material: 'Plastic housing, weighted keys',
      origin: 'China',
      weight: '10.5 kg',
      dimensions: '52" x 9" x 4"'
    }
  },
  {
    id: '5',
    name: 'Fender Player Stratocaster',
    category: 'String',
    price: 899,
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop',
    description: 'Iconic electric guitar with classic Stratocaster tone and versatile pickup configuration.',
    specifications: {
      brand: 'Fender',
      model: 'Player Stratocaster',
      material: 'Alder body, Maple neck',
      origin: 'Mexico',
      weight: '3.2 kg',
      dimensions: '39" x 13" x 2"'
    }
  },
  {
    id: '6',
    name: 'Roland TD-17KV Electronic Drums',
    category: 'Percussion',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Professional electronic drum kit with mesh heads and realistic feel.',
    specifications: {
      brand: 'Roland',
      model: 'TD-17KV',
      material: 'Mesh heads, metal frame',
      origin: 'Malaysia',
      weight: '35 kg',
      dimensions: 'Various sizes'
    }
  },
  {
    id: '7',
    name: 'Bach TR300H2 Trumpet',
    category: 'Wind',
    price: 599,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop',
    description: 'Student trumpet with excellent intonation and comfortable playability.',
    specifications: {
      brand: 'Bach',
      model: 'TR300H2',
      material: 'Brass, lacquered finish',
      origin: 'USA',
      weight: '1.1 kg',
      dimensions: '20" x 5" x 5"'
    }
  },
  {
    id: '8',
    name: 'Yamaha P-125 Digital Piano',
    category: 'Keyboard',
    price: 699,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    description: 'Portable digital piano with authentic piano touch and sound.',
    featured: true,
    specifications: {
      brand: 'Yamaha',
      model: 'P-125',
      material: 'Plastic housing, graded hammer action',
      origin: 'Indonesia',
      weight: '11.8 kg',
      dimensions: '52" x 12" x 6"'
    }
  },
  {
    id: '9',
    name: 'Taylor 214ce Acoustic Guitar',
    category: 'String',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1520166012956-add9ba0835cb?w=400&h=300&fit=crop',
    description: 'Premium acoustic-electric guitar with solid sitka spruce top and layered rosewood back.',
    specifications: {
      brand: 'Taylor',
      model: '214ce',
      material: 'Sitka spruce top, rosewood back',
      origin: 'USA',
      weight: '2.1 kg',
      dimensions: '41" x 15" x 4"'
    }
  },
  {
    id: '10',
    name: 'Zildjian A Custom Cymbal Set',
    category: 'Percussion',
    price: 799,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
    description: 'Professional cymbal set with brilliant finish and modern sound.',
    specifications: {
      brand: 'Zildjian',
      model: 'A Custom',
      material: 'B20 bronze alloy',
      origin: 'USA',
      weight: '5.5 kg',
      dimensions: 'Various sizes'
    }
  },
  {
    id: '11',
    name: 'Buffet Crampon R13 Clarinet',
    category: 'Wind',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1465821185615-20b3c2fbf2b5?w=400&h=300&fit=crop',
    description: 'Professional clarinet with grenadilla wood body and exceptional tone quality.',
    specifications: {
      brand: 'Buffet Crampon',
      model: 'R13',
      material: 'Grenadilla wood',
      origin: 'France',
      weight: '0.7 kg',
      dimensions: '26" x 3" x 3"'
    }
  },
  {
    id: '12',
    name: 'Nord Stage 3 Keyboard',
    category: 'Keyboard',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Professional stage piano with authentic piano, organ, and synthesizer sounds.',
    specifications: {
      brand: 'Nord',
      model: 'Stage 3',
      material: 'Metal chassis, wooden keys',
      origin: 'Sweden',
      weight: '18.5 kg',
      dimensions: '51" x 13" x 5"'
    }
  },
  {
    id: '13',
    name: 'Gibson Les Paul Standard',
    category: 'String',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400&h=300&fit=crop',
    description: 'Iconic electric guitar with mahogany body and maple cap, legendary rock sound.',
    specifications: {
      brand: 'Gibson',
      model: 'Les Paul Standard',
      material: 'Mahogany body, maple cap',
      origin: 'USA',
      weight: '4.1 kg',
      dimensions: '39" x 13" x 2"'
    }
  },
  {
    id: '14',
    name: 'Yamaha Intermediate Flute',
    category: 'Wind',
    price: 899,
    image: 'https://images.unsplash.com/photo-1559388398-b3d3d6a1d072?w=400&h=300&fit=crop',
    description: 'Silver-plated flute with excellent projection and responsive action.',
    specifications: {
      brand: 'Yamaha',
      model: 'YFL-222',
      material: 'Silver-plated nickel',
      origin: 'Japan',
      weight: '0.4 kg',
      dimensions: '26" x 1" x 1"'
    }
  },
  {
    id: '15',
    name: 'Moog Subsequent 37 Synthesizer',
    category: 'Keyboard',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Analog synthesizer with classic Moog sound and modern features.',
    specifications: {
      brand: 'Moog',
      model: 'Subsequent 37',
      material: 'Metal chassis, wooden sides',
      origin: 'USA',
      weight: '8.2 kg',
      dimensions: '24" x 14" x 4"'
    }
  }
];