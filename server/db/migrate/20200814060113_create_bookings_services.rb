class CreateBookingsServices < ActiveRecord::Migration[6.0]
  def change
    create_join_table :bookings, :services do |t|
      t.index :booking_id
      t.index :service_id
    end
  end
end
