class BookingOneWayService < BookingService
  def initialize params
    super params
    @flight_id = params[:flight_details][:first][:flight_id]
    @seat_type_id = params[:flight_details][:first][:seat_type_id]
  end

  attr_reader :flight_id, :seat_type_id

  def perform
    if booking_total == booking_details.size
      booking_response = set_response
      return {success: false, message: I18n.t("bookings.error")} unless booking_response

      {success: true, data: booking_response}
    else
      {success: false, message: I18n.t("bookings.error")}
    end
  end

  private

  def set_response
    raise StandardError unless response = booking_with(booking_details, flight_id, seat_type_id)

    response[:user] = booking_user
    response[:departure_day] = get_flight_departure_day flight_id
    response
  rescue StandardError
    false
  end
end
