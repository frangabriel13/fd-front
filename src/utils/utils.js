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

export const categorizeSizes = (sizes) => {
  const numericSizes = [];
  const letterSizes = [];

  sizes.forEach(size => {
    if (!isNaN(size.name)) {
      numericSizes.push(size);
    } else {
      letterSizes.push(size);
    }
  });

  return { numericSizes, letterSizes };
};
// export const categorizeSizes = () => {
//   const numericSizes = [
//     { id: 13, name: '1' },
//     { id: 14, name: '2' },
//     { id: 15, name: '3' },
//     { id: 16, name: '4' },
//     { id: 17, name: '5' },
//     { id: 7, name: '36' },
//     { id: 8, name: '38' },
//     { id: 9, name: '40' },
//     { id: 10, name: '42' },
//     { id: 11, name: '44' },
//     { id: 12, name: '46' },
//     { id: 22, name: '75' },
//     { id: 23, name: '80' },
//   ];

//   const letterSizes = [
//     { id: 1, name: 'S' },
//     { id: 2, name: 'M' },
//     { id: 3, name: 'L' },
//     { id: 5, name: 'XL' },
//     { id: 18, name: '3XL' },
//   ];

//   const shoeSizes = [
//     { id: 7, name: '36' },
//     { id: 19, name: '36.5' },
//     { id: 20, name: '37' },
//     { id: 21, name: '37.5' },
//   ];

//   return { numericSizes, letterSizes, shoeSizes };
// };