export const nicknameToUrl = (nickname) => {
  return `https://www.tiktok.com/@${nickname}/live`;
};

export const urlToNickname = (url) => {
  return url.split('@')[1].split('/')[0];
};