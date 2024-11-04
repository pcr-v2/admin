import RootClientLayout from "@/app/layout.client";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
