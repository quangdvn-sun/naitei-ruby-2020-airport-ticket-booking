FactoryBot.define do
  factory :airport, aliases: [:departure, :arrive] do
  end

  trait :hn_airport do
    name{"Noi Bai Airport"}
    location_id{FactoryBot.create(:location, :hn).id}
  end

  trait :hcm_airport do
    name{"Tan Son Nhat Airport"}
    location_id{FactoryBot.create(:location, :hcm).id}
  end
end
