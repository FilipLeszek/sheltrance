import Page from "@/components/page/Page";
import styles from './Messages.module.css';
import { useEffect, useState } from "react";

type Messages = {
  id: number,
  date: string,
  candidate: string,
  worker: string
}

export default function MessagesPage() {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  useEffect(() => {
    fetch("/api/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
        return res.json();
    }).then((res_data) => {
        setMessages(res_data.data);
    },(err) => { 
        return console.error(err);
    });
  },[])
  
  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
      <>
        <Page children={
          <div>
            <h2>Zgłoszenia</h2>

            <div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option key="1" value="1">Status 1</option>
              <option key="2" value="2">Status 2</option>
            </select>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {
                messages.map(message => 
                  <option key={message.id} value={message.id}>{message.candidate}</option>
                )
              }
              </select>
            </div>

            <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
                        {
                          messages.map(message =>
                            <tr key={message.id}>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                  #{message.id}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{message.date}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{message.candidate}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{message.worker}</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                  <a
                                    href="#"
                                    className="inline-block rounded bg-[#F4694D] px-4 py-2 text-xs font-medium text-black hover:bg-indigo-700"
                                  >
                                    Podgląd
                                  </a>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
          </div>
      }/>
      </>
  )
}