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