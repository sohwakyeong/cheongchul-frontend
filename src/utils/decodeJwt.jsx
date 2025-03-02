import { jwtDecode } from "jwt-decode";

const decodeJwt = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error('Failed to decode JWT', e);
    return null;
  }
};

export default decodeJwt;