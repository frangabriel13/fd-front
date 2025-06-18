import image from '../assets/categorias/otros/porDefecto.png';
import bermudasShorts from '../assets/categorias/hombre/bermudas-y-shorts.png';
import buzosHombre from '../assets/categorias/hombre/buzos.png';
import calzadosHombre from '../assets/categorias/hombre/calzados.png';
import camisasHombre from '../assets/categorias/hombre/camisas.png';
import camperasHombre from '../assets/categorias/hombre/camperas.png';
import jeansHombre from '../assets/categorias/hombre/jeans.png';
import remerasHombre from '../assets/categorias/hombre/remeras.png';
import interiorHombre from '../assets/categorias/hombre/ropa-interior.png';
import sweatersHombre from '../assets/categorias/hombre/sweaters.png';
import pantalonesHombre from '../assets/categorias/hombre/pantalones.png';
import sweatersMujer from '../assets/categorias/mujer/sweaters.png';
import camisasMujer from '../assets/categorias/mujer/camisas.png';
import camperasMujer from '../assets/categorias/mujer/camperas.png';
import jeansMujer from '../assets/categorias/mujer/jeans.png';
import lenceriaMujer from '../assets/categorias/mujer/lenceria-y-mallas.png';
import pantalonesCalzasMujer from '../assets/categorias/mujer/pantalones-y-calzas.png';
import shortsPollerasMujer from '../assets/categorias/mujer/shorts-y-polleras.png';
import calzadosMujer from '../assets/categorias/mujer/calzados.png';
import vestidosMujer from '../assets/categorias/mujer/vestidos.png';
import buzosNino from '../assets/categorias/nino/buzos.png';
import camperasNino from '../assets/categorias/nino/camperas.png';
import otrosNino from '../assets/categorias/nino/otros.png';
import interiorNino from '../assets/categorias/nino/ropa-interior.png';
import otrosNina from '../assets/categorias/nina/otros.png';
import vestidosNina from '../assets/categorias/nina/vestidos.png';
import bodysBebe from '../assets/categorias/bebes/bodys.png';
import eneteritosBebe from '../assets/categorias/bebes/conjuntos-y-enteritos.png';
import otrosBebe from '../assets/categorias/bebes/otros.png';
import remerasBebe from '../assets/categorias/bebes/remeras.png';

export const parentCategories = [
  { id: 88, name: 'Indumentaria' },
  { id: 130, name: 'Blanquería' },
  { id: 131, name: 'Bisutería' },
];

export const genders = [
  { 
    id: 1, 
    name: 'Hombre', 
    url: 'hombre',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: jeansHombre },
      { id: 136, name: 'Pantalones', image, url: 'pantalones', img: pantalonesHombre },
      { id: 139, name: 'Bermudas y shorts', image, url: 'bermudas-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: camperasHombre },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: remerasHombre },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasHombre },
      { id: 144, name: 'Chombas', image, url: 'chombas', img: remerasBebe },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: buzosHombre },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: sweatersHombre },
      { id: 151, name: 'Ropa interior', image, url: 'ropa-interior', img: interiorHombre },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosHombre },
      { id: 155, name: 'Otros', image, url: 'otros', img: otrosNino },
    ],
  },
  { 
    id: 2, 
    name: 'Mujer', 
    url: 'mujer',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: jeansMujer },
      { id: 137, name: 'Pantalones y calzas', image, url: 'pantalones-y-calzas', img: pantalonesCalzasMujer },
      { id: 140, name: 'Shorts y polleras', image, url: 'shorts-y-polleras', img: shortsPollerasMujer },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: camperasMujer },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: remerasBebe },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasMujer },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: buzosHombre },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: sweatersMujer },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: vestidosMujer },
      { id: 153, name: 'Lencería y mallas', image, url: 'lenceria-y-mallas', img: lenceriaMujer },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosMujer },
      { id: 155, name: 'Otros', image, url: 'otros', img: otrosNina },
    ],
  },
  { 
    id: 3, 
    name: 'Niño', 
    url: 'niño',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: jeansHombre },
      { id: 136, name: 'Pantalones', image, url: 'pantalones', img: pantalonesHombre },
      { id: 139, name: 'Bermudas y shorts', image, url: 'bermudas-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: camperasNino },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: remerasHombre },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasHombre },
      { id: 144, name: 'Chombas', image, url: 'chombas', img: remerasBebe },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: buzosNino },
      { id: 147, name: 'Sweaters', image, url: 'sweaters', img: sweatersHombre },
      { id: 151, name: 'Ropa interior', image, url: 'ropa-interior', img: interiorNino },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosHombre },
      { id: 155, name: 'Otros', image, url: 'otros', img: otrosNino },
    ], 
  },
  { 
    id: 4, 
    name: 'Niña', 
    url: 'niña',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: jeansMujer },
      { id: 137, name: 'Pantalones y calzas', image, url: 'pantalones-y-calzas', img: pantalonesCalzasMujer },
      { id: 140, name: 'Shorts y polleras', image, url: 'shorts-y-polleras', img: shortsPollerasMujer },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: camperasMujer },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: remerasBebe },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasMujer },
      { id: 146, name: 'Buzos', image, url: 'buzos', img: buzosNino },
      { id: 147, name: 'Swaters', image, url: 'swaters', img: sweatersMujer },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: vestidosNina },
      { id: 152, name: 'Ropa interior y mallas', image, url: 'ropa-interior-y-mallas', img: interiorNino },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosHombre },
      { id: 155, name: 'Otros', image, url: 'otros', img: otrosNina },
    ],
  },
  { 
    id: 5, 
    name: 'Bebés', 
    url: 'bebes',
    categories: [
      { id: 135, name: 'Jeans', image, url: 'jeans', img: jeansHombre },
      { id: 138, name: 'Pantalones y shorts', image, url: 'pantalones-y-shorts', img: bermudasShorts },
      { id: 141, name: 'Camperas', image, url: 'camperas', img: camperasNino },
      { id: 142, name: 'Remeras', image, url: 'remeras', img: remerasBebe },
      { id: 143, name: 'Camisas', image, url: 'camisas', img: camisasHombre },
      { id: 145, name: 'Bodys', image, url: 'bodys', img: bodysBebe },
      { id: 148, name: 'Buzos y swaters', image, url: 'buzos-y-swaters', img: buzosNino },
      { id: 149, name: 'Vestidos', image, url: 'vestidos', img: vestidosNina },
      { id: 150, name: 'Conjuntos y enteritos', image, url: 'conjuntos-y-enteritos', img: eneteritosBebe },
      { id: 152, name: 'Ropa interior y mallas', image, url: 'ropa-interior-y-mallas', img: interiorNino },
      { id: 154, name: 'Calzados', image, url: 'calzados', img: calzadosHombre },
      { id: 155, name: 'Otros', image, url: 'otros', img: otrosBebe },
    ],
  },
  { 
    id: 6, 
    name: 'Más', 
    url: 'mas',
    categories: [
      { id: 130, name: 'Blanquería', image, url: 'blanqueria', img: otrosBebe },
      { id: 131, name: 'Bisutería', image, url: 'bisuteria', img: otrosNina },
    ],
  },
];