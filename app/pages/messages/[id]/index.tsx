import {useRouter} from "next/router";
import Page from "@/components/page/Page";

export default function MessagePage() {

  const router = useRouter()
  const id = router.query.id as string

  return (
      <>
        {/*@ts-ignore*/}
        <Page children={
          <h2>Szczegóły zgłoszenia numer: {id}</h2>
        }/>
      </>
  )
}