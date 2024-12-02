export default function formatDate(date: Date | string): string {
	const readableDate = new Date(date);

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	};

	const stringDate = readableDate.toLocaleString('en-US', options);

	return stringDate;
}
