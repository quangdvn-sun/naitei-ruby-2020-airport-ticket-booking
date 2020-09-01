FactoryBot.define do
  factory :seat_type do
  end

  trait :normal do
    name{"Normal Seat"}
    price_rate{1.0}
  end

  trait :business do
    name{"Business Seat"}
    price_rate{1.5}
  end
end
