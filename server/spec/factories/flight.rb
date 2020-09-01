FactoryBot.define do
  departure_time = rand(3.months).seconds.from_now
  factory :flight do
    departure_day{Date.parse(departure_time.to_s)}
    plane_id{FactoryBot.create(:plane).id}
    normal_reserved_seat{Settings.test.default_seat_number}
    business_reserved_seat{Settings.test.default_seat_number}
    shift_id{FactoryBot.create(:shift, :morning).id}
    flight_status_id{FactoryBot.create(:flight_status, :underpart).id}
    flight_route_id{FactoryBot.create(:flight_route, :hn_hcm).id}
  end
end
