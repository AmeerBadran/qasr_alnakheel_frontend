/* eslint-disable react/prop-types */
import UpperTitle from "../components/molecule/UpperTitle";
import comImage from "../assets/images/companyHall2.jpg"
import PageDescription from "../components/atoms/PageDescription";
import ConferenceFeatures from "../components/molecule/ConferenceFeatures";
export default function Hall({hallType}) {
    console.log(hallType)
  return (
    <div className="bg-my-color">
      <UpperTitle
        title="Where work and relaxation come together"
        description="Hotel & Spa Resort Qasr alnkheel resort and Hotel offers well-equipped conference rooms, professional staff, and a beautiful hotel environment"
        withDesc={true}
        imgSrc={comImage}
      />
      <PageDescription
        title="For companies"
        description="Success of business meetings, training and conferences is a result of hard work and right decisions. One of them is a choice of a responsible hotel partner which is at the end of the day reflected in the overall rating of event, satisfaction of your clients, partners and colleagues."
      />
      <ConferenceFeatures/>
    </div>
  );
}
