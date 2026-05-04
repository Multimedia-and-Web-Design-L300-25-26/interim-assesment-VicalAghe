const isProduction = process.env.NODE_ENV === "production";

const accessTokenCookieName = "access_token";

const getAccessTokenCookieOptions = () => ({
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
});

const getClearAccessTokenCookieOptions = () => ({
  httpOnly: true,
  path: "/",
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
});

module.exports = {
  accessTokenCookieName,
  getAccessTokenCookieOptions,
  getClearAccessTokenCookieOptions,
};
