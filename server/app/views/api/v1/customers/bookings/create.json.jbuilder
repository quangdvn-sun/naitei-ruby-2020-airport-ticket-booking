json.success true
json.data do
  json.total_price @booking_response[:data][:total_price]
  json.payment_method @booking_response[:data][:payment_method]
  json.booking_user do
    json.partial! "user", user: @booking_response[:data][:user]
  end
  if @booking_response[:data][:bookings]
    json.departure_day @booking_response[:data][:departure_day]
    json.bookings @booking_response[:data][:bookings] do |booking|
      json.partial! "booking", booking: booking, type: "create"
    end
    json.count @booking_count
  else
    json.first_departure_day @booking_response[:data][:first_departure_day]
    json.first_bookings @booking_response[:data][:first_bookings] do |booking|
      json.partial! "booking", booking: booking, type: "create"
    end
    json.first_booking_count @first_booking_count
    json.second_departure_day @booking_response[:data][:second_departure_day]
    json.second_bookings @booking_response[:data][:second_bookings] do |booking|
      json.partial! "booking", booking: booking, type: "create"
    end
    json.second_booking_count @second_booking_count
  end
end
