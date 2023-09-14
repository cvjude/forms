import { useMemo } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

interface PaginationParams {
  baseRoute: string;
  filters?: Array<{ name: string; key: string }>;
  exclude?: Array<string>;
}

interface ReturnFunc {
  params: any;
  isReady: boolean;
  handleFilterChange: (event: any) => void;
  resetSortFilters: () => any;
}

export const UsePagination = (
  paginationParams: PaginationParams
): ReturnFunc => {
  const { query, push, isReady } = useRouter();

  const filteredQuery = useMemo(() => {
    const excludeMap = paginationParams?.exclude?.reduce((acc: any, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    const newQuery: {
      [key: string]: any;
    } = {};

    Object.keys(query || {}).forEach((key) => {
      if (!excludeMap?.[key]) {
        newQuery[key] = query?.[key];
      }
    });

    return newQuery;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const params: any = useMemo(() => {
    if (!isReady) return;

    return {
      currentPage: 1,
      pageLimit: 15,
      keyword: '',
      ...filteredQuery,
    };
  }, [isReady, filteredQuery]);

  const sortFiltersMap = useMemo(() => {
    return paginationParams.filters?.reduce(
      (
        acc: {
          [key: string]: string;
        },
        filter
      ) => {
        acc[filter.key] = filter.name;
        return acc;
      },
      {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;

    const newParams = {
      ...params,
      [name]: value,
    };
    const queryParams = queryString.stringify(newParams);

    changeRoute(queryParams);
  };

  const resetSortFilters = () => {
    const newParams: {
      [key: string]: string;
    } = {};

    Object.keys(params || {}).forEach((key) => {
      if (!sortFiltersMap?.[key]) {
        newParams[key] = params?.[key];
      }
    });

    const queryParams = queryString.stringify(newParams);

    changeRoute(queryParams);
  };

  const changeRoute = (queryParams = '') => {
    push(
      `${paginationParams.baseRoute}${queryParams ? `?${queryParams}` : ''}`
    );
  };

  return {
    params,
    isReady: isReady,
    handleFilterChange,
    resetSortFilters,
  };
};
