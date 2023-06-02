import {NextPage} from "next";
import {useEffect, useState} from "react";
import Link from "next/link";
import Page from "../../components/page/Page";
import WorkerButton from "../../components/shelter/workers/WorkerButton";


export type CaseInfo = {
  id: number;
  createdAt: any;
  clientName: string;
  assignedWorker:any;
  isFinished: boolean;
};

type CaseBuilder = {
  firstName: string;
  lastName: string;
  email: string;
  shelterId: number;
};


type Props = {};
const ShelterCasesPage:  NextPage<Props> = (props) => {
  const [casesArray, setCasesArray] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/cases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setCasesArray(data.data)
    }
    getData()
  }, [])

  function EmployeeListItem(props: {employee: CaseInfo}) {
    const employee = props.employee
    return(
        <tr>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
            {employee.id}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
            {employee.createdAt}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{employee.clientName}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{employee.assignedWorker.email}</td>
          <td className="whitespace-nowrap px-4 py-2">
            <div className="inline-flex rounded-lg  p-1">

              <a
                  href={`/cases/${employee.id}`}
                  className="inline-block rounded bg-[#F4694D] px-4 py-2 text-xs font-medium text-black hover:bg-indigo-700"
              >
                Podgląd
              </a>
            </div>

          </td>
        </tr>
    )
  }
  // @ts-ignore
  return (<> <Page children={
        <div className="w-min">
          <p className="text-4xl font-medium ml-4 mb-10 mt-8">Sprawy adopcyjne</p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
              <tr>
                {[ "Numer sprawy", "Data utworzenia", "Adoptujący", "Pracownik"].map((h) => {
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
              {casesArray && casesArray.map((e: CaseInfo) =>
                  <EmployeeListItem key={e.id} employee={e}/>
              )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row-reverse mr-4 mt-4">
            <WorkerButton onClick={() => {}}>
              Dodaj sprawę
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


async function addNewCase(caseInfo: { firstName: string; lastName: string; password: string; phoneNumber: string; email: string }) {
  const response = await fetch("/api/cases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(caseInfo),
  });

  if (!response.ok) alert(await response.text());
}
export default ShelterCasesPage;