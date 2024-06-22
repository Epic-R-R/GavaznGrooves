"use client";

import React from "react";

import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
