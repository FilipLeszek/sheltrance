import Button from "@/components/Button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";
import LoginStructure from "@/components/login/LoginStructure";
import Input from "@/components/login/Input";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { AlertMessage } from "@/types/alerts";
import SuccessAlert from "@/components/alerts/SuccessAlert";

type Props = {};

const ResetPassword: NextPage<Props> = (props) => {
  const router = useRouter();
  const encodedUid = router.query.encodedUid as string;

  const [error, setError] = useState<AlertMessage>();

  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const resetPasswdHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const pwd1 = password1Ref.current?.value;
    const pwd2 = password2Ref.current?.value;

    if (pwd1 !== pwd2) {
      setError({
        title: "Błąd resetowania hasła",
        message: "Podane hasła nie są zgodne.",
      });
      return;
    }

    const res = await fetch(`/api/reset-password`, {
      method: "POST",
      body: JSON.stringify({ encodedUid: encodedUid, newPasswd: pwd1 }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError({ title: "Błąd żądania", message: data.error });
    }
    router.push("/login?reset=1");
  };

  return (
    <LoginStructure>
      <div className="h-full w-[70%] flex flex-col justify-center items-center">
        <form
          onSubmit={resetPasswdHandler}
          className="flex flex-col w-full md:h-[25%] xl:h-[35%] justify-around text-center"
        >
          <div className="text-4xl">Resetowanie hasła</div>
          <Input reference={password1Ref} type="password" placeholder="Hasło" />
          <Input
            reference={password2Ref}
            type="password"
            placeholder="Powtórz hasło"
          />
          <Button type="submit">Zresetuj</Button>
        </form>
      </div>
      <ErrorAlert error={error} />
    </LoginStructure>
  );
};

export default ResetPassword;
