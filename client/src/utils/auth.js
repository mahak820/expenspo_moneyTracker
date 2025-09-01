// utils/auth.js (or inside a separate auth file)
export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
}
