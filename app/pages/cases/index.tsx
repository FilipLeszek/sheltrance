import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from './Casses.module.css';
import Page from "../../components/page/Page";
import WorkerButton from "../../components/shelter/workers/WorkerButton";

export type AppUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export type CaseInfo = {
  id: number;
  createdAt: any;
  clientName: string;
  assignedWorker: any;
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
  const [casesArray, setCasesArray] = useState<CaseInfo[]>([]);
  const [filtredCasesArray, SetFiltredCasesArray] = useState<CaseInfo[]>([]);

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
      SetFiltredCasesArray(data.data)
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
            {employee.createdAt.toString().substring(0, 10)}
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

  const getFilteredMessages = (worker_id : string) => {
    if(worker_id == "all"){
      SetFiltredCasesArray(casesArray)
    } else{
      SetFiltredCasesArray(casesArray.filter(case_ => case_.assignedWorker.id == Number(worker_id)))
    }
  }

  const handleWorkerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    getFilteredMessages(e.target.value)
  }

  // @ts-ignore
  return (<> <Page children={
        <div className="w-min">
          <p className="text-4xl font-medium ml-4 mb-10 mt-8">Sprawy adopcyjne</p>
          <div className={styles.filters}>
              <span className={styles.spacer}></span>
              <select onChange={handleWorkerSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option key="all" value="all">Nieprzypisano</option>
                {
                  [...new Map(casesArray.map(item =>
                    [item["assignedWorker"]['id'], item])).values()].map(case_ => 
                    <option key={case_.assignedWorker.id} value={case_.assignedWorker.id}>{case_.assignedWorker.firstName} {case_.assignedWorker.lastName}</option>
                  )
                }
              </select>
          </div>
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
              {filtredCasesArray && filtredCasesArray.map((e: CaseInfo) =>
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