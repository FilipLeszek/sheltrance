import {NextPage} from "next";
import {useEffect, useState} from "react";
import Page from "../../components/page/Page";
import WorkerButton from "../../components/shelter/workers/WorkerButton";
import AdoptionDialog from "@/components/cases/AdoptionDialog";
import {AlertMessage} from "@/types/alerts";
import ErrorAlert from "@/components/alerts/ErrorAlert";

export type CaseInfo = {
  id: number;
  createdAt: any;
  clientName: string;
  assignedWorker: any;
  isFinished: boolean;
};

type WorkerDetails = {
 id: number;
 firstName: string;
 lastName: string;
}

type Props = {};

const ShelterCasesPage:  NextPage<Props> = (props) => {
  const [casesArray, setCasesArray] = useState<CaseInfo[]>([]);
  const [filtredCasesArray, setFiltredCasesArray] = useState<CaseInfo[]>([]);
  const [workers, setWorkers] = useState<WorkerDetails[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<AlertMessage>();

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
      setFiltredCasesArray(data.data)
      const tempWorkers: WorkerDetails[] = [];
      casesArray.forEach((item) => {
        const assignedWorker = item.assignedWorker;
        if (assignedWorker) {
          const isUnique = tempWorkers.filter(worker => worker.id === assignedWorker.id)?.length === 0;
          if (isUnique) {
            tempWorkers.push(assignedWorker);
          }
        }
      });
      setWorkers(tempWorkers);

    }
    getData()
  }, [setDialogOpen, dialogOpen, casesArray])

  function CasesListItem(props: {adoptionCase: CaseInfo}) {
    const adoption = props.adoptionCase;
    return(
        <tr key={adoption.id}>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
            {adoption.id}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
            {adoption.createdAt.toString().substring(0, 10)}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{adoption.clientName}</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{adoption.assignedWorker.email}</td>
          <td className="whitespace-nowrap px-4 py-2">
            <div className="inline-flex rounded-lg  p-1">

              <a
                  href={`/cases/${adoption.id}`}
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
      setFiltredCasesArray(casesArray)
    } else{
      setFiltredCasesArray(casesArray.filter(case_ => case_.assignedWorker.id == Number(worker_id)))
    }
  }

  const handleWorkerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getFilteredMessages(e.target.value)
  }

  const onModalClose = (isOpen: boolean, message?: string) => {
    setDialogOpen(isOpen);
    if (message){
      setError({
        title: 'Wystąpił błąd podczas tworzenia sprawy',
        message: message || ''
      });
    }
    else {
      // setError(null)
    }

  }

  // @ts-ignore
  return (<>
        <Page children={
        <div className="mr-2">
          <AdoptionDialog show={dialogOpen} setDialogOpen={onModalClose}></AdoptionDialog>
          <p className="text-4xl font-medium ml-4 mb-10 mt-8">Sprawy adopcyjne</p>
          <div className="mr-[25%] flex align-end justify-end">
              <select onChange={handleWorkerSelect} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option key="all" value="all">Nieprzypisano</option>
                {workers && workers.map(item => {
                    return (
                        <option key={item.id} value={item.id}>
                          {`${item.firstName} ${item.lastName}`}
                        </option>
                    );
                })}
              </select>
          </div>
          <div className="overflow-x-auto mt-2 mr-4 mb-2">
            <table className="w-9/12 divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
              <tr key={'123123123'}>
                {[ "Numer sprawy", "Data utworzenia", "Adoptujący", "Pracownik"].map((h) => {
                      return(
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" key={h}>
                            {h}
                          </th>
                      )
                    }
                )}
                <th className="px-4 py-2"></th>
              </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
              {filtredCasesArray && filtredCasesArray.map((c: CaseInfo) =>
                  <CasesListItem  key={c.id} adoptionCase={c}/>
              )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row-reverse mr-[25%] mt-6 ">
            <WorkerButton onClick={() => {setDialogOpen(true)}}>
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
          <ErrorAlert error={error} time={6000}/>
        </div>
        }/>
      </>
  )
}

export default ShelterCasesPage;