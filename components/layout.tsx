import Head from "next/head";
import type { layoutProps } from "../types/types";

const Layout = ({ children, title, nav }: layoutProps) => {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : <title>CougarCS - User Portal</title>}
      </Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {nav ? <div>nav</div> : <></>}
      <div className="flex-1 bg-mainDark">{children}</div>
    </>
  );
};

export default Layout;
