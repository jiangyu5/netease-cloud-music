import axios from "axios";
export async function setProfile(cookie = "") {
  if (!cookie) {
    cookie = localStorage.getItem("cookie");
  }
  let res = await axios({
    url: `/api/user/account`,
    method: "post",
    data: {
      cookie,
    },
  });
  const { nickname, avatarUrl, backgroundUrl } = { ...res.data.profile };
  localStorage.setItem(
    "profile",
    JSON.stringify({ nickname, avatarUrl, backgroundUrl })
  );
}
