export default function isValidImageUrl(url) {
	const imageUrlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
	return imageUrlRegex.test(url);
}
