class FlightRoute < ApplicationRecord
  belongs_to :arrive, class_name: Airport.name
  belongs_to :departure, class_name: Airport.name
  has_many :flights, dependent: :destroy
end
