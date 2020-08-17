class Location < ApplicationRecord
  has_one :airport, dependent: :destroy
end
