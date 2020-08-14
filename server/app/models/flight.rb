class Flight < ApplicationRecord
  belongs_to :plane
  belongs_to :flight_routes
  belongs_to :shift
  belongs_to :flight_status
end
