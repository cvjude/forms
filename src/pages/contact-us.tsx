/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
// import Image from 'next/image';
import { Solidlocation } from 'assets/icons/solidlocation';
import { NavBar } from 'components/navBar';
import { ContactUsForm } from 'sidepages/contactUsForm';
import { IMAGE_KIT_BASE_URL } from 'utils/extConstants';

const Company: FC = () => {
  return (
    <main className="bg-[#FAFAFA] dark:bg-theme-dark overflow-hidden min-h-screen flex">
      <NavBar />

      <div className="flex-grow flex-center">
        <div
          className="mt-20 flex w-full mx-auto container justify-between items-center relative flex-col lg:flex-row"
          style={{ minHeight: '650px' }}
        >
          <Solidlocation className="fill-current text-sec w-7 h-10 absolute -top-16 lg:-top-32 left-48" />
          <Solidlocation className="fill-current text-theme w-10 h-20 absolute -bottom-16 lg:-bottom-10 right-1/2 hidden lg:block" />

          <img
            src={`${IMAGE_KIT_BASE_URL}/contact-illus.png`}
            alt="Contact us"
            className="h-7/10 max-h-96 absolute -z-1 -top-44 lg:static"
            style={{
              maxHeight: '530px',
            }}
          />

          <div className="w-full right-24 top-0 static lg:absolute lg:max-w-sm xl:max-w-lg z-20">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Company;
