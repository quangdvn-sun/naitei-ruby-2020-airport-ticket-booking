FactoryBot.define do
  factory :location do
  end

  trait :hn do
    name{"Ha Noi"}
    sub_name{"HAN"}
  end

  trait :hcm do
    name{"Ho Chi Minh City"}
    sub_name{"HCM"}
  end
end
