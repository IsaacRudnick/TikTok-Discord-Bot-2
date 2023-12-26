import axios from "axios";

/**
 * Fix URL by:
 * 1. Following redirects
 * 2. Removing referrer trackers and other url parameters
 * 3. Removing trailing slash (if any)
 *
 * @param {string} url
 * @returns {Promise<string>}
 */
async function fixURL(url) {
	// Follow redirects
	const response = await fetch(url, { redirect: "follow" });
	// Remove referrer trackers and other url parameters
	let resURL = response.url.split("?")[0];

	// Remove trailing slash (if any)
	if (resURL.endsWith("/")) resURL = resURL.slice(0, -1);

	// Replace /photo/ with /video/ )
	resURL = resURL.replace("/photo/", "/video/");

	return resURL;
}

export default fixURL;
