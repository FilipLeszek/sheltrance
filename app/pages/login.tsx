import Button from "@/components/Button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

type Props = {
  // Add custom props here
};

const Login: NextPage<Props> = (props) => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const username = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      emil: username,
      password: password,
    });

    if (!result?.error) router.push("/");
    else alert(result.error);
  };

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <form
        onSubmit={loginHandler}
        className="flex flex-col w-[20vw] h-[15vw] justify-around text-center"
      >
        <div className="text-4xl">Login</div>
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          className="border-2 shadow-md"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="border-2 shadow-md"
        />
        <Button type="submit">Login</Button>
      </form>
      <div className="mt-[5vw] w-[15vw] text-center flex flex-col justify-around h-[8vw]">
        <div>Not having an account?</div>
        <Button>
          <Link href={"/register"}>Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
