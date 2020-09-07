class Api::V1::Customers::SearchBookingsController < ApiController
  before_action :authenticate_customer!, only: :index

  def index
    query = search_params
    @bookings = Booking.search_by_id(current_customer.id).ransack(query).result(distinct: true)
  end

  private

  def search_params
    Hash.new.tap do |q|
      q[:booking_status_name_eq] = params[:booking_status].presence
      q[:flight_flight_route_departure_location_sub_name_eq] = params[:departure].presence
      q[:flight_flight_route_arrive_location_sub_name_eq] = params[:arrive].presence
    end
  end
end
