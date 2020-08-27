class BookingRoundTripService < BookingService
  def initialize params
    super params
    @first_flight_id = params[:flight_details][:first][:flight_id]
    @first_seat_type_id = params[:flight_details][:first][:seat_type_id]
    @second_flight_id = params[:flight_details][:second][:flight_id]
    @second_seat_type_id = params[:flight_details][:second][:seat_type_id]
  end

  attr_reader :first_flight_id, :first_seat_type_id, :second_flight_id, :second_seat_type_id

  def perform
    unless check_inbound_routes first_flight_id, second_flight_id
      return {success: false, message: I18n.t("bookings.not_inbound")}
    end

    unless get_flight_departure_day(first_flight_id) < get_flight_departure_day(second_flight_id)
      return {success: false, message: I18n.t("bookings.error")}
    end

    if booking_total == booking_details.size
      booking_response = set_response
      return {success: false, message: I18n.t("bookings.error")} unless booking_response

      {success: true, data: booking_response}
    else
      {success: false, message: I18n.t("bookings.error")}
    end
  end

  private

  def check_inbound_routes first_flight_id, second_flight_id
    first_route = Flight.find_by(id: first_flight_id).try(:flight_route)
    second_route = Flight.find_by(id: second_flight_id).try(:flight_route)

    first_route.is_inbound_route? second_route
  end

  def combine_response first_response, second_response
    final_response = {}
    final_response[:total_price] = first_response[:total_price] + second_response[:total_price]
    final_response[:payment_method] = first_response[:payment_method]
    final_response[:first_bookings] = first_response[:bookings]
    final_response[:second_bookings] = second_response[:bookings]
    final_response[:user] = booking_user
    final_response[:first_departure_day] = get_flight_departure_day first_flight_id
    final_response[:second_departure_day] = get_flight_departure_day second_flight_id
    final_response
  end

  def set_response
    first_response = {}
    second_response = {}
    ActiveRecord::Base.transaction do
      first_response = booking_with booking_details, first_flight_id, first_seat_type_id
      second_response = booking_with booking_details, second_flight_id, second_seat_type_id
      raise ActiveRecord::Rollback unless first_response && second_response

    rescue ActiveRecord::Rollback
      return false
    end
    combine_response first_response, second_response
  end
end
