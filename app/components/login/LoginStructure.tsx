import { ReactNode } from "react";
import Image from "next/image";

const LoginStructure: React.FC<{
  children: ReactNode;
}> = (props) => {
  return (
    <div className="h-screen grid grid-cols-[1.5fr_1fr] grid-rows-1">
      <div className="h-full bg-loginBg flex flex-col pt-[15vh] px-[8vw] font-inter">
        <div className="flex flex-row w-[26rem] justify-between text-left">
          <div className="lg:text-7xl">Shelterance</div>
          <div className="relative w-20 h-20">
            <Image
              src={"/paw.png"}
              alt="paw"
              fill
              style={{ objectFit: "contain" }}
            ></Image>
          </div>
        </div>
        <div className="text-5xl mt-8">
          Wspieramy schroniska w procesie adopcji
        </div>
        <div className="relative w-full h-full mt-20">
          <Image
            src="/Animal shelter _ cozy.png"
            alt="laying cat"
            fill
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
      </div>
      <div className="flex justify-center items-center">{props.children}</div>
    </div>
  );
};

export default LoginStructure;
