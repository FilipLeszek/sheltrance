import {SideMenu} from "@/components/SideMenu";
import styles from './Page.module.css';
import Button from "@/components/Button";
import {signOut} from "next-auth/react";

type Props = {
};

const logoutHandler = () => {
  signOut();
};

export const Page: React.FC<Props> = ({ }) => {
  return <>
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <SideMenu ></SideMenu>
      </div>
      <div className="styles.content">
        <div className="w-full h-40 text-center flex flex-col justify-center items-center ">
          <div className="text-3xl">SHELTRANCE</div>
          <Button onClick={logoutHandler} color="bg-red-500">
            wyloguj
          </Button>
        </div>
      </div>
    </div>
  </>
};