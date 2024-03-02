import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import FunctionRiskAssessment from "./_components/FunctionRiskAssessment";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 ZTrust contracts in an easy way",
});

const Dash: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <FunctionRiskAssessment/>
      </div>
    </>
  );
};

export default Dash;
