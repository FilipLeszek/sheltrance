import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Props = {
};

const Home: NextPage<Props> = (props) => {
  return (
    <></>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query;
  return {
    props: {
      pid
    },
  };
};

export default Home;
