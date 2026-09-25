import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Track your workouts and build your perfect training plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
