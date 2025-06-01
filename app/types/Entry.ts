export interface Entry {
	id: string;
	date: string;
	dayTime: string;
	mood: string;
	text: string;
	tags: { label: string }[];
}
