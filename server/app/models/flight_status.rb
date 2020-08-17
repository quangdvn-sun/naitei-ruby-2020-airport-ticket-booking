class FlightStatus < ApplicationRecord
  has_many :flights, dependent: :destroy
end
