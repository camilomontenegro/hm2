import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "H&M - Style yourself. Own the moment.",
  description: "Discover the latest fashion trends and styles at H&M. Shop online for women's, men's, and children's clothing, shoes, and accessories.",
  keywords: "fashion, clothing, style, H&M, trends, shopping, women, men, sale",
  openGraph: {
    title: "H&M - Style yourself. Own the moment.",
    description: "Discover the latest fashion trends and styles at H&M.",
    type: "website",
    siteName: "H&M",
  },
  twitter: {
    card: "summary_large_image",
    title: "H&M - Style yourself. Own the moment.",
    description: "Discover the latest fashion trends and styles at H&M.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
