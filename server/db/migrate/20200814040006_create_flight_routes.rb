class CreateFlightRoutes < ActiveRecord::Migration[6.0]
  def change
    create_table :flight_routes do |t|
      t.float :flight_duration
      t.float :base_price
      t.bigint :departure_id
      t.bigint :arrive_id

      t.timestamps
    end
    add_index :flight_routes, :departure_id
    add_index :flight_routes, :arrive_id
    add_index :flight_routes, [:departure_id, :arrive_id], unique: true
  end
end
