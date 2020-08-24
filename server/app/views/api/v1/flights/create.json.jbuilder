json.success true
json.data do
  if @flights
    json.flight_type Settings.flights.one_way
    json.flights @flights do |flight|
      json.partial! "flight", flight: flight
    end
    json.count @flights.size
  else
    json.flight_type Settings.flights.round_trip
    json.first do
      json.flights @first_flights do |flight|
        json.partial! "flight", flight: flight
      end
      json.count @first_flights.size
    end
    json.second do
      json.flights @second_flights do |flight|
        json.partial! "flight", flight: flight
      end
      json.count @second_flights.size
    end
  end
end
