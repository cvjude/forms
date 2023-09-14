import { FC, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Button } from 'components/button';
import { Footer } from 'components/footer';
import { Banner } from 'components/home/banner';
import { ContactUs } from 'components/home/contactUs';
import { InfoSec } from 'components/home/infoSec';
import { MobileApp } from 'components/home/mobileApp';
import { WhyUs } from 'components/home/whyUs';
import { Input } from 'components/input';
import { NavBar } from 'components/navBar';
// import { Numbers } from 'components/numbers';
import { PageSection } from 'components/pageSection';
// import { Testimonies } from 'components/testimonies';
import { useForm } from 'hooks/useForm';
import { axiosInstance } from 'utils/helpers';

const formData = [
  {
    name: 'email',
    placeHolder: 'Your Email',
    errorMsg: 'Email is required',
    valErrorMsg: 'Please enter your email',
    required: true,
    type: 'email',
    example: 'example@domain.com',
    itype: 'text',
    attr: { autoComplete: 'off' },
  },
];

const HomePage: FC = () => {
  const submitButton = useRef();
  const { addToast } = useToasts();

  const {
    handleSubmit,
    handleChange,
    inputTypes,
    errors,
    loading,
    resetInputs,
  } = useForm({
    inputs: formData,
    submitButton,
    cb: async (inputs: any) => {
      await axiosInstance.post('/user/save-email', inputs);

      addToast(`Thanks you for subscribing.`, {
        appearance: 'success',
        autoDismiss: true,
      });

      resetInputs();
    },
  });

  return (
    <main className="bg-[#FAFAFA] dark:bg-theme-dark overflow-hidden">
      <NavBar />
      <Banner />
      <InfoSec />
      <WhyUs />
      <MobileApp />
      {/* <Numbers />
      <Testimonies /> */}
      <ContactUs />
      <div className="bg-white dark:bg-lighter-grey">
        <PageSection minHeight="unset" className="pb-16 flex-col lg:flex-row">
          <div className="lg:mr-20">
            <h2 className="text-txt dark:text-white text-2xl font-semibold mb-3">
              Subscribe to our Newletter
            </h2>
            <p className="text-txt-fade dark:text-off-white">
              Get latest news and update on our products and services.
            </p>
          </div>
          <form className="pt-8 md:pt-0 rounded-xl flex-1 max-w-7xl w-full md:w-unset">
            <div className="flex">
              {formData.map((form, i) => (
                <Input
                  className="mb-0 z-10 flex-1"
                  key={`login_form_${i}`}
                  name={form.name}
                  type={form.type}
                  placeHolder={form.placeHolder}
                  value={inputTypes[form.name]}
                  errorMsg={form.errorMsg}
                  required={form.required}
                  handleChange={handleChange}
                  errors={errors}
                  valErrorMsg={form.valErrorMsg}
                  attr={form.attr}
                  open={true}
                  example={form.example}
                />
              ))}

              <Button
                onClick={handleSubmit}
                loading={loading}
                btnRef={submitButton}
                className="-translate-x-5"
                label={'Subscribe to News letter'}
              >
                Subscribe
              </Button>
            </div>
          </form>
        </PageSection>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
