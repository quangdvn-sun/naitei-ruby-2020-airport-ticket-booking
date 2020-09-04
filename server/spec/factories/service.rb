FactoryBot.define do
  factory :service do; end

  trait :luggage do
    name{"Extra Luggage"}
    fee{4.5}
  end
  
  trait :checkin do
    name{"Priority Check-in"}
    fee{5}
  end

  trait :lounge do
    name{"Business Lounge"}
    fee{15.15}
  end
end
