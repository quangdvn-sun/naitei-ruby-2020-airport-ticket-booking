class FlightRoute < ApplicationRecord
  belongs_to :arrive, class_name: Plane.name
  belongs_to :departure, class_name: Plane.name
  has_many :flights, dependent: :destroy
end
