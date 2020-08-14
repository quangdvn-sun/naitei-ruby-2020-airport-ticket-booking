class Shift < ApplicationRecord
  has_many :flights, dependent: :destroy
end
