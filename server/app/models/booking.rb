class Booking < ApplicationRecord
  BOOKINGS_PARAMS = [:booking_total, booking_user: [:name, :email, :phone],
                                     booking_details: [:booking_name, :booking_dob, :booking_nation, :payment_method_id,
                                                       :seat_type_id, :flight_id, :customer_id, service_ids: []]].freeze

  has_and_belongs_to_many :services
  belongs_to :customer, optional: true
  belongs_to :booking_status
  belongs_to :payment_method
  belongs_to :seat_type
  belongs_to :flight

  validates :booking_name, presence: true
  validates :booking_dob, presence: true
  validates :booking_nation, presence: true
  validates :total_price, presence: true,
            numericality: {greater_than: Settings.bookings.minimum_total_price}
  validates :flight_id, presence: true
  validates :booking_status_id, presence: true
  validates :payment_method_id, presence: true
  validates :seat_type_id, presence: true

  delegate :plane, to: :flight
  delegate :name, to: :seat_type, prefix: true
  delegate :name, to: :booking_status, prefix: true
  delegate :method_name, to: :payment_method

  before_create :increase_reserved_seat
  before_destroy :decrease_reserved_seat

  def is_normal_seat?
    seat_type_id == Settings.bookings.normal_seat
  end

  private

  def increase_reserved_seat
    if is_normal_seat?
      flight.update(normal_reserved_seat: flight.normal_reserved_seat + 1)
    else
      flight.update(business_reserved_seat: flight.business_reserved_seat + 1)
    end
  end

  def decrease_reserved_seat
    if is_normal_seat?
      flight.update(normal_reserved_seat: flight.normal_reserved_seat - 1)
    else
      flight.update(business_reserved_seat: flight.business_reserved_seat - 1)
    end
  end
end
