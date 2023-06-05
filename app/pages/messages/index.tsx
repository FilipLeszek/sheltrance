import Page from "@/components/page/Page";
import styles from "./Messages.module.css";
import { useEffect, useState } from "react";

type WorkerInfo = {
  firstName: String;
  lastName: String;
};

type Messages = {
  id: number;
  date: Date;
  candidateContactInfo: string;
  worker: WorkerInfo | null;
};

export default function MessagesPage() {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [filtredMessages, SetFiltredMessages] = useState<Messages[]>([]);
  const [messageType, setMessageType] = useState<string>("all");
  const [currentContact, setCurrentContact] = useState<string>("all");

  useEffect(() => {
    fetch("/api/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (res_data) => {
          setMessages(res_data.data);
          SetFiltredMessages(res_data.data);
        },
        (err) => {
          return console.error(err);
        }
      );
  }, []);

  const getFilteredMessages = (contact_type: string, message_type: string) => {
    let filteredByContact;
    if (contact_type != "all") {
      filteredByContact = messages.filter(
        (message) => message.id == Number(contact_type)
      );
    } else {
      filteredByContact = messages;
    }
    let filteredByContactAndType;
    if (message_type == "all") {
      filteredByContactAndType = filteredByContact;
    } else if (message_type == "open") {
      filteredByContactAndType = filteredByContact.filter(
        (message) => message.worker != null
      );
    } else {
      filteredByContactAndType = filteredByContact.filter(
        (message) => message.worker == null
      );
    }
    SetFiltredMessages(filteredByContactAndType);
  };

  const handleMessageTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getFilteredMessages(currentContact, e.target.value);
    setMessageType(e.target.value);
  };

  const handleCurrentUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getFilteredMessages(e.target.value, messageType);
    setCurrentContact(e.target.value);
  };

  return (
    <>
      {/*@ts-ignore*/}
      <Page
        children={
          <div>
            <h2>Zgłoszenia</h2>

            <div className={styles.filters}>
              <span className={styles.spacer}></span>
              <select
                onChange={handleMessageTypeSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option key="all" value="all">
                  Wszystkie
                </option>
                <option key="open" value="open">
                  Otwarte
                </option>
                <option key="closed" value="closed">
                  Zamkniete
                </option>
              </select>
              <select
                onChange={handleCurrentUserSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option key="all" value="all">
                  Wszyscy
                </option>
                {messages && messages.length > 0 && [
                  ...new Map(
                    messages.map((item) => [item["candidateContactInfo"], item])
                  ).values(),
                ].map((message) => (
                  <option key={message.id} value={message.id}>
                    {message.candidateContactInfo}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.table}>
              <table className="w-9/12  divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Numer sprawy
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Data stworzenia
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Osoba adoptująca
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Przypisany pracownik
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtredMessages && filtredMessages.map((message) => (
                    <tr key={message.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        #{message.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {message.date.toString().substring(0, 10)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {message.candidateContactInfo}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {message.worker?.firstName} {message.worker?.lastName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href={`/messages/${message.id}`}
                          className="inline-block rounded bg-[#F4694D] px-4 py-2 text-xs font-medium text-black hover:bg-indigo-700"
                        >
                          Podgląd
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      />
    </>
  );
}
