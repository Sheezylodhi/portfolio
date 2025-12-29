import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "My Portfolio",
  description: "Professional Portfolio built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif overflow-x-hidden">
          <ThemeProvider>   
                 <Navbar />
        <main className="pt-16.5">{children}</main>
        <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
