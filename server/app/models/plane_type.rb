class PlaneType < ApplicationRecord
  has_many :planes, dependent: :destroy
end
