import * as jwt_decode from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwt_decode(token); // بيرجع { id, role, name, ... }
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
