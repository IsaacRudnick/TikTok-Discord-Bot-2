import axios from "axios";
import fs from "fs";
import path from "path";

/**
 * Downloads a file from a url and saves it to a destination folder
 *
 * @param {string} url the url of the file to download
 * @param {string} destination the destination folder
 * @param {string} filename the name of the file to save as
 * @returns
 */
async function downloadFile(url, destination, filename) {
	try {
		// Create the destination folder if it doesn't exist
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, { recursive: true });
		}

		// Get the file from the url
		const response = await axios({
			method: "GET",
			url: url,
			responseType: "stream",
		});

		const filePath = path.join(destination, filename);

		const writer = fs.createWriteStream(filePath);

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on("finish", resolve);
			writer.on("error", reject);
		});
	} catch (error) {
		throw new Error(`Error downloading file: ${error.message}`);
	}
}

export default downloadFile;
