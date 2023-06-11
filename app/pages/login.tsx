import Button from "@/components/Button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import LoginStructure from "@/components/login/LoginStructure";
import Input from "@/components/login/Input";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { AlertMessage } from "@/types/alerts";
import SuccessAlert from "@/components/alerts/SuccessAlert";

type Props = {};

const Login: NextPage<Props> = (props) => {
  const router = useRouter();
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>();
  const [isResetSend, setIsResetSend] = useState<boolean>();
  const [isResetSuccess, setIsResetSuccess] = useState<boolean>();

  useEffect(() => {
    setIsRegisterSuccess(Boolean(router.query.rs));
    setIsResetSuccess(Boolean(router.query.reset));
  });

  const successRegisterAlert: AlertMessage = {
    title: "Poprawnie zarejestrowano",
    message: "Zaloguj się na swoje nowe konto.",
  };
  const resetSendAlert: AlertMessage = {
    title: "Pomyślnie zaczęto resetowanie hasła",
    message: "Link resetujący hasło został wysłany na podany adres email.",
  };
  const resetSuccessAlert: AlertMessage = {
    title: "Pomyślnie zmieniono hasło",
    message: "Prosimy zalogować się używając nowego hasła.",
  };

  const [error, setError] = useState<AlertMessage>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.ok) {
      router.push("/messages?ls=1");
    } else {
      setError({
        title: "Błąd logowania",
        message: "Nie znaleziono użytkownika dla podanych danych.",
      });
    }
  };

  const resetPasswdHandler = async () => {
    const email = emailRef.current?.value;

    if (!email || email.length === 0) {
      setError({
        title: "Nie wprowadzono adresu email",
        message:
          "Aby zresetować hasło należy podać adres email we wskazanym polu.",
      });
      return;
    }

    const res = await fetch(`/api/reset-password?addr=${email}`);
    if (!res.ok) {
      const data = await res.json();
      setError({ title: "Błąd żądania", message: data.error });
    } else {
      setIsResetSend(true);
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
          <Input reference={emailRef} type="text" placeholder="Email" />
          <Input reference={passwordRef} type="password" placeholder="Hasło" />
          <div className="flex flex-row w-48 text-sm justify-between text-gray-500">
            <div>Zapomniałeś hasło?</div>
            <div
              onClick={resetPasswdHandler}
              className="underline cursor-pointer"
            >
              Zresetuj
            </div>
          </div>
          <Button type="submit">Zaloguj się</Button>
        </form>
        <div className="flex flex-row w-52 justify-between text-gray-500">
          <div>Nie masz konta?</div>
          <Link href={"/register"} className="underline">
            Zarejestruj
          </Link>
        </div>
      </div>
      <ErrorAlert error={error} />
      {isRegisterSuccess && <SuccessAlert message={successRegisterAlert} />}
      {isResetSend && <SuccessAlert message={resetSendAlert} />}
      {isResetSuccess && <SuccessAlert message={resetSuccessAlert} />}
    </LoginStructure>
  );
};

export default Login;
