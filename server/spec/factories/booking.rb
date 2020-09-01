FactoryBot.define do
  factory :booking do
    customer_id{FactoryBot.create(:customer).id}
    booking_name{Faker::Name.name}
    booking_dob{rand(50.years).seconds.ago.in_time_zone.to_s}
    booking_nation{Faker::Address.country}
    flight_id{FactoryBot.create(:flight).id}
    seat_type_id{FactoryBot.create(:seat_type, :normal).id}
    seat_number{Faker::Code.npi}
    total_price{rand * 100 + 1}
    payment_method_id{FactoryBot.create(:payment_method, :cash).id}
    booking_status_id{FactoryBot.create(:booking_status).id}
  end
end
