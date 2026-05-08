import './globals.css';

export const metadata = {
  title: 'Ignacio Fayos Gómez | Portfolio',
  description: 'Portfolio profesional en construcción'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}