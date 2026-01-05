import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import "./fontawesome";
import { PageLoader } from "@/components/PageLoader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
