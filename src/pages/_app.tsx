// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import "../styles/globals.css";
import { getBaseUrl } from "../utils/getBaseUrl";
import Link from "next/link";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <nav className="absolute top-0 left-0 w-screen p-4 bg-slate-50 shadow-sm flex justify-between align-middle">
        <Link href="/">
          <a>
            <h2 className="text-[1.5rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700">
              Not a <span className="text-purple-300">totally</span> ripped App
            </h2>
          </a>
        </Link>
        <Link href={"/about"}>
          <a className=" text-[1.5rem] lg:text-[3rem] md:text-[3rem] hover:underline">
            About
          </a>
        </Link>
      </nav>
      <div className={`h-[104px] w-full mb-8`} />
      <Component {...pageProps} />
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
