import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

const Profile = ({ user }: { user: User }) => {
  const supabase = useSupabaseClient();

  console.log(user.user_metadata);

  const getContacts = async () => {
    let { data: contacts, error } = await supabase.from("contacts").select("*");
    console.log(contacts);
  };

  const setEmail = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: "demo@demomail.com",
    });
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-white">Profile</h1>
      <button
        className="border border-white text-white"
        onClick={() => setEmail()}
      >
        Set Email
      </button>
      <button
        className="border border-white text-white"
        onClick={() => getContacts()}
      >
        Get Contacts
      </button>
    </div>
  );
};

export default Profile;
