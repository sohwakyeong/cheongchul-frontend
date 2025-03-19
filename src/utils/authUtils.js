import decodeJwt from "./decodeJwt";
export const setToken = (token) => {
    localStorage.setItem("accessToken", token);


    const decodedToken = decodeJwt(token);
    localStorage.setItem("tokenExpiration", decodedToken.exp * 1000);
};

export const getToken = () => {
    const token = localStorage.getItem("accessToken");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime) {
        if (Date.now() >= expirationTime) {
            removeToken();
            return null;
        }
    }
    return token;
};

export const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.setItem("isLogout", "true");
};