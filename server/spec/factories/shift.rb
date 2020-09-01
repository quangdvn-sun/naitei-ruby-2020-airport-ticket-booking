FactoryBot.define do
  factory :shift do
  end

  trait :morning do
    name{"Morning"}
    departure_time{7}
  end

  trait :noon do
    name{"Noon"}
    departure_time{14}
  end

  trait :night do
    name{"Night"}
    departure_time{21}
  end
end
