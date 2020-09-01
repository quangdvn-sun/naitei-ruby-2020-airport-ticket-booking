FactoryBot.define do
  plane_recognition = rand(100..999)
  first_letter = ("A".."Z").to_a.sample
  second_letter = ("A".."Z").to_a.sample
  plane_name = "VN-#{first_letter}#{second_letter}-#{plane_recognition}"
  factory :plane do
    name{plane_name}
    plane_type_id{FactoryBot.create(:plane_type, :airbus_a320).id}
  end
end
