class Service < ApplicationRecord
  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :bookings
  # rubocop:enable Rails/HasAndBelongsToMany
end
