import { FC } from 'react';
import { AuthLayout } from 'layouts/authLayout';
import { SignUpForm } from 'sidepages/signup';

const Signup: FC = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
export default Signup;
