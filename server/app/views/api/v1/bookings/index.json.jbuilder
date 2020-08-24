json.success true
json.data do
  json.success_bookings do
    json.details @success_bookings do |booking|
      json.booking_name booking.booking_name
      json.booking_dob booking.booking_dob
      json.booking_nation booking.booking_nation
      json.plane_name booking.plane.name
      json.total_price booking.total_price
      json.seat_number booking.seat_number
      json.seat_type booking.seat_type_name
    end
    json.count @success_bookings.size
  end
  json.pending_bookings do
    json.details @pending_bookings do |booking|
      json.booking_name booking.booking_name
      json.booking_dob booking.booking_dob
      json.booking_nation booking.booking_nation
      json.plane_name booking.plane.name
      json.total_price booking.total_price
      json.seat_number booking.seat_number
      json.seat_type booking.seat_type_name
    end
    json.count @pending_bookings.size
  end
end
