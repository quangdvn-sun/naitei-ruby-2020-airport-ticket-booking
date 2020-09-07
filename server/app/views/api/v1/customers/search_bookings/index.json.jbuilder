json.success true
json.data do
  json.details @bookings do |booking|
    json.partial! "booking", booking: booking
  end
  json.count @bookings.size
end
