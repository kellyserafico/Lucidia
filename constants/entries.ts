export type Entry = {
	id: string;
	date: string;
	dayTime: string;
	mood: string;
	tags: { label: string }[];
	text: string;
};

export const entries: Entry[] = [
	{
		id: "2025-05-01",
		date: "May 1st, 2025",
		dayTime: "Thursday | 9:00 AM",
		mood: "😴",
		tags: [{ label: "Night" }, { label: "Stars" }, { label: "Calm" }],
		text: `I was floating through a starry night sky, feeling calm and peaceful. The stars were bright and close, and I could reach out and touch them. I drifted until the sun began to rise, and I woke up feeling refreshed.`,
	},
	{
		id: "2025-05-10",
		date: "May 10th, 2025",
		dayTime: "Saturday | 10:00 AM",
		mood: "😃",
		tags: [{ label: "Celebration" }, { label: "Family" }],
		text: `We had a big family celebration. There was music, food, and laughter everywhere. I felt so happy to be surrounded by loved ones.`,
	},
	{
		id: "2025-05-15",
		date: "May 15th, 2025",
		dayTime: "Thursday | 7:00 AM",
		mood: "😇",
		tags: [{ label: "Peaceful" }, { label: "Garden" }],
		text: `I was walking through a beautiful garden, feeling at peace. The flowers were in full bloom and the air was fresh.`,
	},
	{
		id: "2025-05-20",
		date: "May 20th, 2025",
		dayTime: "Tuesday | 8:30 AM",
		mood: "😎",
		tags: [{ label: "Adventure" }, { label: "Beach" }],
		text: `I was surfing at the beach with friends. The waves were perfect and the sun was shining.`,
	},
	{
		id: "2025-05-25",
		date: "May 25th, 2025",
		dayTime: "Sunday | 10:00 AM",
		mood: "🤩",
		tags: [{ label: "Discovery" }, { label: "Excitement" }],
		text: `I discovered a hidden cave full of sparkling crystals. It was an amazing adventure!`,
	},
];

export const getEntries = () => entries;

export const addEntry = (entry: Entry) => {
	entries.push(entry);
};
