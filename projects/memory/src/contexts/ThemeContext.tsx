import React, { createContext, useState } from 'react';

export const THEMES = ['Fruits et Légumes', 'Médical', 'Météo', 'Sommeil', 'Sport'];

export type ThemeContext = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>> | any;
};

export const ThemeContext = createContext<ThemeContext>({ theme: THEMES[0], setTheme: undefined });

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState<string>(THEMES[0]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme: () => (theme: string) => setTheme(theme) }}>
            {children}
        </ThemeContext.Provider>
    );
};
