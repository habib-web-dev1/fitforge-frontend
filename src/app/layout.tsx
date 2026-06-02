import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'FitForge AI — SaaS Fitness & Nutrition Workspace',
  description: 'Forge your hyper-customized workout routines, meal plans, and wellness protocols using background AI agents that run tracking and planning tasks autonomously based on your biometrics.',
  keywords: ['fitness tracker', 'AI workout routine generator', 'SaaS fitness builder', 'macro tracker nutrition', 'agentic fitness coach'],
  authors: [{ name: 'FitForge AI Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth dark">
      <body className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
