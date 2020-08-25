class Plane < ApplicationRecord
  belongs_to :plane_type
  has_many :flights, dependent: :destroy

  delegate :name, to: :plane_type, prefix: true
end
