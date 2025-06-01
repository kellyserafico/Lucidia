export type Entry = {
	id: string;
	date: string;
	dayTime: string;
	mood: string;
	tags: { label: string }[];
	text: string;
};

// ✅ Static initial entries
// ✅ Static initial entries
export const entries: Entry[] = [
	// March (leave only one for variety)
	{
		id: "2025-03-25",
		date: "March 25th, 2025",
		dayTime: "Friday | 10:00 AM",
		mood: "😊",
		tags: [{ label: "Forest" }, { label: "WPool of Water" }, { label: "Serene" }, { label: "Curiosity" }],
		text: `The dream started with me waking up in my bed. I found myself getting up from the bed, and walking into my kitchen.\nWhen I got there, I saw two of my friends. I couldn't tell who they were, but they felt like friends I would normally see in my classes. Upon seeing them, I tried to speak, but was cut off when they ran past, and disappeared behind me.\nThe scene transitioned, and I was suddenly falling from the sky. The clouds were rushing past me, but I didn't feel scared about hitting the ground. Instead, I dropped into a pool of water, and when I emerged, I was in a familiar forest from my childhood. After lifting myself from the water, I walked through the forest, observing large patches of bright red mushrooms along the trails.`,
	},
	// April entries
	{
		id: "2025-04-05",
		date: "April 5th, 2025",
		dayTime: "Saturday | 11:00 AM",
		mood: "🤔",
		tags: [{ label: "Puzzle" }, { label: "Mystery" }],
		text: `I was solving a giant puzzle in a mysterious old house. Each piece revealed a new secret.`,
	},
	{
		id: "2025-04-10",
		date: "April 10th, 2025",
		dayTime: "Thursday | 6:45 AM",
		mood: "😱",
		tags: [{ label: "Chase" }, { label: "Escape" }],
		text: `I was being chased through a maze. My heart was pounding, but I managed to find the exit just in time.`,
	},
	{
		id: "2025-04-15",
		date: "April 15th, 2025",
		dayTime: "Tuesday | 8:15 AM",
		mood: "😂",
		tags: [{ label: "Funny" }, { label: "Friends" }],
		text: `I was in a classroom and everyone was telling jokes. We laughed so much that the teacher joined in too!`,
	},
	{
		id: "2025-04-20",
		date: "April 20th, 2025",
		dayTime: "Sunday | 7:30 AM",
		mood: "😮",
		tags: [{ label: "Adventure" }, { label: "Mountains" }],
		text: `I was climbing a tall mountain with friends. The air was crisp and the view was breathtaking. We reached the summit and celebrated together.`,
	},
	// May entries
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

export const getEntryById = (id: string) => entries.find((e) => e.id === id);

export const addEntry = (entry: Entry) => {
	entries.push(entry);
};
