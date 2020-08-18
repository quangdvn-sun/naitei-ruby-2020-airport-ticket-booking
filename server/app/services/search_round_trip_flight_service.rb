class SearchRoundTripFlightService < SearchFlightService
  def initialize params
    super params
    @first_flight_time = params[:time][:first]
    @second_flight_time = params[:time][:second]
  end

  def perform
    first_flight_route = find_flight_route @from, @to
    second_flight_route = find_flight_route @to, @from

    first_flight_date = format_date @first_flight_time
    second_flight_date = format_date @second_flight_time

    first_flights = find_flight first_flight_date, first_flight_route
    second_flights = find_flight second_flight_date, second_flight_route

    [first_flights, second_flights]
  end
end
