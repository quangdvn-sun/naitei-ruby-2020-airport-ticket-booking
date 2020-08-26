class FlightRoute < ApplicationRecord
  belongs_to :arrive, class_name: Airport.name
  belongs_to :departure, class_name: Airport.name
  has_many :flights, dependent: :destroy

  def is_inbound_route? flight_route
    departure_id == flight_route.arrive_id && arrive_id == flight_route.departure_id
  end
end
