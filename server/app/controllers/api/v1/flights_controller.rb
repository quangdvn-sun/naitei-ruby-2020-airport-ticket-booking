class Api::V1::FlightsController < ApiController
  include Api::V1::Concerns::FlightsResponse

  def create
    if is_one_way_flight? flight_info_params
      @flights = search_one_way_flight

      render_response is_one_way_flights_available?
    elsif is_round_trip_flight? flight_info_params
      @first_flights, @second_flights = search_round_trip_flight
      render_response is_round_trip_flights_available?
    else
      render json: {success: false, message: I18n.t("flights.error")}, status: :not_found
    end
  end
end
