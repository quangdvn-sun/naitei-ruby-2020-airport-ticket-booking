class Plane < ApplicationRecord
  belongs_to :plane_type
  has_many :flights, dependent: :destroy
end
