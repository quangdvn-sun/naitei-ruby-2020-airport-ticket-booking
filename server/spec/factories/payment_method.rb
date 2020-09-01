FactoryBot.define do
  factory :payment_method do
  end

  trait :cash do 
    method_name{"Cash"}
  end

  trait :credit_card do 
    method_name{"Credit Card"}
  end
end
