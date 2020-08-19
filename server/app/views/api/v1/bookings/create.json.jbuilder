json.success true
json.data do
  json.array! @booking_response[:data] do |data|
    json.booking_name data.booking_name
    json.booking_dob data.booking_dob
    json.booking_nation data.booking_nation
    json.plane_name data.plane.name
    json.total_price data.total_price
    json.seat_number data.seat_number
    json.seat_type data.seat_type_name
    json.payment_method data.method_name
    json.booking_status data.booking_status_name
  end
end
json.count @booking_count
