class Api::V1::BookingsController < ApiController
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
    @booking_response = BookingService.new(booking_info_params).perform

    if @booking_response[:success]
      @booking_count = @booking_response[:data][:bookings].size
      BookingMailer.payment_confirmation(@booking_response).deliver_now

      render :create, status: :ok
    else
      render json: {success: @booking_response[:success], message: @booking_response[:message]}, status: :bad_request
    end
  end

  private

  def booking_info_params
    params.permit Booking::BOOKINGS_PARAMS
  end

  def has_bookings?
    @pending_bookings.size.positive? || @success_bookings.size.positive?
  end
end
