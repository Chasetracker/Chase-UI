import "@/styles/globals.css";
import Layout from '@/components/Layout/Layout';
import type { AppProps } from "next/app";
import { inter } from "@/styles/font";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}
