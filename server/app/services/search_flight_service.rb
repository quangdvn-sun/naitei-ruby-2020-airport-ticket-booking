class SearchFlightService < ApplicationService
  def initialize params
    @type = params[:type]
    @from = params[:locations][:from]
    @to = params[:locations][:to]
  end

  private

  def find_flight_route from, to
    departure_location = Location.find_by(sub_name: from).try(:id)
    arrival_location = Location.find_by(sub_name: to).try(:id)
    FlightRoute.find_by departure_id: departure_location, arrive_id: arrival_location
  end

  def find_flight departure_date, flight_route
    Flight.search_by_day(departure_date)
          .search_by_route(flight_route)
  end
end
