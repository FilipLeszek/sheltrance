import Button from "@/components/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import LoginStructure from "@/components/login/LoginStructure";
import Input from "@/components/login/Input";
import Link from "next/link";

type UserBuilder = {
  name: string;
  email: string;
  password: string;
  login: string;
  address: string;
};

type Props = {};

const Register: NextPage<Props> = (props) => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const password1 = passwordRef1.current?.value;
    const password2 = passwordRef2.current?.value;
    const login = loginRef.current?.value;
    const address = addressRef.current?.value;

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

    await addUser({
      email: email!,
      password: password1!,
      name: name!.trim(),
      login: login!.trim(),
      address: address!,
    });

    router.push("/login");
  };

  return (
    <LoginStructure>
      <div className="flex flex-col w-[70%] h-[80%] justify-between">
        <div className="text-4xl">Zarejestruj schronisko</div>
        <div className="my-5">
          Uzupełnij podstawowe dane i załóż konto managera. W kolejnym kroku
          możliwe będzie dodanie pracowników.
        </div>
        <Input reference={emailRef} type="email" placeholder="Email" />
        <Input reference={loginRef} type="text" placeholder="Login" />
        <Input reference={passwordRef1} type="password" placeholder="Hasło" />
        <Input reference={passwordRef2} type="password" placeholder="Powtórz hasło" />
        <Input reference={nameRef} type="text" placeholder="Nazwa" />
        <Input reference={addressRef} type="text" placeholder="Adres" />
        <Button onClick={registerHandler}>Zarejestruj</Button>
        <div className="w-full flex justify-center">
          <div className="flex flex-row w-52 justify-between text-gray-500">
            <div>Masz już konto?</div>
            <Link href={"/login"} className="underline">
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>
    </LoginStructure>
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
