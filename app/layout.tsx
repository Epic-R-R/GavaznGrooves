import {Metadata} from "next";
import clsx from "clsx";
import './globals.css';
import {ReactNode} from "react";

import {Providers} from "./providers";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
    publisher: siteConfig.publisher,
    keywords: siteConfig.keywords,
    creator: siteConfig.publisher,
};


export default function RootLayout({children}: {
    children: ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable,
            )}
        >
        <Providers>
            <div className="flex flex-col h-screen items-center justify-center">
                <main className="flex-grow overflow-hidden">
                    <div className="container mx-auto max-w-7xl pt-16 px-6 h-full flex items-center justify-center">
                        {children}
                    </div>
                </main>
            </div>
        </Providers>
        </body>
        </html>
    );
}
