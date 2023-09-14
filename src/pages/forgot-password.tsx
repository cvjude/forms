import { FC } from 'react';
import { AuthLayout } from 'layouts/authLayout';
import { ForgotPassword } from 'sidepages/forgotPassword';

const Signup: FC = () => {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
};
export default Signup;
