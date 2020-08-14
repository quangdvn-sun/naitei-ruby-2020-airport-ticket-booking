class PaymentMethod < ApplicationRecord
  has_many :bookings, dependent: :destroy
end
