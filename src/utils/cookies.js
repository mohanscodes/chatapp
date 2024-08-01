// utils/cookies.js

/**
 * Gets the value of a cookie by name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} The value of the cookie or null if not found.
 */
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Deletes a cookie by setting its expiration date to the past.
 * @param {string} name - The name of the cookie.
 */
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
