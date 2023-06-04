import {useRouter} from "next/router";
import {NextPage} from "next";
import {useEffect, useState} from "react";
import {Adoption} from "../../api/cases/[id]";
import Page from "@/components/page/Page";
import Button from "@/components/Button";
import localFont from "@next/font/local";
import StepOneForm from "@/components/cases/StepOneForm";
import StepTwoForm from "@/components/cases/StepTwoForm";
import StepThreeForm from "@/components/cases/StepThreeForm";
import StepFourForm from "@/components/cases/StepFourForm";

type Props = {};

const AdoptionDetailsPage:  NextPage<Props> = (props) => {

  const router = useRouter()
  const id = router.query.id as string

  const [adoptionDetails, setAdoptionDetails] = useState({} as unknown as Adoption);
  const [formStep, setFormStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/cases/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setAdoptionDetails(data.data)
    }
    getData()
  }, [id])


  const changeStep = (data) => {
    setFormStep(data)
  }
  
  function CurrentStepForm(num: number) {
    switch(num) {
      case 1:
        return <StepOneForm/>;
      case 2:
        return <StepTwoForm/>;
      case 3:
        return <StepThreeForm/>;
      case 4: 
        return <StepFourForm/>;
      default:
        return <StepOneForm/>;
    }
  }
  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div className="w-max">
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Sprawa adopcyjna numer {adoptionDetails.id}</p>
            <div className="mt-1 mb-2 flex">
              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Dane osoby adoptującej</p>
                <div className="">
                  <label className="block text-xl font-soft text-gray-700">
                    Imię: {adoptionDetails.clientName}
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-xl font-soft text-gray-700">
                   Nazwisko: {adoptionDetails.clientSurname}
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-xl font-soft text-gray-700">
                    Dane kontaktowe: {adoptionDetails.clientContact}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Wybrane zwierzę</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    Imię: {adoptionDetails.animalName}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Data rozpoczęcia</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    {adoptionDetails.createdAt}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Osoba przypisana</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    {adoptionDetails.assignedWorker?.id !== null ? adoptionDetails.assignedWorker?.firstName + ' ' + adoptionDetails.assignedWorker?.lastName : 'Brak przypisanego pracownika'}
                  </label>
                </div>
              </div>

            </div>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
              <p className="text-2xl font-medium mt-2 mb-2">Etapy adopcji</p>
                <div
                    className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                >
                  <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                    <li className="flex items-center gap-2 bg-white p-2" onClick={() => changeStep(1)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        1
                      </span>
                      <span className="hidden sm:block"> Rozmowa i ankieta </span>
                    </li>

                    <li className="flex items-center gap-2 bg-white p-2" onClick={() => changeStep(2)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 2 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        2
                      </span>
                      <span className="hidden sm:block"> Zapoznanie w schronisku</span>
                    </li>
                    <li className="flex items-center gap-2 bg-white p-2" onClick={() => changeStep(3)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 3 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        3
                      </span>
                      <span className="hidden sm:block"> Wizyta przedadopcyjna </span>
                    </li>
                    <li className="flex items-center gap-2 bg-white p-2" onClick={() => changeStep(4)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 4 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        4
                      </span>
                      <span className="hidden sm:block"> Podpisanie umowy </span>
                    </li>
                  </ol>
                </div>
            </div>

            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4 mt-2">

              <form // onSubmit={infoChangeHandler}
                  className="flex flex-col w-full md:h-[25%] xl:h-[35%]">
                {CurrentStepForm(formStep)}

              </form>
            </div>

          </div>
        }/>
      </>
  )
}

export default AdoptionDetailsPage;