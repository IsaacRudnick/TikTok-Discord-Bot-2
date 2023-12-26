/**
 * Generate a unique color hex code based on the current time
 * This is used to color the embeds. It is not necessary, but it looks nice.
 * @returns {Promise<string>} a unique color hex code
 */
async function uniqueColorHex() {
	let today = new Date();

	const hex =
		"#" +
		(today.getHours() < 10 ? "0" : "") +
		today.getHours() +
		"" +
		(today.getMinutes() < 10 ? "0" : "") +
		today.getMinutes() +
		"" +
		(today.getSeconds() < 10 ? "0" : "") +
		today.getSeconds();

	return hex;
}

export default uniqueColorHex;
