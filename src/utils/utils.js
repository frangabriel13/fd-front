export const nicknameToUrl = (nickname) => {
  return `https://www.tiktok.com/@${nickname}/live`;
};

export const urlToNickname = (url) => {
  return url.split('@')[1].split('/')[0];
};

export const filterCategoriesByParentAndGender = (categories, parentId, genderId) => {
  return categories.filter((category) => 
    category.parentId === parentId && 
    (genderId == null || category.genders.some(gender => gender.id === genderId))
  );
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

export const groupedItems = (items, products) => {
  console.log('items', items);
  console.log('products', products);

  const grouped = items.map(item => {
    const matchingProduct = products.find(product => product.manufacturer.userId === item.manufacturerId);
    return {
      userId: matchingProduct.manufacturer.userId,
      image: matchingProduct.manufacturer.image,
      name: matchingProduct.manufacturer.name,
      minPurchase: matchingProduct.manufacturer.minPurchase,
    };
  });

  return grouped;
};