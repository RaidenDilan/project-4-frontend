angular
  .module('holiday')
  .service('skyscanner', Skyscanner);

Skyscanner.$inject = ['$http', 'API_URL'];
function Skyscanner($http, API_URL) {
  const vm = this;

  function getFlights(destination) {
    return $http
      .get(`${API_URL}/flights`, { params: { destination } })
      .then((response) => {
        console.log('skyscanner response', response);
        console.log('destination', destination);
        response.data.Quotes.forEach((quote) => {
          const destination = response.data.Places.find((place) => {
            // console.log('skyscanner place', place);
            return place.PlaceId === quote.OutboundLeg.DestinationId;
            // return place.PlaceId === quote.OutboundLeg.IataCode
          });

          quote.DestinationCity = destination.CityName;
          quote.DestinationCountry = destination.CountryName;
          quote.DestinationAirport = destination.CityId;
          quote.DestinationCode = destination.IataCode;
          console.log('AAA', quote.DestinationCode);
          console.log('BBB', quote.DestinationAirport);
          // console.log('aaaaa', destination.CityId);

          quote.DestinationPrice = destination.MinPrice;
          console.log('Flight Price', quote.MinPrice);
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
