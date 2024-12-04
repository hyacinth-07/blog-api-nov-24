type DateProp = {
	createdAt: Date | string;
	updatedAt: Date | string;
};

export default function DateComponent(
	{ createdAt }: DateProp,
	{ updatedAt }: DateProp
) {
	const created = new Date(createdAt);
	const updated = new Date(updatedAt);

	const x = created.getTime();
	const y = created.getTime();

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};

	if (x >= y) {
		const stringDate = created.toLocaleString('en-US', options);
		return (
			<>
				<p>{`First posted on ${stringDate}`}</p>
			</>
		);
	} else {
		const stringDate = updated.toLocaleString('en-US', options);
		return (
			<>
				<p>{`Updated on ${stringDate}`}</p>
			</>
		);
	}
}
