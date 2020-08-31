FactoryBot.define do
  factory :customer do
    full_name {Faker::Name.name}
    email {Faker::Internet.unique.email}
    password_digest {BCrypt::Password.create(Settings.validations.user.default_password)}
    phone {Settings.validations.user.default_phone}
    age {rand(18..30)}
    address {"#{Faker::Address.city}, #{Faker::Address.country}"}
  end
end
