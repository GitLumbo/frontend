import "./styles/globals.css";
import AuthLayout from "./components/mainAuth";
export const metadata = {
  title: { template: "%s | 인하 링크", default: "Loading..." },
  description: "인하를 잇다.",
  icons: {
    icon: "/inhalink.png",
  },
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="ko">
      <body>
        <AuthLayout>
          {children}
          {modal}
        </AuthLayout>
      </body>
    </html>
  );
}
