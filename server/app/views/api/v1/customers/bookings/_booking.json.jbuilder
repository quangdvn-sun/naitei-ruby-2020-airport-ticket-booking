json.booking_name booking.booking_name
json.booking_dob booking.booking_dob
json.booking_nation booking.booking_nation
json.plane_name booking.plane.name
if type == "create"
  json.total_price booking.total_price
  json.seat_number booking.seat_number
  json.seat_type booking.seat_type_name
  json.booking_status booking.booking_status_name
elsif type == "index"
  json.departure_day booking.flight.departure_day
  json.departure_locaton booking.flight.flight_route.departure.location_name
  json.arrive_locaton booking.flight.flight_route.arrive.location_name
  json.total_price booking.total_price
  json.seat_number booking.seat_number
  json.seat_type booking.seat_type_name
end
