import {useRouter} from "next/router";
import Page from "@/components/page/Page";

export default function MessagePage() {

  const router = useRouter()
  const id = router.query.id as string

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div>
            <h2>Szczegóły zgłoszenia</h2>
            <section>
              <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div
                  className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
                >
                  <div
                    className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
                  >
                    <h2 className="text-3xl font-bold sm:text-4xl">Załączona wiadomość</h2>
            
                    <p className="mt-4 text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
                      aliquid sint distinctio iure ipsum cupiditate? Quis, odit assumenda?
                      Deleniti quasi inventore, libero reiciendis minima aliquid tempora.
                      Obcaecati, autem.
                    </p>
                  </div>
            
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <a
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    >
                      <h5 className="mt-2 font-bold">Dane klienta</h5>
            
                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
            
                    <a
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    >
                      <h5 className="mt-2 font-bold">Dane kontaktowe</h5>
            
                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
            
                    <a
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    >
            
                      <h5 className="mt-2 font-bold">Wybrane zwierzę</h5>
            
                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
            
                    <a
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    >
            
                      <h5 className="mt-2 font-bold">Data zgłoszenia</h5>
            
                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
            
                    <a
                      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    >
            
                      <h5 className="mt-2 font-bold">Osoba przypisana</h5>
            
                      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <div className="float-right">

              <span
                  className="inline-flex -space-x-px overflow-hidden rounded-md border bg-[#F4694D] shadow-sm mx-10"
                >
                <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                >
                  Powrót
                </button>

                <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                >
                  Zamknij zgłoszenie
                </button>

                <button
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                >
                  Utwórz sprawę adopcyjną
                </button>
              </span>
            </div>
          </div>
        }/>
      </>
  )
}