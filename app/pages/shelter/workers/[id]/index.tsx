import {useRouter} from "next/router";
import Page from "@/components/page/Page";
import { useEffect, useState } from "react";
import WorkerButton from "@/components/shelter/workers/WorkerButton";

type EmployeeInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export default function MessagePage() {

  const router = useRouter()
  const id = router.query.id as string

  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [fieldsEdited, setFieldsEdited] = useState(false);


  const infoChangeHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!fieldsEdited){
      return;
    }
    
    const name = employeeFirstName;
    const address = employeeLastName;
    
    const res = await changeEmployeeInfo({
      id: Number(id),
      firstName: employeeFirstName,
      lastName: employeeLastName,
      email: employeeEmail,
      phoneNumber: employeePhoneNumber,
    });
    setFieldsEdited(false);
  };

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFieldsEdited(true);
    const target = event.target;
    let setValue;
    setValue = setEmployeeFirstName;
    if (target.id == "employeeLastName") {
      setValue = setEmployeeLastName;
    } else if (target.id == "employeeEmail") {
      setValue = setEmployeeEmail;
    } else if (target.id == "employeePhoneNumber") {
      setValue = setEmployeePhoneNumber;
    }
    setValue(target.value);
  }

  useEffect(() => {
    async function getData() {
      if(!id) {
        return;
      }
      const response = await fetch(`/api/employees/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setEmployeeFirstName(data.data.firstName);
      setEmployeeLastName(data.data.lastName);
      setEmployeeEmail(data.data.email);
      setEmployeePhoneNumber(data.data.phoneNumber);
    }
    getData();
    
  }, [id])

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div className="w-max">
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Szczegóły pracownika</p>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
              <form
                onSubmit={infoChangeHandler}
                className="flex flex-col w-full md:h-[25%] xl:h-[35%]"
              >

                <div className="">
                  <label htmlFor="firstName" className="block text-xl font-soft text-gray-700">
                    Imię
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    className="w-full rounded-lg border-gray-200 border-2 p-4 pe-12 text-sm shadow-md"
                    value={employeeFirstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="employeeLastName" className="block text-xl font-soft text-gray-700">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    id="employeeLastName"
                    className="w-full rounded-lg border-gray-200 mb-4 border-2 p-4 pe-12 text-sm shadow-md"
                    value={employeeLastName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="employeeEmail" className="block text-xl font-soft text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="employeeEmail"
                    className="w-full rounded-lg border-gray-200 mb-4 border-2 p-4 pe-12 text-sm shadow-md"
                    value={employeeEmail}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="employeePhoneNumber" className="block text-xl font-soft text-gray-700">
                    Numer telefonu
                  </label>
                  <input
                    type="text"
                    id="employeePhoneNumber"
                    className="w-full rounded-lg border-gray-200 mb-4 border-2 p-4 pe-12 text-sm shadow-md"
                    value={employeePhoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="sm:flex">
                  <WorkerButton type="submit" >Zapisz zmiany</WorkerButton>
                  <WorkerButton type="button" mr="ml-6" onClick={() => router.push("/shelter/workers")}>Powrót</WorkerButton>
                </div>
              </form>
            </div>
          </div>
        }/>
      </>
  )
}

async function changeEmployeeInfo(employeeInfo: EmployeeInfo) {
  const response = await fetch("/api/updateEmployee", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeInfo),
  });

  if (!response.ok) alert(await response.text());
  if (response.ok) alert("Zmiany zapisane!");
}
