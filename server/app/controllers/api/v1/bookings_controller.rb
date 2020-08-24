class Api::V1::BookingsController < ApiController
  def create
    @booking_response = BookingService.new(booking_info_params).perform

    if @booking_response[:success]
      @booking_count = @booking_response[:data][:bookings].size
      BookingMailer.payment_confirmation(@booking_response).deliver_now

      render :create, status: :ok
    else
      render json: {success: @booking_response[:success], message: @booking_response[:message]}, status: :not_found
    end
  end

  private

  def booking_info_params
    params.permit Booking::BOOKINGS_PARAMS
  end
end
