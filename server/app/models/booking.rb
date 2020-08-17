class Booking < ApplicationRecord
  belongs_to :customer, optional: true
  belongs_to :booking_status
  belongs_to :payment_method
  belongs_to :seat_type
  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :services
  # rubocop:enable Rails/HasAndBelongsToMany
end
