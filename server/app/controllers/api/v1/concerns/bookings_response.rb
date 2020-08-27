module Api::V1::Concerns
  module BookingsResponse
    include Api::V1::Concerns::Response

    extend ActiveSupport::Concern

    def booking_info_params
      params.permit Booking::BOOKINGS_PARAMS
    end

    def has_bookings?
      @pending_bookings.size.positive? || @success_bookings.size.positive?
    end

    def booking_one_way
      BookingOneWayService.new(booking_info_params).perform
    end

    def booking_round_trip
      BookingRoundTripService.new(booking_info_params).perform
    end

    def render_booking_one_way_response
      if @booking_response[:success]
        @booking_count = @booking_response[:data][:bookings].size
        BookingMailer.one_way_payment_confirmation(@booking_response).deliver_now

        render :create, status: :ok
      else
        render json: {success: @booking_response[:success], message: @booking_response[:message]}, status: :bad_request
      end
    end

    def render_booking_round_trip_response
      if @booking_response[:success]
        @first_booking_count = @booking_response[:data][:first_bookings].size
        @second_booking_count = @booking_response[:data][:second_bookings].size

        BookingMailer.round_trip_paymnent_confirmation(@booking_response).deliver_now
        render :create, status: :ok
      else
        render json: {success: @booking_response[:success], message: @booking_response[:message]}, status: :bad_request
      end
    end
  end
end
