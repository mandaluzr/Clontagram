// import Axios from 'axios';


// const TOKEN_KEY = 'CLONTAGRAM_TOKEN';

// export function setToken(token) {
//     localStorage.setItem(TOKEN_KEY, token);
// }

// export function getToken() {
//     return localStorage.getItem(TOKEN_KEY);
// }

// export function deleteToken() {
//     localStorage.removeItem(TOKEN_KEY);
// }

// export function initAxiosInterceptors() {
//     Axios.interceptors.request.use(function(config) {
//         const token = getToken();

//         if(token) {
//             config.headers.Authorization = `bearer ${token}`;
//         }

//         return config;
//     });

//     Axios.interceptors.response.use(
//         function(response) {
//             return response;
//         },
//         function(error) {
//             if(error.response.status === 401) {
//                 deleteToken();
//                 window.location = '/login'
//             } else {
//                 return Promise.reject(error)
//             }
//         }
//     )
// };


// // export default setToken;
// // export default getToken;
// // export default deleteToken;
// // export default initAxiosInterceptors;
import Axios from 'axios';

const TOKEN_KEY = 'CLONTAGRAM_TOKEN';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function(config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }

    return config;
  });

  Axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = '/login';
      } else {
        return Promise.reject(error);
      }
    }
  );
}