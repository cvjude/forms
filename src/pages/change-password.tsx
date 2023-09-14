import { FC } from 'react';
import { AuthLayout } from 'layouts/authLayout';
import { ChangePassword } from 'sidepages/changePassword';

const Signup: FC = () => {
  return (
    <AuthLayout>
      <ChangePassword />
    </AuthLayout>
  );
};
export default Signup;
