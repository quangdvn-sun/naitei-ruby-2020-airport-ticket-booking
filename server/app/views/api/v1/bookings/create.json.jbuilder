json.success true
json.data do
  json.total_price @booking_response[:data][:total_price]
  json.payment_method @booking_response[:data][:payment_method]
  json.user do
    json.partial! "user", user: @booking_response[:data][:user]
  end
  json.bookings @booking_response[:data][:bookings] do |booking|
    json.partial! "booking", booking: booking
  end
  json.count @booking_count
end
