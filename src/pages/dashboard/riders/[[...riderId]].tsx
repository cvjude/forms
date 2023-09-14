import { FC, useMemo, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Block } from 'assets/icons/block';
import { Dots } from 'assets/icons/dots';
import { Eye } from 'assets/icons/eye';
import loader from 'assets/loader.gif';
import userImg from 'assets/user_icon.png';
import {
  DropDown,
  DropDownChildren,
  DropDownHeader,
} from 'components/dropDown';
import { FilterComp } from 'components/filterComp';
import { SlideLoader } from 'components/loaders/slideLoader';
import { AppPagination } from 'components/pagination';
import { Table, TableBody, Trow } from 'components/table';
import { UsePagination } from 'hooks/usePagination';
import { DashboardLayout } from 'layouts/dashboard';
import { fetchRiders, updateRider } from 'utils/clientSideFunc';
import { QUERY_RIDERS, RIDER_SUSPENDED_STATUS } from 'utils/constants';
import { currencyFormatter } from 'utils/helpers';
import { RiderData } from 'utils/interfaces';

const RiderPage = dynamic(() => import('../../../subPages/riderPage'), {
  ssr: false,
  loading: () => <></>,
});

const headers = [
  { header: '', accessor: 'profilePic' },
  { header: 'Rider Name', accessor: 'rider' },
  { header: 'Phone', accessor: 'phoneNumber' },
  { header: 'Email', accessor: 'email' },
  { header: 'Completed', accessor: 'rides' },
  { header: 'Cancelled', accessor: 'cancelled' },
  { header: 'Total Amount (₦)', accessor: 'totalAmountReceieved' },
  { header: 'Avg Rating ', accessor: 'rating' },
  { header: 'Date Added ', accessor: 'createdAt' },
  { header: 'Actions', accessor: 'actions' },
];

const filters = [
  { name: 'Total Amount', key: 'totalAmountReceieved' },
  { name: 'Avg rating', key: 'rating' },
  { name: 'Date Added', key: 'createdAt' },
];

const Riders: FC = () => {
  const { query } = useRouter();
  const dropDownRef = useRef<any>();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { riderId } = query;

  const {
    params,
    handleFilterChange,
    isReady,
    resetSortFilters,
  } = UsePagination({
    baseRoute: '/dashboard/riders',
    filters,
    exclude: ['riderId'],
  });

  const { data, isFetching, dataUpdatedAt } = useQuery({
    queryKey: [QUERY_RIDERS, params],
    queryFn: fetchRiders,
    placeholderData: {
      paginationMeta: {
        currentPage: 0,
        pageCount: 0,
        pageSize: 0,
        count: 0,
      },
      rows: [],
    },
    enabled: isReady && !riderId?.[0],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: updateRider,
    onSuccess: (rider: any) => {
      const data:
        | {
            paginationMeta: any;
            rows: RiderData[];
          }
        | undefined = queryClient.getQueryData([QUERY_RIDERS, params]);

      const newData = {
        ...data,
        rows: data?.rows?.map((riderData: RiderData) => {
          if (riderData.id === rider.id) {
            return rider;
          }
          return riderData;
        }),
      };

      queryClient.setQueryData([QUERY_RIDERS, params], newData);

      addToast('Rider has been updated', {
        appearance: 'success',
        autoDismiss: true,
      });
    },
    onError: () => {
      addToast('An error occured', {
        appearance: 'error',
        autoDismiss: true,
      });
    },
  });

  const toggleRiderStatus = async (rider: RiderData) => {
    await mutate({
      link: rider.status === RIDER_SUSPENDED_STATUS ? 'unsuspend' : 'suspend',
      riderId: rider?.id || (rider?.riderId as string),
    });
  };

  const closeDropDown = () => {
    dropDownRef.current?.close();
  };

  const riderData = useMemo(
    () => data?.rows?.find((rider: RiderData) => rider.id === riderId),
    [riderId, data?.rows]
  );

  return (
    <>
      {riderId?.[0] && <RiderPage data={riderData} />}
      <DashboardLayout>
        <div className="h-full flex flex-col">
          <div className="flex justify-between mb-10 md:items-center flex-col md:flex-row">
            <h1 className="text-xl font-medium text-theme dark:text-white whitespace-nowrap">
              All Riders
              <SlideLoader showSlider={isFetching} useSystemColor />
            </h1>

            <div className="flex items-end md:items-center flex-col md:flex-row">
              {/* <Button small>
                <Plus className="stroke-current text-inherit mr-5" /> Add New
                Rider
              </Button> */}

              <FilterComp
                handleFilterChange={handleFilterChange}
                resetSortFilters={resetSortFilters}
                filters={filters}
                params={params}
              />
            </div>
          </div>

          <div className="flex-1">
            <Table keys={headers} key={dataUpdatedAt}>
              <TableBody>
                {data?.rows?.map((data: RiderData, i: number) => {
                  return (
                    <Trow
                      key={`delivery_summary_${i}`}
                      values={{
                        rider: `${data.user.firstName} ${data.user.lastName}`,
                        phoneNumber: data.user.phoneNumber,
                        email: data.user.email,
                        rides: data.rides,
                        cancelled: data.cancelled,
                        totalAmountReceieved: currencyFormatter().format(
                          data.totalAmountReceieved || 0
                        ),
                        rating: data.rating,
                        createdAt: format(
                          new Date(data.createdAt),
                          'dd MMM yyyy'
                        ),
                        profilePic: (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={
                                data.user.profilePic
                                  ? `${process.env.NEXT_PUBLIC_IMAGE_KIT_URL}/${data.user.profilePic}`
                                  : userImg
                              }
                              alt={data.user.firstName}
                              width={32}
                              height={32}
                            />
                          </div>
                        ),
                        actions: (
                          <DropDown
                            config={{
                              useClick: true,
                              useBackDrop: false,
                              leftOffset: 200,
                            }}
                            className="!max-w-[150px]"
                            key={data.id}
                            ref={dropDownRef}
                          >
                            <DropDownHeader>
                              <div className="p-3">
                                <Dots className="fill-current text-txt dark:text-white" />
                              </div>
                            </DropDownHeader>
                            <DropDownChildren>
                              <div className="p-3 rounded-md bg-white dark:bg-even-lighter-grey shadow-lg">
                                <Link
                                  href={`/dashboard/riders/${data.id}`}
                                  onClick={closeDropDown}
                                >
                                  <div className="mb-2 text-theme dark:text-white flex">
                                    <Eye className="w-5 h-5 fill-current text-theme dark:text-white mr-5" />
                                    View
                                  </div>
                                </Link>

                                <div
                                  className="mb-2 text-sec dark:text-white flex"
                                  onClick={() => toggleRiderStatus(data)}
                                >
                                  <Block className="w-5 h-5 stroke-current text-sec mr-5" />
                                  {data.status === RIDER_SUSPENDED_STATUS
                                    ? 'Unsuspend'
                                    : 'Suspend'}
                                  {isLoading && (
                                    <div className="w-10 h-5 relative">
                                      <Image
                                        src={loader}
                                        className="w-5 h-5 ml-3"
                                        alt="loading..."
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </DropDownChildren>
                          </DropDown>
                        ),
                      }}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <AppPagination
            params={params}
            meta={data?.paginationMeta}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

// @ts-ignore
Riders.authenticate = {
  isProtected: true,
};

export default Riders;
