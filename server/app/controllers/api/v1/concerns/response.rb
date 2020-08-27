module Api::V1::Concerns
  module Response
    extend ActiveSupport::Concern

    def is_one_way_flight? params
      params[:flight_type] == Settings.flights.one_way
    end

    def is_round_trip_flight? params
      params[:flight_type] == Settings.flights.round_trip
    end
  end
end
