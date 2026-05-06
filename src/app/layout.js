import "./globals.css";
import TerminalBackground from "./components/TerminalBackground"; // add this
import { Share_Tech_Mono, VT323, Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Hillary C. Portfolio",
  description: "Web Designer/Dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.variable} ${vt323.variable} ${pressStart2P.variable} antialiased`}
      >
        <TerminalBackground /> {/* add this */}
        {children}
      </body>
    </html>
  );
}
