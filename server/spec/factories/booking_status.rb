FactoryBot.define do
  factory :booking_status do
  end

  trait :success do
    id{Settings.bookings.success}
    name{"Success"}
  end

  trait :pending do
    id{Settings.bookings.pending}
    name{"Pending"}
  end
end
