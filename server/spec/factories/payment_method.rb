FactoryBot.define do
  factory :payment_method do
  end

  trait :cash do
    id{Settings.bookings.pending}
    method_name{"Cash"}
  end

  trait :credit_card do
    id{Settings.bookings.success}
    method_name{"Credit Card"}
  end
end
