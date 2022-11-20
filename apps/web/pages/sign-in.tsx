import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const SignIn = () => {
  const { push } = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    if (session) {
      push("/");
    }
  }, [push, session]);

  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default SignIn;
