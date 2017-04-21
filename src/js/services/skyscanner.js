angular
  .module('holiday')
  .service('skyscanner', Skyscanner);

Skyscanner.$inject = ['$http', 'API_URL'];
function Skyscanner($http, API_URL) {
  const vm = this;

  function getFlights(origin, destination, departDate, returnDate) {
    return $http
      .get(`${API_URL}/flights`, { params: { origin, destination, departDate, returnDate } })
      .then((response) => {
        console.log('skyscanner response service', response);
        console.log('service destination', destination);
        response.data.Quotes.forEach((quote) => {
          const destination = response.data.Places.find((place) => {
            // console.log('skyscanner place', place);
            return place.PlaceId === quote.OutboundLeg.DestinationId;
            // return place.PlaceId === quote.OutboundLeg.IataCode
          });

          quote.DestinationCity = destination.CityName;
          quote.DestinationCountry = destination.CountryName;
          quote.DestinationAirport = destination.CityId;
          quote.DestinationPrice = quote.MinPrice;
          quote.DestinationCode = destination.IataCode;

          console.log('Service 1', quote.DestinationCode);
          console.log('Service 2', quote.DestinationPrice);
          // console.log('City ID', quote.DestinationAirport);
          // console.log('aaaaa', destination.CityId);
          // console.log('Destination Price', destination.MinPrice);

          const carrier = response.data.Carriers.find((carrier) => {
            // console.log('skyscanner carrier', carrier);
            return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
          });

          // you can grab another request from skyscanner here by writing a function like the above examples

          if(carrier) quote.CarrierName = carrier.Name; // CarrierName is how you call it in the form
        });
        return response.data.Quotes;
      });
  }

  vm.getFlights = getFlights;
}
