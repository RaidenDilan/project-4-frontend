angular
  .module('holiday')
  .service('skyscanner', Skyscanner);

Skyscanner.$inject = ['$http', 'API_URL'];
function Skyscanner($http, API_URL) {
  const vm = this;

  function getFlights(destination) {
    return $http
      .get(`${API_URL}/api/flights`, { params: { destination } })
      .then((response) => {
        console.log(response);
        response.data.Quotes.forEach((quote) => {
          const destination = response.data.Places.find((place) => {
            console.log(place);
            return place.PlaceId === quote.OutboundLeg.DestinationId;
          });

          quote.DestinationCity = destination.CityName;
          quote.DestinationCountry = destination.CountryName;

          const carrier = response.data.Carriers.find((carrier) => {
            console.log(carrier);
            return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
          });

          if(carrier) quote.CarrierName = carrier.Name;
        });
        return response.data.Quotes;
      });
  }

  vm.getFlights = getFlights;
}
