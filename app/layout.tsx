import "./globals.css";

export const metadata = {
  title: "ASEEMIX — Coming Soon",
  description: "ASEEMIX | Engineering the Infinite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
