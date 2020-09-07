json.success true
json.data do
  json.success_bookings do
    json.details @success_bookings do |booking|
      json.partial! "booking", booking: booking, type: "index"
    end
    json.count @success_bookings.size
  end
  json.pending_bookings do
    json.details @pending_bookings do |booking|
      json.partial! "booking", booking: booking, type: "index"
    end
    json.count @pending_bookings.size
  end
end
