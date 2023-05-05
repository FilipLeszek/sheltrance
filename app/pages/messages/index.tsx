import Page from "@/components/page/Page";
import styles from './Messages.module.css';
import { useState } from "react";

export default function MessagesPage() {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
      <>
        <Page children={
          <div>
            <h2>Zgłoszenia</h2>
            <div className="dropdown">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                  onClick={handleDropDown}
                >
                  Status
                  <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
                      <li
                      >
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                          opcja1
                        </a>
                      </li>
                  </ul>
                </div>
              </div>

            <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Nazwa zgłoszenia
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Data
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
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            #1234
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">17.03.2023</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">jan.kowalski@gmail.com</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">Jan Paweł</td>
                          <td className="whitespace-nowrap px-4 py-2">
                            <a
                              href="#"
                              className="inline-block rounded bg-[#F4694D] px-4 py-2 text-xs font-medium text-black hover:bg-indigo-700"
                            >
                              Podgląd
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
          </div>
      }/>
      </>
  )
}