import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Professional Portfolio built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="pt-16.5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
