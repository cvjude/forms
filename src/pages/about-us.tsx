import { FC } from 'react';
import { Banner } from 'components/contact/banner';
import { DeliveryProcess } from 'components/contact/deliveryProcess';
import { InfoSec } from 'components/contact/infoSec';
import { Footer } from 'components/footer';
// import { Numbers } from 'components/numbers';
// import { Testimonies } from 'components/testimonies';
import { NavBar } from 'components/navBar';

const Company: FC = () => {
  return (
    <main className="bg-[#FAFAFA] dark:bg-theme-dark overflow-hidden">
      <NavBar />
      <div className="relative">
        <Banner />
      </div>
      <InfoSec />
      <DeliveryProcess />
      {/* <Numbers />
      <Testimonies /> */}
      <Footer />
    </main>
  );
};

export default Company;
