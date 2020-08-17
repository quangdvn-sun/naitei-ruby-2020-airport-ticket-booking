class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.string :booking_email
      t.string :booking_name
      t.string :booking_phone
      t.text :booking_address
      t.string :seat_number
      t.float :total_price
      t.references :flight, null: false, foreign_key: true
      t.references :customer, null: true, foreign_key: true
      t.references :booking_status, null: false, foreign_key: true
      t.references :payment_method, null: false, foreign_key: true
      t.references :seat_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
