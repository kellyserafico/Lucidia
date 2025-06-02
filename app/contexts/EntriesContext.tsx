import React, { createContext, ReactNode, useContext, useState } from "react";
import { entries as defaultEntries } from "../../constants/entries";
import { Entry } from "../types/Entry";

interface EntriesContextType {
	entries: Entry[];
	addEntry: (entry: Entry) => void;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider = ({ children }: { children: ReactNode }) => {
	const [entries, setEntries] = useState<Entry[]>(defaultEntries);

	const addEntry = (entry: Entry) => {
		setEntries((prev) => [...prev, entry]);
	};

	return <EntriesContext.Provider value={{ entries, addEntry }}>{children}</EntriesContext.Provider>;
};

export const useEntries = () => {
	const context = useContext(EntriesContext);
	if (!context) throw new Error("useEntries must be used within EntriesProvider");
	return context;
};
