class Api::V1::BookingsController < ApiController
  include Api::V1::Concerns::BookingsResponse

  before_action :authenticate_token!, only: :index

  def index
    @pending_bookings = Booking.search_by_id(@current_customer.id).is_pending
    @success_bookings = Booking.search_by_id(@current_customer.id).is_success

    if has_bookings?
      render :index, status: :ok
    else
      render json: {success: false, message: I18n.t("bookings.none_bookings")}, status: :not_found
    end
  end

  def create
    if is_one_way_flight?
      @booking_response = booking_one_way

      render_booking_one_way_response
    elsif is_round_trip_flight?
      @booking_response = booking_round_trip

      render_booking_round_trip_response
    else
      render json: {success: false, message: I18n.t("flights.error")}, status: :not_found
    end
  end
end
