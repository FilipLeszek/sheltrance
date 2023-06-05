import Button from "@/components/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import LoginStructure from "@/components/login/LoginStructure";
import Input from "@/components/login/Input";
import Link from "next/link";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { AlertMessage } from "@/types/alerts";

type UserBuilder = {
  name: string;
  email: string;
  password: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type Props = {};

const Register: NextPage<Props> = (props) => {
  const router = useRouter();

  const [error, setError] = useState<AlertMessage>();

  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    const email = emailRef.current!.value;
    const name = nameRef.current!.value;
    const password1 = passwordRef1.current!.value;
    const password2 = passwordRef2.current!.value;
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;
    const phone = phoneRef.current!.value;
    const address = addressRef.current!.value;

    const userData: UserBuilder = {
      email: email,
      password: password1,
      name: name.trim(),
      address: address,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
    };

    const { isError, error: errorData } = checkInputs(userData, password2);

    if (isError) {
      setError(errorData);
      return;
    }

    await addUser(userData);

    router.push({ pathname: "/login", query: { rs: 1 } });
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
        <Input reference={firstNameRef} type="text" placeholder="Imię" />
        <Input reference={lastNameRef} type="text" placeholder="Nazwisko" />
        <Input reference={phoneRef} type="text" placeholder="Numer telefonu" />
        <Input reference={passwordRef1} type="password" placeholder="Hasło" />
        <Input
          reference={passwordRef2}
          type="password"
          placeholder="Powtórz hasło"
        />
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
      <ErrorAlert error={error} />
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

function checkInputs(
  userData: UserBuilder,
  passwd2: string
): { isError: boolean; error: AlertMessage } {
  let error: AlertMessage = { title: "Błąd rejestracji", message: "" };

  const inputsLengthList = Object.values(userData).map(
    (val) => val.trim().length
  );

  if (inputsLengthList.some((val) => val === 0)) {
    error.message = "Proszę wypełnić wszystkie pola tekstowe.";
  } else if (userData.name.trim().length <= 4) {
    error.message = "Login powinien zawierać przynajmniej 4 znaki.";
  } else if (userData.password.length === 0 || passwd2.length === 0) {
    error.message = "Proszę wpisać hasło.";
  } else if (userData.password !== passwd2) {
    error.message = "Podane hasła nie zgadzają się.";
  }
  return { isError: error.message.length !== 0, error: error };
}

export default Register;
