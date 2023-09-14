import { FC, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Wallet } from 'assets/icons/wallet';
import { Button } from 'components/button';
import { ValueChart } from 'components/charts/valueChart';
import { Modal } from 'components/modal';
import { useAppSelector } from 'hooks/reduxHooks';
import { DashboardLayout } from 'layouts/dashboard';
import { TransactionSummary } from 'subPages/transactionSummary';
import { fetchWalletDetails } from 'utils/clientSideFunc';
import { QUERY_CLIENT_GET_WALLET_DETAILS } from 'utils/constants';

const Transactions: FC = () => {
  const { data: walletDetails, isFetching } = useQuery({
    queryKey: QUERY_CLIENT_GET_WALLET_DETAILS,
    queryFn: fetchWalletDetails,
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<any>();

  const { isSuperAdmin } = useAppSelector((state) => state.auth);

  const walletBalance = isSuperAdmin
    ? (walletDetails?.totalcredit || 0) -
      (walletDetails?.totaldebit || 0) -
      Math.abs(walletDetails?.otherBalance || 0)
    : Math.max(
        walletDetails?.totalcredit || 0 - (walletDetails?.totaldebit || 0),
        0
      );

  const pendingBalance = isSuperAdmin
    ? Math.abs(walletDetails?.otherBalance || 0)
    : Math.abs(
        Math.min(
          walletDetails?.totalcredit || 0 - (walletDetails?.totaldebit || 0),
          0
        )
      );

  const withdrawFunds = async () => {
    try {
      setLoading(true);

      // const { data } = await axios.post('/api/withdraw-funds', {
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openWithdrawalModal = () => {
    modalRef.current?.open();
  };

  return (
    <>
      <Modal ref={modalRef} useAutoClose={false}>
        <div className="flex flex-col items-center bg-white p-3 rounded-md">
          <h1 className="text-2xl font-bold mb-5">Withdraw Funds</h1>
          <p className="text-center mb-5">
            Are you sure you want to withdraw funds?
          </p>
          <div className="flex justify-between w-full">
            <Button
              small
              className="w-1/2 mr-5"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </Button>
            <Button
              small
              className="w-1/2 ml-5"
              onClick={withdrawFunds}
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      <DashboardLayout>
        <div className="flex justify-between md:flex-row flex-col-reverse mb-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 w-full md:w-4/5 lg:w-3/5">
            <ValueChart
              label="Wallet Balance"
              value={walletBalance}
              Icon={Wallet}
              isCurrency
              loading={isFetching}
            />

            <ValueChart
              label={isSuperAdmin ? 'Pending Balance' : 'Balance deficit'}
              value={pendingBalance}
              Icon={Wallet}
              isCurrency
              loading={isFetching}
            />
          </div>

          <div>
            <Button
              small
              className="h-fit w-fit mb-5 md:mb-0 border"
              onClick={openWithdrawalModal}
            >
              - Withdraw Funds
            </Button>
          </div>
        </div>

        <TransactionSummary />
      </DashboardLayout>
    </>
  );
};

export default Transactions;
