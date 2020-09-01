FactoryBot.define do
  factory :flight_status do
  end

  trait :underpart do
    name{"Underpart"}
  end

  trait :flying do
    name{"Flying"}
  end

  trait :arrived do 
    name{"Arrived"}
  end
end
