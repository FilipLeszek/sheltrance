import {useRouter} from "next/router";
import {NextPage} from "next";
import {useEffect, useState} from "react";
import {Adoption} from "../../api/cases/[id]";
import Page from "@/components/page/Page";
import StepOneForm from "@/components/cases/StepOneForm";
import StepTwoForm from "@/components/cases/StepTwoForm";
import StepThreeForm from "@/components/cases/StepThreeForm";
import StepFourForm from "@/components/cases/StepFourForm";
import Button from "@/components/Button";

type Props = {};

const AdoptionDetailsPage:  NextPage<Props> = (props) => {

  const router = useRouter()
  const id = router.query.id;

  const [adoptionDetails, setAdoptionDetails] = useState({} as unknown as Adoption);
  const [formStep, setFormStep] = useState(1);

  const [firstStepDate, setFirstStepDate] = useState("");
  const [firstStepFinish, setFirstStepFinish] = useState("");
  const [firstStepComment, setFirstStepComment] = useState("");

  const [secondStepDate, setSecondStepDate] = useState("");
  const [secondStepFinish, setSecondStepFinish] = useState("");
  const [secondStepComment, setSecondStepComment] = useState("");

  const [thirdStepDate, setThirdStepDate] = useState("");
  const [thirdStepFinish, setThirdStepFinish] = useState("");
  const [thirdStepComment, setThirdStepComment] = useState("");

  const [fourthStepDate, setFourthStepDate] = useState("");
  const [fourthStepFinish, setFourthStepFinish] = useState("");
  const [fourthStepComment, setFourthStepComment] = useState("");

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
      setFirstStepFinish(data.data?.stages[0]?.isFinished);
      setFirstStepComment(data.data?.stages[0]?.description);
      setFirstStepDate(data.data?.stages[0]?.dateFinished);

      setSecondStepFinish(data.data?.stages[1]?.isFinished);
      setSecondStepComment(data.data?.stages[1]?.description);
      setSecondStepDate(data.data?.stages[1]?.dateFinished);

      setThirdStepFinish(data.data?.stages[2]?.isFinished);
      setThirdStepComment(data.data?.stages[2]?.description);
      setThirdStepDate(data.data?.stages[2]?.dateFinished);

      setFourthStepFinish(data.data?.stages[3]?.isFinished);
      setFourthStepComment(data.data?.stages[3]?.description);
      setFourthStepDate(data.data?.stages[3]?.dateFinished);
    }
    getData()
  }, [id])


  const changeStep = (data: any) => {
    setFormStep(data)
  }
  
  function CurrentStepForm(num: number) {
    switch(num) {
      case 1:
        return <StepOneForm firstStepComment={firstStepComment} firstStepDate={firstStepDate} firstStepFinish={firstStepFinish} onInputDate={(e) => setFirstStepDate(e.target.value)} onInputComment={(e) => setFirstStepComment(e.target.value)} onInputFinished={(e) => setFirstStepFinish(e.target.checked)}/>;
      case 2:
        return <StepTwoForm secondStepComment={secondStepComment} secondStepDate={secondStepDate} secondStepFinish={secondStepFinish} onInputDate={(e) => setSecondStepDate(e.target.value)} onInputComment={(e) => setSecondStepComment(e.target.value)} onInputFinished={(e) => setSecondStepFinish(e.target.checked)}/>;
      case 3:
        return <StepThreeForm thirdStepComment={thirdStepComment} thirdStepDate={thirdStepDate} thirdStepFinish={thirdStepFinish} onInputDate={(e) => setThirdStepDate(e.target.value)} onInputComment={(e) => setThirdStepComment(e.target.value)} onInputFinished={(e) => setThirdStepFinish(e.target.checked)}/>;
      case 4: 
        return <StepFourForm fourthStepComment={fourthStepComment} fourthStepDate={fourthStepDate} fourthStepFinish={fourthStepFinish} onInputDate={(e) => setFourthStepDate(e.target.value)} onInputComment={(e) => setFourthStepComment(e.target.value)} onInputFinished={(e) => setFourthStepFinish(e.target.checked)}/>;
      default:
        return <StepOneForm firstStepComment={firstStepComment} firstStepDate={firstStepDate} firstStepFinish={firstStepFinish} onInputDate={(e) => setFirstStepDate(e.target.value)} onInputComment={(e) => setFirstStepComment(e.target.value)} onInputFinished={(e) => setFirstStepFinish(e.target.checked)}/>;
    }
  }

  const saveChanges = async () => {
    const adoptionInfo = {
      firstStepDate: firstStepDate,
      firstStepFinish: firstStepFinish,
      firstStepComment: firstStepComment,
      secondStepDate: secondStepDate,
      secondStepFinish: secondStepFinish,
      secondStepComment: secondStepComment,
      thirdStepDate: thirdStepDate,
      thirdStepFinish: thirdStepFinish,
      thirdStepComment: thirdStepComment,
      fourthStepDate: fourthStepDate,
      fourthStepFinish: fourthStepFinish,
      fourthStepComment: fourthStepComment,
      id: adoptionDetails.id,
      firstStageId: adoptionDetails.stages[0].id,
      secondStageId: adoptionDetails.stages[1].id,
      thirdStageId: adoptionDetails.stages[2].id,
      fourthStageId: adoptionDetails.stages[3].id,
    };
    const response = await fetch(`/api/cases/${adoptionDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptionInfo),
    });
    if (response.ok) {
    }
    if (!response.ok) alert(await response.text());
  }

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div className="w-max">
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Sprawa adopcyjna numer {adoptionDetails?.id}</p>
            <div className="mt-1 mb-2 flex">
              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Dane osoby adoptującej</p>
                <div className="">
                  <label className="block text-xl font-soft text-gray-700">
                    Imię: {adoptionDetails?.clientName}
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-xl font-soft text-gray-700">
                   Nazwisko: {adoptionDetails?.clientSurname}
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-xl font-soft text-gray-700">
                    Dane kontaktowe: {adoptionDetails?.clientContact}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Wybrane zwierzę</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    Imię: {adoptionDetails?.animalName}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Data rozpoczęcia</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    {adoptionDetails?.createdAt?.toString().substring(0, 10)}
                  </label>
                </div>
              </div>

              <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
                <p className="text-2xl font-medium mt-1 mb-1">Osoba przypisana</p>
                <div>
                  <label className="block text-xl font-soft text-gray-700">
                    {(adoptionDetails?.assignedWorker && adoptionDetails?.assignedWorker?.id && true) ? adoptionDetails?.assignedWorker?.firstName + ' ' + adoptionDetails?.assignedWorker?.lastName : 'Brak przypisanego pracownika'}
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
                    <li className="flex items-center gap-2 bg-white p-2 cursor-pointer" onClick={() => changeStep(1)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        1
                      </span>
                      <span className="hidden sm:block"> Rozmowa i ankieta </span>
                    </li>

                    <li className="flex items-center gap-2 bg-white p-2 cursor-pointer" onClick={() => changeStep(2)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 2 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        2
                      </span>
                      <span className="hidden sm:block"> Zapoznanie w schronisku</span>
                    </li>
                    <li className="flex items-center gap-2 bg-white p-2 cursor-pointer" onClick={() => changeStep(3)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 3 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        3
                      </span>
                      <span className="hidden sm:block"> Wizyta przedadopcyjna </span>
                    </li>
                    <li className="flex items-center gap-2 bg-white p-2 cursor-pointer" onClick={() => changeStep(4)}>
                      <span className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold ${formStep === 4 ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                        4
                      </span>
                      <span className="hidden sm:block"> Podpisanie umowy </span>
                    </li>
                  </ol>
                </div>
            </div>

            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4 mt-2">

              <form
                  className="flex flex-col w-full md:h-[25%] xl:h-[35%]">
                {adoptionDetails && CurrentStepForm(formStep)}

              </form>
            </div>
            <footer className="flex align-end justify-end mt-2">
              <Button onClick={() => saveChanges()} type="submit" >Zapisz zmiany</Button>
            </footer>

          </div>
        }/>
      </>
  )
}

export default AdoptionDetailsPage;