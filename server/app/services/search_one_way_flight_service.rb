class SearchOneWayFlightService < SearchFlightService
  def initialize params
    super params
    @flight_time = params[:time][:first]
  end

  def perform
    cur_flight_route = find_flight_route @from, @to

    flight_date = format_date @flight_time

    find_flight flight_date, cur_flight_route
  end
end
