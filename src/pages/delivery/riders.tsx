import { useState, FC } from 'react';
import { GetServerSideProps } from 'next';
import Script from 'next/script';
import { Maps } from 'components/maps';
import { NavBar } from 'components/navBar';
import { RideAddressInfo } from 'components/rideAddressInfo';
import { useAppSelector } from 'hooks/reduxHooks';
import { useGoogleMaps } from 'hooks/useGoogleMaps';
import { axiosInstance } from 'utils/helpers';

interface PageProps {
  categories: any;
}

const Riders: FC<PageProps> = ({ categories }) => {
  const { mapInstance, mapInstanceDiv } = useAppSelector(
    (state) => state.generals
  );

  const [isRefSet, setIsRefSet] = useState(false);
  const { getPlaces } = useGoogleMaps(mapInstance, isRefSet);

  return (
    <>
      <Script strategy="afterInteractive" id="google-map-script">
        {`
          function initMap() {
          }
        `}
      </Script>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
        strategy="afterInteractive"
        onLoad={() => {
          setIsRefSet(true);
        }}
      />
      <main className="min-h-screen min-w-screen flex">
        <NavBar lower />

        <div className="w-screen h-screen absolute opacity-100" id="map-parent">
          <Maps
            mapInstance={mapInstance}
            isRefSet={isRefSet}
            mapInstanceDiv={mapInstanceDiv}
          />
        </div>

        <div className="container mx-auto pt-32">
          <RideAddressInfo getPlaces={getPlaces} categories={categories} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    // Fetch data from external API
    const response = await axiosInstance.get('/category');

    // Pass data to the page via props
    return { props: { categories: response.data.data } };
  } catch (error) {
    console.log(error);
    return { props: { categories: [] } };
  }
};

// @ts-ignore
Riders.authProps = {
  authenticate: true,
};

export default Riders;
