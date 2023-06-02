import Link from "next/link";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import styles from './SideMenu.module.css';


type Props = {
};

const logoutHandler = () => {
  signOut();
};

export const SideMenu: React.FC<Props> = ({ }) => {
  const router = useRouter();
  const { data: session } = useSession()

  // @ts-ignore
  return <>
    <div className={`flex h-screen flex-col justify-between border-e ${styles.menu}`}>
      <div className="px-4 py-6">

    <span
        className="h-10 w-32 flex flex-row items-center gap-1 place-content-center rounded-lg bg-[#F4694D] text-xs text-black font-medium"
    >
      {/*<svg width="20" height="20" viewBox="0 0 54 72" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
      {/*                <path d="M5.1605 25.0493C3.47229 24.4633 2.15186 23.2529 1.1992 21.4181C0.246541 19.5834 -0.0800824 17.6289 0.219328 15.5545C0.518738 13.4802 1.3541 11.9331 2.7254 10.9132C4.0967 9.89322 5.62646 9.67627 7.31468 10.2623C9.00289 10.8483 10.3233 12.0587 11.276 13.8934C12.2286 15.7282 12.5553 17.6827 12.2559 19.757C11.9564 21.8314 11.1211 23.3785 9.74978 24.3984C8.37847 25.4184 6.84872 25.6353 5.1605 25.0493ZM19.5515 15.373C17.8633 14.787 16.5428 13.5766 15.5902 11.7419C14.6375 9.90714 14.3109 7.9526 14.6103 5.87827C14.9097 3.80394 15.7451 2.25681 17.1164 1.23689C18.4877 0.216957 20.0175 3.92712e-06 21.7057 0.586024C23.3939 1.17204 24.7143 2.38243 25.667 4.21717C26.6196 6.05191 26.9463 8.00645 26.6468 10.0808C26.3474 12.1551 25.5121 13.7022 24.1408 14.7222C22.7695 15.7421 21.2397 15.959 19.5515 15.373ZM36.2735 21.1777C34.5853 20.5916 33.2649 19.3813 32.3122 17.5465C31.3596 15.7118 31.0329 13.7572 31.3324 11.6829C31.6318 9.60857 32.4671 8.06144 33.8384 7.04151C35.2097 6.02158 36.7395 5.80463 38.4277 6.39065C40.1159 6.97667 41.4364 8.18705 42.389 10.0218C43.3417 11.8565 43.6683 13.8111 43.3689 15.8854C43.0695 17.9597 42.2341 19.5069 40.8628 20.5268C39.4915 21.5467 37.9617 21.7637 36.2735 21.1777ZM46.6312 39.4448C44.943 38.8587 43.6225 37.6484 42.6699 35.8136C41.7172 33.9789 41.3906 32.0243 41.69 29.95C41.9894 27.8757 42.8248 26.3286 44.1961 25.3086C45.5674 24.2887 47.0971 24.0717 48.7853 24.6578C50.4735 25.2438 51.794 26.4542 52.7466 28.2889C53.6993 30.1236 54.0259 32.0782 53.7265 34.1525C53.4271 36.2268 52.5917 37.774 51.2204 38.7939C49.8491 39.8138 48.3194 40.0308 46.6312 39.4448ZM6.72744 60.978C4.85457 60.3278 3.4408 58.9302 2.48614 56.7849C1.53148 54.6396 1.22398 52.3904 1.56363 50.0372C1.89579 47.736 2.75894 45.8924 4.15306 44.5064C5.54719 43.1204 7.00947 41.83 8.5399 40.6352C9.69491 39.7703 10.7929 38.8137 11.8339 37.7655C12.8749 36.7172 13.8773 35.6123 14.841 34.4509C16.4821 32.489 18.2556 30.7457 20.1615 29.2208C22.0673 27.696 24.1796 27.3361 26.4984 28.141C28.8172 28.9459 30.6401 30.6719 31.9672 33.3189C33.2943 35.9659 34.4265 38.7467 35.3638 41.6612C35.9162 43.3489 36.51 44.9934 37.1452 46.5948C37.7803 48.1961 38.5014 49.7698 39.3084 51.3157C40.3644 53.4083 41.3324 55.5423 42.2124 57.7178C43.0925 59.8932 43.3665 62.1315 43.0343 64.4327C42.6946 66.7859 41.7982 68.6172 40.3448 69.9266C38.8915 71.236 37.2284 71.5656 35.3556 70.9155C32.9476 70.0796 30.5975 69.0049 28.3053 67.6914C26.0131 66.3779 23.663 65.3032 21.255 64.4674C18.8471 63.6315 16.4258 63.0499 13.9912 62.7227C11.5567 62.3954 9.13541 61.8138 6.72744 60.978Z" fill="black"/>*/}
      {/*              </svg>*/}
      <p>      Shelterance
</p>
    </span>

        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-4">
          <Link href="/messages"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700
                    ${router.pathname == "/messages" ? styles.menuElementActive : styles.menuElement}` }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
            <span className="text-sm font-medium"> Zgłoszenia </span>
          </Link>


          <Link href="/cases"

            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 
            ${router.pathname == "/cases" ? styles.menuElementActive : styles.menuElement}
           ` }>
            <svg width="22" height="22" viewBox="0 0 54 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.1605 25.0493C3.47229 24.4633 2.15186 23.2529 1.1992 21.4181C0.246541 19.5834 -0.0800824 17.6289 0.219328 15.5545C0.518738 13.4802 1.3541 11.9331 2.7254 10.9132C4.0967 9.89322 5.62646 9.67627 7.31468 10.2623C9.00289 10.8483 10.3233 12.0587 11.276 13.8934C12.2286 15.7282 12.5553 17.6827 12.2559 19.757C11.9564 21.8314 11.1211 23.3785 9.74978 24.3984C8.37847 25.4184 6.84872 25.6353 5.1605 25.0493ZM19.5515 15.373C17.8633 14.787 16.5428 13.5766 15.5902 11.7419C14.6375 9.90714 14.3109 7.9526 14.6103 5.87827C14.9097 3.80394 15.7451 2.25681 17.1164 1.23689C18.4877 0.216957 20.0175 3.92712e-06 21.7057 0.586024C23.3939 1.17204 24.7143 2.38243 25.667 4.21717C26.6196 6.05191 26.9463 8.00645 26.6468 10.0808C26.3474 12.1551 25.5121 13.7022 24.1408 14.7222C22.7695 15.7421 21.2397 15.959 19.5515 15.373ZM36.2735 21.1777C34.5853 20.5916 33.2649 19.3813 32.3122 17.5465C31.3596 15.7118 31.0329 13.7572 31.3324 11.6829C31.6318 9.60857 32.4671 8.06144 33.8384 7.04151C35.2097 6.02158 36.7395 5.80463 38.4277 6.39065C40.1159 6.97667 41.4364 8.18705 42.389 10.0218C43.3417 11.8565 43.6683 13.8111 43.3689 15.8854C43.0695 17.9597 42.2341 19.5069 40.8628 20.5268C39.4915 21.5467 37.9617 21.7637 36.2735 21.1777ZM46.6312 39.4448C44.943 38.8587 43.6225 37.6484 42.6699 35.8136C41.7172 33.9789 41.3906 32.0243 41.69 29.95C41.9894 27.8757 42.8248 26.3286 44.1961 25.3086C45.5674 24.2887 47.0971 24.0717 48.7853 24.6578C50.4735 25.2438 51.794 26.4542 52.7466 28.2889C53.6993 30.1236 54.0259 32.0782 53.7265 34.1525C53.4271 36.2268 52.5917 37.774 51.2204 38.7939C49.8491 39.8138 48.3194 40.0308 46.6312 39.4448ZM6.72744 60.978C4.85457 60.3278 3.4408 58.9302 2.48614 56.7849C1.53148 54.6396 1.22398 52.3904 1.56363 50.0372C1.89579 47.736 2.75894 45.8924 4.15306 44.5064C5.54719 43.1204 7.00947 41.83 8.5399 40.6352C9.69491 39.7703 10.7929 38.8137 11.8339 37.7655C12.8749 36.7172 13.8773 35.6123 14.841 34.4509C16.4821 32.489 18.2556 30.7457 20.1615 29.2208C22.0673 27.696 24.1796 27.3361 26.4984 28.141C28.8172 28.9459 30.6401 30.6719 31.9672 33.3189C33.2943 35.9659 34.4265 38.7467 35.3638 41.6612C35.9162 43.3489 36.51 44.9934 37.1452 46.5948C37.7803 48.1961 38.5014 49.7698 39.3084 51.3157C40.3644 53.4083 41.3324 55.5423 42.2124 57.7178C43.0925 59.8932 43.3665 62.1315 43.0343 64.4327C42.6946 66.7859 41.7982 68.6172 40.3448 69.9266C38.8915 71.236 37.2284 71.5656 35.3556 70.9155C32.9476 70.0796 30.5975 69.0049 28.3053 67.6914C26.0131 66.3779 23.663 65.3032 21.255 64.4674C18.8471 63.6315 16.4258 63.0499 13.9912 62.7227C11.5567 62.3954 9.13541 61.8138 6.72744 60.978Z" fill="black"/>
            </svg>
            <span className="text-sm font-medium"> Sprawy adopcyjne </span>
          </Link>

          {
            session?.user?.role === "manager" &&
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                    className={`flex items-center justify-between rounded-lg px-4 py-2 ${styles.menuElement}`}
                >
                  <div className="flex items-center gap-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                         className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    <span className="text-sm font-medium " > Schronisko </span>
                  </div>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
              />
            </svg>
          </span>
                </summary>

                <nav aria-label="Account Nav" className="mt-2 flex flex-col px-4 gap-2 mr-0">
                  <Link href="/shelter/workers"
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700
                ${router.pathname == "/shelter/workers" ? styles.menuElementActive : styles.menuElement}` }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="text-sm font-medium"> Pracownicy </span>
                  </Link>
                  <Link href="/shelter"

                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700
                ${router.pathname == "/shelter"? styles.menuElementActive : styles.menuElement}` }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium"> Informacje </span>
                  </Link>

                </nav>
              </details>
          }




          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className={`flex items-center justify-between rounded-lg px-4 py-2 ${styles.menuElement}`}
            >
              <div className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span className="text-sm font-medium"> Twoje konto </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
              />
            </svg>
          </span>
            </summary>

            <nav aria-label="Account Nav" className="mt-2 flex flex-col px-4 gap-2">
              <Link href="/settings"

                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700
                ${router.pathname == "/settings" ? styles.menuElementActive : styles.menuElement}` }>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                <span className="text-sm font-medium"> Ustawienia</span>
              </Link>

              <div>
                <button
                    onClick={logoutHandler}
                    className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 ${styles.menuElement}`}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Wyloguj </span>
                </button>
              </div>
            </nav>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{session?.user?.name}</strong>

              <span> {session?.user?.email} </span>

            </p>
          </div>
        </a>
      </div>
    </div>

  </>;
};
