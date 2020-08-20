class Service < ApplicationRecord
  has_and_belongs_to_many :bookings

  scope :search_by_id, ->(ids){where id: ids}
  scope :calculate_by_id, ->(ids){where(id: ids).sum(:fee).round Settings.bookings.fixed_money}
end
