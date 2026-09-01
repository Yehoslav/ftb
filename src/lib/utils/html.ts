/** WordPress excerpts arrive wrapped in HTML — strip tags and normalize common entities to plain text. */
export function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&hellip;|&#8230;/g, '…')
		.replace(/&rsquo;|&#8217;|&lsquo;|&#8216;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&quot;|&#8220;|&#8221;/g, '"')
		.replace(/\s+/g, ' ')
		.trim();
}