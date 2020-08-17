class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.datetime :departure_day
      t.integer :normal_reserved_seat
      t.integer :business_reserved_seat
      t.references :plane, null: false, foreign_key: true
      t.references :flight_route, null: false, foreign_key: true
      t.references :shift, null: false, foreign_key: true
      t.references :flight_status, null: false, foreign_key: true

      t.timestamps
    end
  end
end
