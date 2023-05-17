import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Link from "next/link";
import { toast } from "sonner";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        toast.error("Invalid email or password");
        return;
      }

      toast.error("An error occurred");
      return;
    }

    if (data) {
      toast.success("Signed in successfully");
      router.push("/profile");
    }
  };

  return (
    <Layout title="Login - CougarCS">
      <div className="mx-auto items-center w-full max-w-md">
        <div className="block mx-auto w-fit mb-4">
          <Image
            src="/images/CougarCS-Logo.png"
            alt="CougarCS-Logo"
            width={200}
            height={200}
            className="mx-auto"
          />
          <h1 className="text-center text-4xl font-bold text-white ">
            Cougar<span className="text-red-600">CS</span>
          </h1>
        </div>

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800 border-neutral-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Welcome back!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-red-500 focus:border-red-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div className="flex items-end justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Forgot password
                </Link>
              </div>
              <div>
                <hr className="border-neutral-700" />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Log in
              </button>
              <p className="text-sm font-light text-neutral-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium hover:underline text-red-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
