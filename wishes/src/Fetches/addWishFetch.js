require('dotenv').config();



export const addWishFetch = (auth, Wish, eventId,image) => {
console.log(image)
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authentication: auth
    },
    body: JSON.stringify({ event: eventId, wish: Wish,image:image })
  };

  return fetch(process.env.REACT_APP_SERVER_URL + "/addWish", options);

}
