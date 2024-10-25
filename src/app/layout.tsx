import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/fonts/fonts";
import ProviderFirebase from "@/providers/firebaseProvider/ProviderFirebase";
import { Header } from "@/features/shared";

export const metadata: Metadata = {
  title: "My Mochis Gallery ❤️",
  description:
    "Galería de imágenes de Fatima y Ariano para guardar y recordar las salidas y aventuras que hemos tenido wajaja",
  icons: {
    icon: ["/assets/icoKitty.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className} bg-primary-90 min-h-screen antialiased py-3`}
      >
        <ProviderFirebase>
          <Header />
          <main className="py-7">{children}</main>
        </ProviderFirebase>
      </body>
    </html>
  );
}
