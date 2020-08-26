class BookingService < ApplicationService
  def initialize params
    @booking_user = params[:booking_user]
    @total_price = params[:total_price]
    @customer_id = params[:customer_id]
    @payment_method_id = params[:payment_method_id]
    @booking_total = params[:booking_total]
    @booking_details = params[:booking_details]
  end

  attr_reader :booking_user, :total_price, :customer_id, :payment_method_id, :booking_total, :booking_details

  private

  def booking_with booking_details, flight_id, seat_type_id
    final_bookings = []
    total_price = 0
    ActiveRecord::Base.transaction(joinable: false, requires_new: true) do
      booking_details.each_with_index do |booking, index|
        booked = create_new_booking booking, flight_id, seat_type_id
        raise StandardError unless booked.save

        final_bookings << booked
        total_price += booked.total_price

        booking_services = get_services(booking_details[index][:service_ids])
        booked.services << booking_services
      end
    end
    {
      total_price: total_price,
      bookings: final_bookings,
      payment_method: final_bookings.first.method_name
    }
  rescue StandardError
    false
  end

  def create_new_booking booking_detail, flight_id, seat_type_id
    extra_info = {
      seat_number: generate_seat_number(flight_id, seat_type_id),
      total_price: calculate_total(flight_id, seat_type_id,
                                   booking_detail[:service_ids]),
      booking_status_id: @payment_method_id,
      booking_dob: format_date(booking_detail[:booking_dob]),
      flight_id: flight_id,
      payment_method_id: @payment_method_id,
      customer_id: @customer_id,
      seat_type_id: seat_type_id
    }
    booking_detail.merge! extra_info
    new_booking = Booking.new booking_detail.except :service_ids
    raise StandardError unless is_seat_available? flight_id, new_booking

    new_booking
  rescue StandardError
    false
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

  def generate_seat_type available, first_letter
    if available > Settings.flights.max_seat
      "#{first_letter}00#{available}"
    elsif available > Settings.flights.min_seat && available < Settings.flights.max_seat
      "#{first_letter}0#{available}"
    else
      "#{first_letter}#{available}"
    end
  end

  def generate_seat_number flight_id, seat_type_id
    if seat_type_id == Settings.bookings.normal_seat
      reserved = Flight.find_by(id: flight_id).try(:normal_reserved_seat)
      generate_seat_type reserved + 1, Settings.bookings.normal_class
    elsif seat_type_id == Settings.bookings.business_seat
      reserved = Flight.find_by(id: flight_id).try(:business_reserved_seat)
      generate_seat_type reserved + 1, Settings.bookings.business_class
    end
  end

  def get_services ids
    Service.search_by_id ids
  end

  def get_flight_departure_day flight_id
    Flight.find_by(id: flight_id).try(:departure_day)
  end

  def is_seat_available? flight_id, booking
    raise StandardError unless cur_flight = Flight.find_by(id: flight_id)

    if booking.is_normal_seat?
      cur_flight.normal_reserved_seat < cur_flight.normal_seat_number
    elsif booking.is_business_seat?
      cur_flight.business_reserved_seat < cur_flight.business_seat_number
    else
      false
    end
  rescue StandardError
    false
  end
end
