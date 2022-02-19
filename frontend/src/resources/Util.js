import { Movie_key } from "./Env";

/**
 * Util function to get the key in a dict by its value. Used in movie detail modal
 * Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
 */
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
/**
 * Sort the arry with given type
 * 1 = popularity, otherwise release date
 * isAscend indicates the result should be ascending or descending
 */
export const sortByType = (arr, type, isAscend) => {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++)
    for (let j = 0; j < n - i - 1; j++)
      if (type === 1) {
        if (isAscend) {
          if (arr[j].popularity < arr[j + 1].popularity) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        } else {
          if (arr[j].popularity > arr[j + 1].popularity) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      } else {
        if (isAscend) {
          if (arr[j].release_date < arr[j + 1].release_date) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        } else {
          if (arr[j].release_date > arr[j + 1].release_date) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }

  return arr;
};
/**
 * Get the reviews with given movie_id
 */
export const getReviews = async (movie_id) => {
  return fetch("api/movie_reviews/" + movie_id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
/**
 * Get the user information with given user_id
 */
export const getUser = async (user_id) => {
  return fetch("api/auth/user/" + user_id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
/**
 * Get the specific movie information with given movie_id
 */
export const getMovie = async (movie_id) => {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      movie_id +
      "?api_key=" +
      Movie_key +
      "&language=en-US",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
/**
 * Get the watching list information with given user_id
 */
export const getWatchingLists = async (user_id) => {
  return fetch("api/watching_user/" + user_id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
/**
 * check if a user has a movie in his watching list (given user id and movie id)
 * If true, return corresponding movie. Otherwise return null
 */
export const inWatchingLists = async (user_id, movie_id) => {
  return fetch("api/watching_user/" + user_id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        if (json[i]["movie_id"] === movie_id) {
          return json[i];
        }
      }
      return null;
    })
    .catch((error) => console.error(error));
};
/**
 * Get the friend list information with given user_id
 */
export const getFriends = async (user_id) => {
  return fetch("api/friend_user/" + user_id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(error));
};
