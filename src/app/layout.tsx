import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Samuel Ndambuki | Frontend Engineer",
  description:
    "Portfolio of Samuel Ndambuki, Frontend Engineer specializing in JavaScript, TypeScript, Angular, and React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${orbitron.variable} ${rajdhani.variable} bg-gray-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
