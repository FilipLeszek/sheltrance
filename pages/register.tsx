import Button from "@/components/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import type { User } from "@prisma/client";

type UserBuilder = {
  name: string;
  email: string;
  password: string;
};

type Props = {};

const Register: NextPage<Props> = (props) => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const password1 = passwordRef1.current?.value;
    const password2 = passwordRef2.current?.value;

    if (name!.trim().length <= 4) {
      alert("Username is too short.");
      return;
    }
    if (password1 !== password2) {
      alert("Passwords are not the same.");
      return;
    }
    if (password1?.length === 0) {
      alert("Passwords are empty.");
      return;
    }

    await addUser({ email: email!, password: password1!, name: name!.trim() });

    router.push("/login");
  };

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <div className="flex flex-col w-[20vw] h-[20vw] justify-around text-center">
        <div className="text-4xl">Register</div>
        <input
          ref={nameRef}
          type="text"
          placeholder="Username"
          className="border-2 shadow-md"
        />
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          className="border-2 shadow-md"
        />
        <input
          ref={passwordRef1}
          type="password"
          placeholder="Password"
          className="border-2 shadow-md"
        />
        <input
          ref={passwordRef2}
          type="password"
          placeholder="Repeat password"
          className="border-2 shadow-md"
        />
        <Button onClick={registerHandler}>Register</Button>
      </div>
    </div>
  );
};

async function addUser(userdata: UserBuilder) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  });

  if (!response.ok) alert(await response.text());
}

export default Register;
