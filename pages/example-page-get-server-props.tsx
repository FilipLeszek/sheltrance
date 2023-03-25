import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  // Add custom props here
};

const ExamplePage: NextPage<Props> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pl", [
      "common",
      "header",
    ])),
  },
});

export default ExamplePage;

