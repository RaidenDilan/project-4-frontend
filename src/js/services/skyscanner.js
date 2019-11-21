angular
  .module('holidayApp')
  .service('Skyscanner', Skyscanner);

Skyscanner.$inject = ['$http', 'API_URL'];
function Skyscanner($http, API_URL) {
  const vm = this;

  function getFlights(origin, destination, outboundpartialdate, inboundpartialdate) {
    return $http
      .get(`${API_URL}/flights`, { params: { origin, destination, outboundpartialdate, inboundpartialdate } })
      .then((response) => {

        response.data.Quotes.forEach((quote) => {
          // console.log('Skyscanner', quote);

          const destination = response.data.Places.find((place) => place.PlaceId === quote.OutboundLeg.DestinationId);

          quote.DestinationCity    = destination.CityName;
          quote.DestinationCountry = destination.CountryName;
          quote.DestinationAirport = destination.CityId;
          quote.DestinationPrice   = quote.MinPrice;

          const outboundCarrier = response.data.Carriers.find((carrier) => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]);
          const inboundCarrier  = response.data.Carriers.find((carrier) => carrier.CarrierId === quote.InboundLeg.CarrierIds[0]);

          if(outboundCarrier) quote.OutboundCarrierName = outboundCarrier.Name;
          if(inboundCarrier) quote.InboundCarrierName = inboundCarrier.Name;
        });

        return response.data.Quotes;
      });
  }
  vm.getFlights = getFlights;
}
