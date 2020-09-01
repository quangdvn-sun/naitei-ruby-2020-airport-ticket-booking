FactoryBot.define do
  factory :flight_route do
    flight_duration{2.5}
    base_price{55}
  end

  trait :hn_hcm do
    association :departure, :hn_airport, factory: :airport
    association :arrive, :hcm_airport, factory: :airport
  end

  trait :hcm_hn do
    association :departure, :hcm_airport, factory: :airport
    association :arrive, :hn_airport, factory: :airport
  end
end
