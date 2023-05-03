import {SideMenu} from "@/components/side-menu/SideMenu";
import styles from './Page.module.css';
import Button from "@/components/Button";
import {signOut} from "next-auth/react";

const logoutHandler = () => {
  signOut();
};

// @ts-ignore
export default function Page ({ children }) {
  return (
      <>
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <SideMenu ></SideMenu>
      </div>
      <main>
        <div className="styles.content">
          {children}
          <div className="w-full h-40 text-center flex flex-col justify-center items-center ">
            <Button onClick={logoutHandler} color="bg-red-500">
              wyloguj
            </Button>
          </div>
        </div>
      </main>
    </div>
  </>
  )
}