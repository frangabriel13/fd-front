import image from '../assets/categorias/otros/porDefecto.png';
import bermudasShorts from '../assets/categorias/hombre/bermudas-y-shorts.png';
import buzosHombre from '../assets/categorias/hombre/buzos.png';
import calzadosHombre from '../assets/categorias/hombre/calzados.png';
import camisasHombre from '../assets/categorias/hombre/camisas.png';

export const parentCategories = [
  { id: 88, name: 'Indumentaria' },
  { id: 130, name: 'Blanquería' },
  { id: 131, name: 'Bisutería' },
];

export const genders = [
  { 
    id: 2, 
    name: 'Hombre', 
    url: 'hombre',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: bermudasShorts },
      { id: 136, name: 'Pantalones', image, url: 'pantalones', img: bermudasShorts },
      { id: 139, name: 'Bermudas y shorts', image, url: 'bermudas-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: bermudasShorts },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: bermudasShorts },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasHombre },
      { id: 144, name: 'Chombas', image, url: 'chombas', img: bermudasShorts },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: buzosHombre },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: bermudasShorts },
      { id: 151, name: 'Ropa interior', image, url: 'ropa-interior', img: bermudasShorts },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosHombre },
      { id: 155, name: 'Otros', image, url: 'otros', img: bermudasShorts },
    ],
  },
  { 
    id: 3, 
    name: 'Mujer', 
    url: 'mujer',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: bermudasShorts },
      { id: 137, name: 'Pantalones y calzas', image, url: 'pantalones-y-calzas', img: bermudasShorts },
      { id: 140, name: 'Shorts y polleras', image, url: 'shorts-y-polleras', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: bermudasShorts },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: bermudasShorts },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: bermudasShorts },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: bermudasShorts },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: bermudasShorts },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: bermudasShorts },
      { id: 153, name: 'Lencería y mallas', image, url: 'lenceria-y-mallas', img: bermudasShorts },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: bermudasShorts },
      { id: 155, name: 'Otros', image, url: 'otros', img: bermudasShorts },
    ],
  },
  { 
    id: 4, 
    name: 'Niño', 
    url: 'niño',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: bermudasShorts },
      { id: 136, name: 'Pantalones', image, url: 'pantalones', img: bermudasShorts },
      { id: 139, name: 'Bermudas y shorts', image, url: 'bermudas-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: bermudasShorts },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: bermudasShorts },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: bermudasShorts },
      { id: 144, name: 'Chombas', image, url: 'chombas', img: bermudasShorts },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: bermudasShorts },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: bermudasShorts },
      { id: 151, name: 'Ropa interior', image, url: 'ropa-interior', img: bermudasShorts },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: bermudasShorts },
      { id: 155, name: 'Otros', image, url: 'otros', img: bermudasShorts },
    ], 
  },
  { 
    id: 5, 
    name: 'Niña', 
    url: 'niña',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: bermudasShorts },
      { id: 137, name: 'Pantalones y calzas', image, url: 'pantalones-y-calzas', img: bermudasShorts },
      { id: 140, name: 'Shorts y polleras', image, url: 'shorts-y-polleras', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: bermudasShorts },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: bermudasShorts },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: bermudasShorts },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: bermudasShorts },
      { id: 147, name: 'Swaters', image, url: 'swaters', img: bermudasShorts },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: bermudasShorts },
      { id: 152, name: 'Ropa interior y mallas', image, url: 'ropa-interior-y-mallas', img: bermudasShorts },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: bermudasShorts },
      { id: 155, name: 'Otros', image, url: 'otros', img: bermudasShorts },
    ],
  },
  { 
    id: 6, 
    name: 'Bebés', 
    url: 'bebes',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: bermudasShorts },
      { id: 138, name: 'Pantalones y shorts', image, url: 'pantalones-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: bermudasShorts },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: bermudasShorts },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: bermudasShorts },
      { id: 145, name: 'Bodys', image, url: 'bodys', img: bermudasShorts },
      { id: 148, name: 'Buzos y swaters', image, url: 'buzos-y-swaters', img: bermudasShorts },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: bermudasShorts },
      { id: 150, name: 'Conjuntos y enteritos', image, url: 'conjuntos-y-enteritos', img: bermudasShorts },
      { id: 152, name: 'Ropa interior y mallas', image, url: 'ropa-interior-y-mallas', img: bermudasShorts },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: bermudasShorts },
      { id: 155, name: 'Otros', image, url: 'otros', img: bermudasShorts },
    ],
  },
  { 
    id: 7, 
    name: 'Más', 
    url: 'mas',
    categories: [
      { id: 130, name: 'Blanquería', image, url: 'blanqueria', img: bermudasShorts },
      { id: 131, name: 'Bisutería', image, url: 'bisuteria', img: bermudasShorts },
    ],
  },
];