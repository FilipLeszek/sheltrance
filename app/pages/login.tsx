import Button from "@/components/Button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import LoginStructure from "@/components/login/LoginStructure";
import Input from "@/components/login/Input";

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
      email: username,
      password: password,
    });

    if (result?.ok) {
      router.push("/");
    }
    else {
      alert(result?.error);
    }
  };

  return (
    <LoginStructure>
      <div className="h-full w-[70%] flex flex-col justify-center items-center">
        <form
          onSubmit={loginHandler}
          className="flex flex-col w-full md:h-[25%] xl:h-[35%] justify-around text-center"
        >
          <div className="text-4xl">Zaloguj się</div>
          <Input reference={emailRef} type="text" placeholder="Login" />
          <Input reference={passwordRef} type="password" placeholder="Hasło" />
          <Button type="submit">Zaloguj się</Button>
        </form>
        <div className="flex flex-row w-52 justify-between text-gray-500">
          <div>Nie masz konta?</div>
          <Link href={"/register"} className="underline">Zarejestruj</Link>
        </div>
      </div>
    </LoginStructure>
  );
};

export default Login;
