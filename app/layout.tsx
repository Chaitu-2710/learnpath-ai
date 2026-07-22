import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "LearnPath AI — Your AI-Powered Learning & Career Mentor",
  description:
    "LearnPath AI is a personalized AI mentor platform that helps students learn skills, track progress, build projects, and become career-ready.",
  keywords: ["AI learning", "career mentor", "personalized learning", "coding practice", "ML", "tech careers"],
  authors: [{ name: "LearnPath AI Team" }],
  openGraph: {
    title: "LearnPath AI",
    description: "Your AI-powered personalized learning and career mentor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900 text-slate-100">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
