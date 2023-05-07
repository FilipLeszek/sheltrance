import Page from "@/components/page/Page";
import Link from "next/link";
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import WorkerButton from "@/components/shelter/workers/WorkerButton";
import DialogInput from "@/components/shelter/workers/DialogInput";


type EmployeeInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type EmployeeBuilder = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export default function ShelterEmployeesPage() {
  
  const [employeeArray, setEmployeeArray] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedEmployeeID, setEditedEmployeeID] = useState(0);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setEmployeeArray(data.data)
    }
    getData()
  }, [])
  
  function handleReset(id: number) {
    setEditedEmployeeID(id)
    alert(`Reset: ${id}`)
  }

  function handleAdd() {
    setDialogOpen(true)
  }

  const handleNewEmployee = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const phoneNumber = phoneNumberRef.current?.value;
    const password = passwordRef.current?.value;

    await addNewEmployee({
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      phoneNumber: phoneNumber!,
      password: password!,
    });
  }

  function handleDelete(employee: EmployeeInfo) {
    deleteEmployee(employee.id);
    setEmployeeArray(employeeArray.filter(e => e.id !== employee.id))
  }

  function MyDialog(){
    return (
      <Transition.Root show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setDialogOpen}>
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
                    <DialogInput type="text" name="Imię" ref={firstNameRef}></DialogInput>
                  </div>
                  <div>
                    <DialogInput type="text" name="Nazwisko" ref={lastNameRef}></DialogInput>
                  </div>
                  <div>
                    <DialogInput type="email" name="Email" ref={emailRef}></DialogInput>
                  </div>
                  <div>
                    <DialogInput type="tel" name="Nr telefonu" ref={phoneNumberRef}></DialogInput>
                  </div>
                  <div>
                    <DialogInput type="password" name="Hasło" ref={passwordRef}></DialogInput>
                  </div>
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <WorkerButton onClick={handleNewEmployee}>
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
                    </WorkerButton>
                    <WorkerButton
                      color="bg-gray-200"
                      mr="mr-40"
                      onClick={() => setDialogOpen(false)}
                    >
                      Anuluj
                    </WorkerButton>
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
                  strokeWidth="1.5" 
                  stroke="#F4694D" 
                  className="w-6 h-6">

                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
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
          <div className="ml-20 w-min">
            <MyDialog></MyDialog>
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Pracownicy</p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    {["", "Imię", "Nazwisko", "Email", "Numer telefonu"].map((h) => {
                      return(
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {h}
                        </th>
                      )
                    }
                    )}
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
            
                <tbody className="divide-y divide-gray-200">
                  {employeeArray && employeeArray.map((e) => 
                      <EmployeeListItem employee={e} edit={(editedEmployeeID === e.id)}/>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row-reverse mr-4 mt-4">
              <WorkerButton onClick={handleAdd}>
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
              </WorkerButton>
            </div>
          </div>
        }/>
      </>
  )
}

async function addNewEmployee(employeeInfo: EmployeeBuilder) {
  const response = await fetch("/api/createEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeInfo),
  });

  if (!response.ok) alert(await response.text());
}

async function deleteEmployee(id: number) {
  const response = await fetch("/api/deleteEmployee", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: id}),
  });

  if (!response.ok) alert(await response.text());
}