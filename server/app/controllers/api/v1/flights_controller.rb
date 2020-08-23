class Api::V1::FlightsController < ApiController
  def create
    if is_one_way_flight?
      @flights = search_one_way_flight

      render_response @flights.size.positive?
    elsif is_round_trip_flight?
      @first_flights, @second_flights = search_round_trip_flight

      render_response is_flights_available?
    else
      render json: {success: false, message: I18n.t("flights.error")}, status: :not_found
    end
  end

  private

  def flight_info_params
    params.require(:flight).permit Flight::FLIGHTS_PARAMS
  end

  def search_one_way_flight
    SearchOneWayFlightService.new(flight_info_params).perform
  end

  def search_round_trip_flight
    SearchRoundTripFlightService.new(flight_info_params).perform
  end

  def render_response condition
    if condition
      render :create, status: :ok
    else
      render json: {success: false, message: I18n.t("flights.not_found")}, status: :not_found
    end
  end

  def is_flights_available?
    @first_flights&.size&.positive? && @second_flights&.size&.positive?
  end

  def is_one_way_flight?
    flight_info_params[:type] == Settings.flights.one_way
  end

  def is_round_trip_flight?
    flight_info_params[:type] == Settings.flights.round_trip
  end
end
