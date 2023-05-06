import Page from "@/components/page/Page";
import Link from "next/link";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type EmployeeInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

let initialEmployees = [
  {id: 1, firstName: "Jan", lastName: 'Janowski', email: 'jan@gmail.com', phoneNumber: '123 123 123'},
  {id: 2, firstName: "Michał", lastName: 'Michałowski', email: 'michal@gmail.com', phoneNumber: '123 123 123'},
  {id: 3, firstName: "Anna", lastName: 'Annowska', email: 'anna@gmail.com', phoneNumber: '123 123 123'},
];

export default function ShelterEmployeesPage() {

  const [employeeArray, setEmployeeArray] = useState(initialEmployees);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedEmployeeID, setEditedEmployeeID] = useState(0);

  const cancelButtonRef = useRef(null)
  
  function handleReset(id: number) {
    setEditedEmployeeID(id)
    alert(`Reset: ${id}`)
  }

  function handleAdd() {
    setDialogOpen(true)
  }

  function handleDelete(employee: EmployeeInfo) {
    setEmployeeArray(employeeArray.filter(e=> e.id !== employee.id))
  }

  function MyDialog(){
    return (
      <Transition.Root show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDialogOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form
                    action=""
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                  >
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Dodaj nowego użytkownika
                  </Dialog.Title>


                   <div>

                  <label
                    htmlFor="UserEmail"
                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span className="text-xs font-medium text-gray-700"> Email </span>

                    <input
                      type="email"
                      id="UserEmail"
                      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </label>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      className="inline-flex items-center gap-2 bg-[#F4694D] rounded px-8 py-3 text-base font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#F4694D]"
                      onClick={() => setDialogOpen(false)}
                    >
                      Dodaj

                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    <button
                      className="inline-flex mr-40 items-center gap-2 bg-gray-200 rounded px-8 py-3 text-base font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-200"
                      onClick={() => setDialogOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Anuluj
                    </button>
                  </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  function EmployeeListItem(props: {employee: EmployeeInfo, edit: boolean}) {
    const employee = props.employee
    return(
      <tr>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
          {employee.id}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
          {employee.firstName}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{employee.lastName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{employee.email}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{employee.phoneNumber}</td>
        <td className="whitespace-nowrap px-4 py-2">
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              <Link href={`workers/edit/${employee.id}`} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="#F4694D" 
                  className="w-6 h-6">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>


              Edytuj
              </Link>
              <button
                className="group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                onClick={() => handleReset(employee.id)}
              >
                  <svg
                    id="lockedIcon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="#F4694D"
                    className="w-6 h-6 group-hover:hidden">
                    <path strokeLinecap="round" 
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <svg 
                    id="unlockedIcon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="#F4694D"
                    className="w-6 h-6 hidden group-hover:block">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>


                Resetuj hasło
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                onClick={() => handleDelete(employee)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="#F4694D" 
                  className="w-6 h-6">

                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>


                Usuń
              </button>
            </div>

        </td>
      </tr>
    )
  }


  return (
      <>
        <Page children={
          
          <div className="ml-20">
            <MyDialog></MyDialog>
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Pracownicy</p>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Imię
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nazwisko
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Numer telefonu
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
          
              <tbody className="divide-y divide-gray-200">
                {employeeArray.map((e) => 
                    <EmployeeListItem employee={e} edit={(editedEmployeeID === e.id)}/>
                 )}
              </tbody>
            </table>


          </div>
          <div className="flex flex-row-reverse mr-4 mt-4">
            <button
              className="inline-flex me-96 items-center gap-2 bg-[#F4694D] rounded px-8 py-3 text-base font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#F4694D]"
              onClick={handleAdd}
            >
              Dodaj pracownika

              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
        }/>
      </>
  )
}