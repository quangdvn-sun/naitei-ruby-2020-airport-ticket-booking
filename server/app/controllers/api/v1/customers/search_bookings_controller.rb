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
      q[:departure_location_eq] = params[:departure].presence
      q[:arrive_location_eq] = params[:arrive].presence
    end
  end
end
