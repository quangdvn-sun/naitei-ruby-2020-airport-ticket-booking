module Api::V1::Concerns
  module Response
    extend ActiveSupport::Concern

    def is_one_way_flight?
      flight_info_params[:flight_type] == Settings.flights.one_way
    end

    def is_round_trip_flight?
      flight_info_params[:flight_type] == Settings.flights.round_trip
    end
  end
end
