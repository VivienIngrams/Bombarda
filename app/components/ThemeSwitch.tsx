'use client'

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <button className="border rounded-2xl border-indigo-900 p-1 hover:bg-indigo-100 dark:border-blue-50 dark:hover:bg-indigo-900" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    {theme === 'dark' ? <SunIcon/> : <MoonIcon/>}
  </button>;
};

export default ThemeSwitch;
