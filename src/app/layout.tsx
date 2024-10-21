import type { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry";
import Header from "./nav/header/Header";
import Footer from "./nav/footer/Footer";

export const metadata: Metadata = {
  title: "StockHelper",
  description: "주식 도우미",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
