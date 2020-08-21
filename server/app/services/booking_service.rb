class BookingService < ApplicationService
  def initialize params
    @booking_total = params[:booking_total]
    @booking_details = params[:booking_details]
    @booking_user = params[:booking_user]
  end

  def perform
    if @booking_total == @booking_details.size
      booking_response = booking_with @booking_details
      return {success: false, message: I18n.t("bookings.error")} unless booking_response

      booking_response[:user] = @booking_user
      {success: true, data: booking_response}
    else
      {success: false, message: I18n.t("bookings.error")}
    end
  end

  private

  def booking_with booking_details
    final_bookings = []
    total_price = 0
    ActiveRecord::Base.transaction do
      booking_details.each_with_index do |booking, index|
        booked = create_new_booking booking
        raise StandardError unless booked.save

        final_bookings << booked
        total_price += booked.total_price

        booking_services = get_services(booking_details[index][:service_ids])
        booked.services << booking_services
      end
    end
    {
      total_price: total_price,
      payment_method: final_bookings.first.method_name,
      bookings: final_bookings
    }
  rescue StandardError
    false
  end

  def create_new_booking booking_detail
    extra_info = {
      seat_number: generate_seat_number(booking_detail[:flight_id], booking_detail[:seat_type_id]),
      total_price: calculate_total(booking_detail[:flight_id], booking_detail[:seat_type_id],
                                   booking_detail[:service_ids]),
      booking_status_id: booking_detail[:payment_method_id],
      booking_dob: format_date(booking_detail[:booking_dob])
    }
    booking_detail.merge! extra_info
    Booking.new booking_detail.except :service_ids
  end

  def calculate_service_fees service_ids
    Service.calculate_by_id service_ids
  end

  def calculate_total flight_id, seat_type_id, service_ids
    base_price = Flight.find_by(id: flight_id).try(:base_price)
    price_rate = SeatType.find_by(id: seat_type_id).try(:price_rate)
    service_fees = calculate_service_fees service_ids

    base_price * price_rate + service_fees
  end

  def generate_seat_number flight_id, seat_type_id
    if seat_type_id == Settings.bookings.normal_seat
      reserved = Flight.find_by(id: flight_id).try(:normal_reserved_seat)
      generate_seat_type reserved + 1, "A"
    elsif seat_type_id == Settings.bookings.business_seat
      reserved = Flight.find_by(id: flight_id).try(:business_reserved_seat)
      generate_seat_type reserved + 1, "B"
    end
  end

  def generate_seat_type available, first_letter
    if available > Settings.flights.max_seat
      "#{first_letter}00#{available}"
    elsif available > Settings.flights.min_seat && available < Settings.flights.max_seat
      "#{first_letter}0#{available}"
    else
      "#{first_letter}#{available}"
    end
  end

  def get_services ids
    Service.search_by_id ids
  end
end
