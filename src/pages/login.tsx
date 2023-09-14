import { FC } from 'react';
import { AuthLayout } from 'layouts/authLayout';
import { LoginForm } from 'sidepages/login';

const Signup: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
export default Signup;
