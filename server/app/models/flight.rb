class Flight < ApplicationRecord
  FLIGHTS_PARAMS = [:flight_type, time: [:first, :second], locations: [:from, :to]].freeze

  belongs_to :plane
  belongs_to :flight_route
  belongs_to :shift
  belongs_to :flight_status
  has_many :bookings, dependent: :destroy

  delegate :name, to: :plane, prefix: true
  delegate :name, to: :shift, prefix: true
  delegate :name, to: :flight_status, prefix: true
  delegate :plane_type_name, :normal_seat_number, :business_seat_number, to: :plane
  delegate :departure_time, to: :shift
  delegate :base_price, :flight_duration, to: :flight_route

  scope :search_by_day, ->(dates){where departure_day: dates}
  scope :search_by_route, ->(flight_routes){where flight_route_id: flight_routes}
end
