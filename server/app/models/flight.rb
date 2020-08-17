class Flight < ApplicationRecord
  belongs_to :plane
  belongs_to :flight_route
  belongs_to :shift
  belongs_to :flight_status
end
