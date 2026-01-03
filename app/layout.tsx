import "./globals.css";
import Background from "@/components/layout/Background";

export const metadata = {
  title: "Portfolio | Ingénieur Logiciel",
  description: "Portfolio professionnel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
          <Background />
          <div className="relative">{children}</div>
        </main>
      </body>
    </html>
  );
}
