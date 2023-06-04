import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Page from "@/components/page/Page";
import Link from "next/link";

type WorkerInfo = {
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
  worker: WorkerInfo | null,
  message: string
}

export default function MessagePage() {

  const { query, isReady} = useRouter()
  
  const [messageDetails, setMessageDetails] = useState({} as Message);

  useEffect(() => {
    if(!isReady) return;

    const id = query.id as string

    async function getData() {
      const response = await fetch(`/api/messages/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setMessageDetails(data.data)
    }
    getData()
  }, [isReady])

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
                    {messageDetails.message}
                </p>
              </div>
            </div>
            <p className="text-2xl font-medium ml-6 mt-8">Dodatkowe informacje</p>
            <br/>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">

              <div className="">
                <label className="block text-xl font-soft text-gray-700">
                  Dane klienta: {messageDetails.candidateFirstName} {messageDetails.candidateLastName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Wybrane zwierzę: {messageDetails.petName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                Data zgłoszenia: {messageDetails.date?.toString().substring(0,10)}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                Przypisany pracownik: {messageDetails.worker?.firstName} {messageDetails.worker?.lastName}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                Dane kontaktowe: {messageDetails.candidateContactInfo}
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

                <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                >
                  Zamknij zgłoszenie
                </button>

                {/* <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                >
                  Utwórz sprawę adopcyjną
                </button> */}
              </span>
            </div>
          </div>
        }/>
      </>
  )
}