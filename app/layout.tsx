import type { Metadata } from "next";
import { Lato, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import {Provider} from "./utils/Provider";

const quickSand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "700"]});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Bombarda App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} h-full bg-zinc-50 text-indigo-900 dark:bg-slate-900 dark:text-blue-50`}>
        <Provider>
        <Navbar/>
        <main className="mx-auto max-w-5xl px-6">
        {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
