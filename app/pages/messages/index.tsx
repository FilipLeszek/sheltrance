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

            <div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Status</option>
              <option value="1">Status 1</option>
              <option value="2">Status 2</option>
              <option value="3">Status 3</option>
              <option value="4">Status 4</option>
            </select>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Osoba</option>
                <option value="1">Osoba 1</option>
                <option value="2">Osoba 2</option>
                <option value="3">Osoba 3</option>
                <option value="4">Osoba 4</option>
              </select>
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