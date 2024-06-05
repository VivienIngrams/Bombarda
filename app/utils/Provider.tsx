'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

interface ProviderProps {
    children: React.ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    )
}