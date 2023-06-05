import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Page from "@/components/page/Page";
import Link from "next/link";
import { useSession } from "next-auth/react";

type WorkerInfo = {
  email: string,
  firstName: string,
  lastName: string
}

type Message = {
  id: number,
  date: Date,
  petName: string,
  candidateFirstName: string,
  candidateLastName: string,
  candidateContactInfo: string,
  isFinished: boolean,
  worker: WorkerInfo | null,
  message: string
}

type MessageInfo = {
  id: number,
  isFinished?: boolean,
  workerEmail?: string,
};

export default function MessagePage() {

  const { data: session } = useSession()
  const { query, isReady} = useRouter()
  
  const [messageDetails, setMessageDetails] = useState({} as Message);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if(!isReady) return;
    if(!refresh) return;

    const id = query.id as string

    async function getData() {
      const response = await fetch(`/api/messages/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setMessageDetails(data.data);
    }
    getData();
    setRefresh(false);
    
  }, [isReady, refresh])

  const handleClosingMessage = async () => {
    
    const res = await changeMessageInfo({
      id: Number(query.id),
      isFinished: true,
    });
    setRefresh(true);
  };

  const handleOpeningMessage = async () => {
    
    const res = await changeMessageInfo({
      id: Number(query.id),
      isFinished: false,
    });
    setRefresh(true);
  };

  const handleTakingMessage = async () => {
    
    const res = await changeMessageInfo({
      id: Number(query.id),
      workerEmail: session?.user?.email as string,
    });
    setRefresh(true);
  };

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div>
          <h2>Szczegóły zgłoszenia</h2>
          <br/>
          <div className="w-max">
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
              <div
                className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
              >
                <h2 className="text-3xl font-bold sm:text-4xl">Załączona wiadomość</h2>
            
                <p className="mt-4 text-gray-600">
                    {messageDetails?.message}
                </p>
              </div>
            </div>
            <p className="text-2xl font-medium ml-6 mt-8">Dodatkowe informacje</p>
            <br/>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">

              <div className="">
                <label className="block text-xl font-soft text-gray-700">
                  Status zgłoszenia: {messageDetails?.isFinished ? "Zamknięte" : "Otwarte"}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Dane klienta: {messageDetails?.candidateFirstName} {messageDetails?.candidateLastName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Wybrane zwierzę: {messageDetails?.petName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Data zgłoszenia: {messageDetails?.date?.toString().substring(0,10)}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Przypisany pracownik: {messageDetails?.worker?.firstName} {messageDetails?.worker?.lastName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Dane kontaktowe: {messageDetails?.candidateContactInfo}
                </label>
              </div>
            </div>
          </div>
          <br/>
            <div className="">
              <span
                  className="inline-flex -space-x-px overflow-hidden rounded-md border bg-[#F4694D] shadow-sm mx-6"
                >
                <Link href={"/messages"}>
                  <button
                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                  >
                    Powrót
                  </button>
                </Link>
                {
                  (session?.user?.email && session?.user?.email == messageDetails?.worker?.email && !messageDetails?.isFinished) && (
                  <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                  onClick={handleClosingMessage}
                >
                  Zamknij zgłoszenie
                </button>
                  )
                }
                {
                  (session?.user?.email && session.user.email == messageDetails?.worker?.email && messageDetails?.isFinished) && (
                  <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                  onClick={handleOpeningMessage}
                >
                  Otwórz zgłoszenie
                </button>
                  )
                }
                {
                  (session?.user?.email && messageDetails?.worker == null) && (
                  <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                  onClick={handleTakingMessage}
                >
                  Podejmij
                </button>
                  )
                }
                {
                  (session?.user?.email && session.user.email == messageDetails?.worker?.email && !messageDetails?.isFinished) && (
                  <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                  onClick={close}
                >
                  Utwórz sprawę adopcyjną
                </button>
                  )
                }
              </span>
            </div>
          </div>
        }/>
      </>
  )
}

async function changeMessageInfo(messageInfo: MessageInfo) {
  const response = await fetch("/api/messages/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageInfo),
  });

  if (!response.ok) alert(await response.text());
}
