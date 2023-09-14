import React, { FC, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import Cookies from 'js-cookie';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { PrivateRoute } from 'components/privateRoute';
import { useAppDispatch } from 'hooks/reduxHooks';
import { ModalMessageWrapper } from 'layouts/modalMessageWrapper';
import { login } from 'redux/reducers/user';
// import { getAppData, initializeStore } from 'utils/config';
import { EXCLUDED_PAGES, TOKEN_COOKIE_NAME } from 'utils/constants';
import { IMAGE_KIT_BASE_URL } from 'utils/extConstants';
import { axiosInstance } from 'utils/helpers';
import { wrapper } from '../redux/store';
import '../styles/tailwind_index.scss';
import '../styles/index.scss';
import 'swiper/swiper-bundle.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnMount: false,
    },
  },
});

const App: FC<{
  pageProps: any;
  Component: any;
}> = ({ pageProps, Component }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initializeClient = async () => {
    if (!EXCLUDED_PAGES.includes(router.pathname)) {
      // only login if the pages are not signin and signup
      dispatch(login());
    }
  };

  useEffect(() => {
    initializeClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (
          err.response?.status === 401 &&
          !EXCLUDED_PAGES.includes(router.pathname)
        ) {
          console.log('Removing token');
          Cookies.remove(TOKEN_COOKIE_NAME);
          location.href = `/login?redirect=${router.asPath}`;
        }
        return Promise.reject(err);
      }
    );
  }, [router]);

  const AnyComponent = Component as any;
  const authProps = (Component as any).authenticate;

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://helloo-delivery.com/',
          site_name: 'Hello Delivery',
          images: [
            {
              url: `${IMAGE_KIT_BASE_URL}/img_url.png`,
              width: 800,
              height: 600,
              alt: 'Landing image',
              type: 'image/png',
            },
            {
              url: `${IMAGE_KIT_BASE_URL}/mobile-app.png`,
              width: 500,
              height: 987,
              alt: 'Mobile App',
              type: 'image/png',
            },
            { url: `${IMAGE_KIT_BASE_URL}/img_url.png` },
          ],
        }}
        twitter={{
          handle: '@hellooDelivery',
          site: '@hellooDelivery',
          cardType: 'summary_large_image',
        }}
        title="Hello Delivery | Delivery at your doorstep"
        description="We are your fast and quality courier service in Nigeria. We deliver to your doorstep in minutes."
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/logo192.png',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
      />
      <ToastProvider>
        <ModalMessageWrapper>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {authProps ? (
              <PrivateRoute authProps={authProps}>
                <AnyComponent {...pageProps} />
              </PrivateRoute>
            ) : (
              <AnyComponent {...pageProps} />
            )}
          </QueryClientProvider>
        </ModalMessageWrapper>
      </ToastProvider>
    </>
  );
};

const HelloDeliveryApp = ({ Component, ...rest }: AppProps): any => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <App pageProps={props.pageProps} Component={Component} />
    </Provider>
  );
};

// HelloDeliveryApp.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (context: any) => {
//     if (typeof window === 'undefined' && context?.ctx?.req?.headers?.cookie) {
//       if (!EXCLUDED_PAGES.some((page) => context.ctx.asPath.includes(page))) {
//         const appData = await getAppData(context);

//         // @ts-ignore
//         store.dispatch(initializeStore(appData)); // You can dispatch initial actions here

//         return {
//           // You can return any props you want
//           pageProps: {
//             userProfile: appData?.userProfile,
//           },
//         };
//       }
//     }
//   }
// );

export default HelloDeliveryApp;
