class Service < ApplicationRecord
  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :bookings
  # rubocop:enable Rails/HasAndBelongsToMany

  scope :search_by_id, ->(ids){where id: ids}
  scope :calculate_by_id, ->(ids){where(id: ids).sum(:fee).round Settings.bookings.fixed_money}
end
