import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FixPoint IT Solution & Service Center",
    template: "%s | FixPoint",
  },
  description:
    "FixPoint IT Solution & Service Center — layanan servis perangkat, konsultasi, dan instalasi IT untuk pelanggan hingga perusahaan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
