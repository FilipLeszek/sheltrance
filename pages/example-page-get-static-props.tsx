import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type Props = {
  // Add custom props here
};

const ExamplePage: NextPage<Props> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation("common");

  return <>{t("heroTitle")}</>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pl", [
      "common",
      "header",
    ])),
  },
});

export default ExamplePage;
