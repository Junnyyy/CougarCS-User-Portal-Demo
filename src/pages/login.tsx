import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { BsDiscord } from "react-icons/bs";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      },
    });

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <Layout title="Login - CougarCS">
      <div className="mx-auto items-center w-full max-w-md">
        <div className="block mx-auto w-fit">
          <Image
            src="/images/CougarCS-Logo.png"
            alt="CougarCS-Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h1 className="pt-4 font-bold text-white text-center text-4xl">
            User Login
          </h1>
        </div>

        <div className="bg-mainDark/90 border border-zinc-700 shadow-md rounded-md m-8 flex items-center flex-col p-4 gap-4">
          <h2 className="font-bold text-white text-center text-2xl">
            Sign in with Discord
          </h2>

          <hr className="border border-zinc-500 w-full" />

          <p className="text-center text-gray-400">
            CougarCS uses Discord to authenticate users. Click the button below
            to sign in with Discord.
          </p>
          <button
            type="button"
            className="mx-auto text-white bg-[#5865F2] hover:bg-[#5865F2]/90 focus:ring-4 focus:ring-[#5865F2]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5865F2]/50"
            onClick={handleLogin}
          >
            <BsDiscord className="mr-2 -ml-1" />
            Continue with Discord
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
