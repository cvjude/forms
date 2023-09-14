import { useEffect, useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';
import { saveServiceData } from 'redux/reducers/generals';
import { useAppDispatch, useAppSelector } from './reduxHooks';

/* eslint-disable no-undef */
export const useGoogleMaps = (
  _map: google.maps.Map | undefined,
  isRefSet: boolean
): {
  getPlaces: (input: string) => Promise<any>;
  getAddress: (option: any) => Promise<any>;
  geocoderReady: boolean;
  servicesReady: boolean;
} => {
  const { services, geocoder } = useAppSelector((state) => state.generals);

  const dispatch = useAppDispatch();
  const { addToast } = useToasts();

  const setServices = useCallback(
    (placeService: google.maps.places.AutocompleteService) => {
      dispatch(
        saveServiceData({ serviceName: 'services', service: placeService })
      );
    },
    [dispatch]
  );

  const setGeocoder = useCallback(
    (geocoderService: google.maps.Geocoder) => {
      dispatch(
        saveServiceData({ serviceName: 'geocoder', service: geocoderService })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isRefSet) return;

    if (services || geocoder) return;

    const placeService = new google.maps.places.AutocompleteService();
    setServices(placeService);

    const geocoderService = new google.maps.Geocoder();
    setGeocoder(geocoderService);
  }, [isRefSet, services, geocoder, setGeocoder, setServices]);

  const getPlaces = async (input: string) => {
    let responses: Array<{
      name: string;
      value: { address: string; placeId: string };
    }> = [];

    const options = {
      input,
      componentRestrictions: { country: 'ng' },
    };

    if (!services) return;

    try {
      const newresponses: google.maps.places.AutocompleteResponse = await services.getPlacePredictions(
        options
      );

      responses = newresponses.predictions.map(
        (prediction: google.maps.places.AutocompletePrediction) => ({
          name: prediction.description,
          value: {
            address: prediction.description,
            placeId: prediction.place_id,
          },
        })
      );
    } catch (err) {
      addToast('An error occured', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });

      console.log(err);
    }

    return responses;
  };

  const getAddress = useCallback(
    async (option: { location: google.maps.LatLng }) => {
      let address: google.maps.GeocoderResult = {} as google.maps.GeocoderResult;

      if (!geocoder) return;

      try {
        const newAddresses: google.maps.GeocoderResponse = await geocoder.geocode(
          {
            ...option,
          }
        );

        const filteredAddress = newAddresses.results.filter(
          (address: google.maps.GeocoderResult) =>
            !address.formatted_address.includes('Unnamed Road')
        );
        address = filteredAddress[0];
      } catch (err) {
        addToast('An error occured', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });

        console.log(err);
      }

      return address;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geocoder]
  );

  // const setMarker = (pos: Position, name: string, maps: google.maps.Map) => {
  //   let marker = locationMarker[name];

  //   if (!marker) {
  //     marker = new google.maps.Marker({
  //       position: pos,
  //       map: mapInstance || maps,
  //       title: name,
  //       icon: {
  //         url: name === 'pAddress' ? '/location-blue.svg' : '/location-red.svg',
  //         scaledSize: new google.maps.Size(40, 40),
  //       },
  //     });
  //   }

  //   marker?.setPosition(pos);
  //   dispatch(setLocationMarker({marker, name}));
  //   getAddress({ location: pos }).then((res) =>
  //     dispatch(updateMapLocation(res))
  //   );
  // };

  return {
    getPlaces,
    getAddress,
    geocoderReady: geocoder !== null,
    servicesReady: services !== null,
  };
};
