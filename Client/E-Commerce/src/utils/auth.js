import { jwtDecode } from "jwt-decode";

export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) return null;

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) return "EXPIRED";
  return token;
}

export function getUserDetails() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) return null;
  const { username, email, iat, exp, role } = jwtDecode(token.access);
  return {
    username,
    email,
    issuedTime: iat,
    expiryTime: exp,
    role,
  };
}

export function getProfileLocalDetails() {
  const profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
  return profileDetails;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getMode() {
  const mode = localStorage.getItem("mode");
  if (!mode) return "light";
  return mode;
}
