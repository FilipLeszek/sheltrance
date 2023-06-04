import Button from "@/components/Button";
import Page from "@/components/page/Page";
import { useEffect, useState } from "react";

type ShelterInfo = {
  name: string;
  address: string;
  employeeCount: number;
  openCases: number;
  closedCases: number;
};

type ShelterData = {
  name: string;
  address: string;
};

export default function ShelterDetailsPage() {
  const [shelter, setShelter] = useState({name: "", address: "", employeeCount: 0, openCases: 0, closedCases: 0});
  const [shelterName, setShelterName] = useState("");
  const [shelterAddress, setShelterAddress] = useState("");
  const [fieldsEdited, setFieldsEdited] = useState(false);


  const infoChangeHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!fieldsEdited){
      return;
    }
    
    const name = shelterName;
    const address = shelterAddress;
    
    const res = await changeShelterData({
      name: name!,
      address: address!,
    });
    setFieldsEdited(false);
  };

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFieldsEdited(true);
    const target = event.target;
    let setValue;
    setValue = setShelterName;
    if (target.id == "shelterAddress") {
      setValue = setShelterAddress;
    } 
    setValue(target.value);
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/shelter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = await response.json();
      setShelter(data.data);
      setShelterName(data.data.name);
      setShelterAddress(data.data.address);
    }
    getData();
    
  }, [])

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <div className="w-max">
            <p className="text-4xl font-medium ml-4 mb-10 mt-8">Schronisko</p>
            <p className="text-2xl font-medium ml-6 mt-8">Dane</p>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">
              <form
                onSubmit={infoChangeHandler}
                className="flex flex-col w-full md:h-[25%] xl:h-[35%]"
              >

                <div className="">
                  <label htmlFor="shelterName" className="block text-xl font-soft text-gray-700">
                    Nazwa
                  </label>

                  <input
                    type="text"
                    id="shelterName"
                    className="w-full rounded-lg border-gray-200 border-2 p-4 pe-12 text-sm shadow-md"
                    value={shelterName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="shelterAddress" className="block text-xl font-soft text-gray-700">
                    Adres
                  </label>
                  <input
                    type="text"
                    id="shelterAddress"
                    className="w-full rounded-lg border-gray-200 mb-4 border-2 p-4 pe-12 text-sm shadow-md"
                    value={shelterAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit">Zapisz zmiany</Button>
              </form>
            </div>
            <p className="text-2xl font-medium ml-6 mt-8">Statystyki</p>
            <div className="ml-6 bg-slate-200 rounded-lg pl-4 pr-8 py-4">

              <div className="">
                <label className="block text-xl font-soft text-gray-700">
                  Liczba pracowników: {shelter.employeeCount}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Otwarte sprawy adopcyjne: {shelter.openCases}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xl font-soft text-gray-700">
                  Zamknięte sprawy adopcyjne: {shelter.closedCases}
                </label>
              </div>
            </div>
          </div>
        }/>
      </>
  )
}

async function changeShelterData(shelterData: ShelterData) {
  const response = await fetch("/api/shelter/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shelterData),
  });

  if (!response.ok) alert(await response.text());
  if (response.ok) alert("Zmiany zapisane!");
}
