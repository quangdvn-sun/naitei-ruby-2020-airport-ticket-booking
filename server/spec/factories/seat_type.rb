FactoryBot.define do
  factory :seat_type do
  end

  trait :normal do
    id{Settings.bookings.normal_seat}
    name{"Normal Seat"}
    price_rate{1.0}
  end

  trait :business do
    id{Settings.bookings.business_seat}
    name{"Business Seat"}
    price_rate{1.5}
  end
end
