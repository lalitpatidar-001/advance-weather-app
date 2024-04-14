import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ReduxProvider from "@/redux/provider/ReduxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider >
        <body className={`bg-[#444444] ${inter.className}`}>
          <Navbar />
          {children}
        </body>
        <Toaster/>
      </ReduxProvider>
      <SpeedInsights/>
    </html>
  );
}
