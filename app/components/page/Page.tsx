import {SideMenu} from "@/components/side-menu/SideMenu";
import styles from './Page.module.css';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";


// @ts-ignore
export default function Page ({ children }) {
  const router = useRouter();

  const { data: session, status } = useSession()
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }
  if (status == "authenticated") {

    return (
        <>
          <div className={styles.page}>
            <div className={styles.sidebar}>
              <SideMenu ></SideMenu>
            </div>
            <main>
              <div className={styles.content}>
                {children}
                <div className="w-full h-40 text-center flex flex-col justify-center items-center ">
                </div>
              </div>
            </main>
          </div>
        </>
    )
  }

}