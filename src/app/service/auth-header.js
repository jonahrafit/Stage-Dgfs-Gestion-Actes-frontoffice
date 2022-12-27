export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token && token.access) {
    return {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + token.access
    };
  } else {
    return {
      "Content-type": "application/json; charset=UTF-8",
    };
  }
}
