FactoryBot.define do
  factory :plane_type do
  end

  trait :airbus_a320 do
    name{"Airbus A320"}
    normal_seat_number{100}
    business_seat_number{100}
  end

  trait :airbus_a330 do
    name{"Airbus A330"}
    normal_seat_number{90}
    business_seat_number{90}
  end

  trait :airbus_a340 do
    name{"Airbus A340"}
    normal_seat_number{80}
    business_seat_number{80}
  end

  trait :boeing_737 do
    name{"Boeing 737"}
    normal_seat_number{150}
    business_seat_number{150}
  end

  trait :boeing_747 do
    name{"Boeing 747"}
    normal_seat_number{125}
    business_seat_number{125}
  end

  trait :boeing_757 do
    name{"Boeing 757"}
    normal_seat_number{75}
    business_seat_number{75}
  end
end
