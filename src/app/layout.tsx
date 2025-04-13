import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LumiMind Haven",
	description: "LumiMind Haven - Dịch vụ tư vấn sức khỏe tinh thần",
	icons: {
		icon: [
			{ url: "/logo.png", sizes: "32x32" },
			{ url: "/logo.png", sizes: "16x16" }
		],
		apple: [
			{ url: "/logo.png", sizes: "180x180" }
		],
		shortcut: ["/logo.png"]
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<ConvexClientProvider>
						{children}
						<Toaster />
					</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
