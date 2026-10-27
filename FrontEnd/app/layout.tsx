import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { IsLoginProvider } from "../context/isLoginContext";
import { ToastProvider } from "../context/ToastContext";
import ModaleLogin from "../components/LoginAndRegister/ModaleLogin";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeHub | Share Your Recipes",
  description:
    "Discover, share, and save your favorite recipes with RecipeHub.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <IsLoginProvider>
            <Header />
            <ModaleLogin />
            {children}
            <Footer />
          </IsLoginProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
