/**
 * Download a blob as a file
 *
 * @param blob The blob to download
 * @param filename The name of the file to download
 */
export function downloadBlob(blob: Blob, filename: string) {
	// We create a link element
	const link = document.createElement('a');

	// We fill the link with the blob and the filename
	link.style.display = 'none';
	link.href = URL.createObjectURL(blob);
	link.download = filename;

	// We append the link to the document body
	document.body.appendChild(link);

	// We trigger a click event on the link
	// link.click();
	link.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window,
		}),
	);

	// We remove the link from the document body
	document.body.removeChild(link);

	// We revoke the object URL to avoid memory leaks
	URL.revokeObjectURL(link.href);
}
