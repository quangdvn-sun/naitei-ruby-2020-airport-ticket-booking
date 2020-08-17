class Airport < ApplicationRecord
  belongs_to :location
  has_many :departure_flight_routes, class_name: FlightRoute.name,
    foreign_key: :departure_id, dependent: :destroy
  has_many :arrive_flight_routes, class_name: FlightRoute.name,
    foreign_key: :arrive_id, dependent: :destroy
  has_many :departure_to, through: :departure_flight_routes, source: :arrive
  has_many :arrive_from, through: :arrive_flight_routes, source: :departure
end
