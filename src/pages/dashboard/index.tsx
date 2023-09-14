import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { endOfMonth, startOfMonth, startOfYear } from 'date-fns';
import dynamic from 'next/dynamic';
import { ChartTitleRangePicker } from 'components/charts/chartTitleRangePicker';
import { CustomLineChart } from 'components/charts/lineChart';
import { ValueChart } from 'components/charts/valueChart';
import { EarningsTooltip } from 'components/earningsToolTip';
import { filterDates, transformSummaryData } from 'components/helpers';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { DashboardLayout } from 'layouts/dashboard';
import { RiderSummaryData } from 'subPages/summaryData';
import {
  fetchDashBoardEarnings,
  fetchDashboardMetrics,
  getUserOrganization,
} from 'utils/clientSideFunc';
import {
  QUERY_CLIENT_DASHBOARD_EARNINGS,
  QUERY_CLIENT_DASHBOARD_METRICS,
  QUERY_CLIENT_ORGANIZATION,
} from 'utils/constants';
import { SummaryProps } from 'utils/interfaces';

const OrganizationRegistration = dynamic(
  () => import('../../sidepages/organizationRegistration'),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const dateDefaults = {
  startOM: startOfMonth(new Date().setHours(0, 0, 0, 0)),
  endOM: endOfMonth(new Date().setHours(0, 0, 0, 0)),
  startOY: startOfYear(new Date().setHours(0, 0, 0, 0)),
};

const Summary: FC<SummaryProps> = () => {
  const dispatch = useAppDispatch();
  const { user, isSuperAdmin } = useAppSelector((state) => state.auth);
  const [hasOrganization] = useState<boolean>(!!user?.organization);
  const [date, setDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dateDefaults.startOM,
    endDate: dateDefaults.endOM,
  });

  const [earningsdate, setEarningsDate] = useState({
    startDate: dateDefaults.startOM,
    endDate: dateDefaults.endOM,
  });

  const [timeFrame, setTimeFrame] = useState<number>(0);
  const [earningsData, setEarningsData] = useState<any>([]);

  const organization = useQuery({
    queryKey: QUERY_CLIENT_ORGANIZATION,
    queryFn: () => getUserOrganization(dispatch),
    enabled: !hasOrganization && !isSuperAdmin,
  });

  const metrics = useQuery({
    queryKey: [QUERY_CLIENT_DASHBOARD_METRICS, date],
    queryFn: fetchDashboardMetrics,
  });

  const earnings = useQuery({
    queryKey: [QUERY_CLIENT_DASHBOARD_EARNINGS, timeFrame],
    queryFn: fetchDashBoardEarnings,
  });

  const [filteredEarningsData, setFilteredEarningsData] = useState<any>([]);

  useEffect(() => {
    setEarningsData((prev: any) => {
      const newdata = [...prev, ...(earnings.data || [])];
      setFilteredEarningsData(
        filterDates(earningsdate.startDate, earningsdate.endDate, newdata)
      );

      return newdata.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnings.dataUpdatedAt]);

  const dataMetrics = useMemo(() => transformSummaryData(metrics.data), [
    metrics,
  ]);

  const handleMetricDateChange = (
    _name: string,
    date: {
      startDate: Date;
      endDate: Date;
    }
  ) => {
    setDate(date);
  };

  const handleEarningsDateChange = (
    _name: string,
    date: {
      startDate: Date;
      endDate: Date;
    }
  ) => {
    // check if the date is in the current year
    setEarningsDate(date);

    if (date.startDate.getTime() >= dateDefaults.startOY.getTime()) {
      const data = filterDates(date.startDate, date.endDate, earningsData);
      setFilteredEarningsData(data);
    } else setTimeFrame((prev) => prev + 1);
  };

  return (
    <>
      {!hasOrganization && !isSuperAdmin && !organization.isLoading && (
        <OrganizationRegistration initialModalState={!user?.organization} />
      )}

      <DashboardLayout>
        <ChartTitleRangePicker
          title="Summary"
          onChange={handleMetricDateChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {dataMetrics.dataSetOne.map(
            ({ label, value, Icon, isCurrency }, i) => (
              <ValueChart
                key={`summary_value_chart_${i}`}
                label={label}
                value={value}
                isCurrency={isCurrency}
                Icon={Icon}
                loading={
                  label === 'Active Deliveries'
                    ? metrics.isRefetching
                    : metrics.isLoading
                }
              />
            )
          )}
        </div>

        <div className="flex flex-col-reverse xl:grid grid-cols-[66%_calc(34%-20px)] gap-5 mb-10">
          <CustomLineChart
            label="Earnings"
            handleDateChange={handleEarningsDateChange}
            data={filteredEarningsData}
            YdataKeys={['amount']}
            XdataKey="label"
            loading={earnings.isRefetching || earnings.isLoading}
            CustomToolTip={EarningsTooltip}
          />

          <div className="flex-grow-1 grid gap-5 grid-rows-0 xl:grid-rows-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
            {dataMetrics.dataSetTwo.map(({ label, value, Icon, themed }, i) => (
              <ValueChart
                key={`summary_value_chart_${i}`}
                label={label}
                value={value}
                Icon={Icon}
                themed={themed}
                loading={metrics.isRefetching || metrics.isLoading}
              />
            ))}
          </div>
        </div>

        <RiderSummaryData />
      </DashboardLayout>
    </>
  );
};

// @ts-ignore
Summary.authenticate = {
  isProtected: true,
};

export default Summary;
