/* eslint-disable @typescript-eslint/no-explicit-any */

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
const isBrowser = typeof window !== "undefined";
export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("token") : null;
};
export const getRefreshTokenToLocalStorage = () => {
  return isBrowser ? localStorage.getItem("refreshToken") : null;
};
export const setAccessTokenToLocalStorage = (token: string) =>
  isBrowser && localStorage.setItem("token", token);
export const setRefreshTokenToLocalStorage = (refreshToken: string) =>
  isBrowser && localStorage.setItem("refreshToken", refreshToken);
export const removeTokenLocalStorage = () => {
  if (isBrowser) localStorage.removeItem("token");
  if (isBrowser) localStorage.removeItem("refreshToken");
};
// export const checkAndRefreshToken = async (param?: {
//   onError?: () => void;
//   onSuccess?: () => void;
// }) => {
//   const token = getAccessTokenFromLocalStorage();
//   const refreshToken = getRefreshTokenToLocalStorage();
//   if (!token || !refreshToken) return;
//   const decodedAccessToken = jwt.decode(token) as {
//     exp: number;
//     iat: number;
//   };
//   const decodedRefreshToken = jwt.decode(refreshToken) as {
//     exp: number;
//     iat: number;
//   };
//   const now = new Date().getTime() / 1000 - 1;
//   if (now >= decodedRefreshToken.exp) {
//     removeTokenLocalStorage();
//     return param?.onError && param.onError();
//   }
//   if (
//     decodedAccessToken.exp - now <
//     (decodedAccessToken.exp - decodedAccessToken.iat) / 3
//   ) {
//     try {
//       const res = await authApiRequest.refreshToken();
//       setAccessTokenToLocalStorage(res.payload.data.token);
//       setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
//       param?.onSuccess && param.onSuccess();
//     } catch (error) {
//       param?.onError && param.onError();
//     }
//   }
// };
