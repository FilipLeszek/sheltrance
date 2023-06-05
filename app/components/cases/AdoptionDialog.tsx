import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useRef} from "react";
import WorkerButton from "@/components/shelter/workers/WorkerButton";
import DialogInput from "@/components/shelter/workers/DialogInput";

type AdoptionDialogProps = {
  show: boolean,
  setDialogOpen: (state: boolean, errorMessage?: string) => void,
};

const AdoptionDialog: React.FC<AdoptionDialogProps> = (props )=> {
  const animalIdRef = useRef<HTMLInputElement>(null);
  const animalNameRef = useRef<HTMLInputElement>(null);
  const clientNameRef = useRef<HTMLInputElement>(null);
  const clientSurnameRef = useRef<HTMLInputElement>(null);
  const clientContactRef = useRef<HTMLInputElement>(null);

  const createCase = async () => {
    const animalId = parseInt(animalIdRef.current?.value || '');
    const animalName = animalNameRef.current?.value || '';
    const clientName = clientNameRef.current?.value || '';
    const clientSurname = clientSurnameRef.current?.value || '';
    const clientContact = clientContactRef.current?.value || '';

    await addNewCase({
      animalId,
      animalName,
      clientName,
      clientSurname,
      clientContact,
    });
  };

  async function addNewCase(caseInfo: { clientName: string; clientContact: string; clientSurname: string; animalName: string; animalId: number }) {
    const response = await fetch("/api/cases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseInfo),
    });
    if (!response.ok) {
      const message = await response.text();
      props.setDialogOpen(false, message);
    };
    props.setDialogOpen(false);
    //await router.push("/cases");

  }
  return (
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.setDialogOpen}>
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
                  <div
                      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                  >
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Utwórz nową sprawę
                    </Dialog.Title>
                      <DialogInput type="text" name="Id zwierzęcia" ref={animalIdRef}></DialogInput>
                    <DialogInput  type="text" name="Imię zwierzęcia" ref={animalNameRef}></DialogInput>
                    <DialogInput  type="text" name="Imię osoby adoptującej" ref={clientNameRef}></DialogInput>
                    <DialogInput  type="text" name="Nazwisko osoby adoptującej" ref={clientSurnameRef}></DialogInput>
                    <DialogInput type="text" name="Kontakt do osoby adoptującej" ref={clientContactRef}></DialogInput>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <WorkerButton
                          onClick={createCase}
                      >
                        Utwórz
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
                          onClick={() => props.setDialogOpen(false)}
                      >
                        Anuluj
                      </WorkerButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  );
};

export default AdoptionDialog;