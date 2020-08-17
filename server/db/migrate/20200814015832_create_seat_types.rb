class CreateSeatTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :seat_types do |t|
      t.string :name
      t.float :price_rate

      t.timestamps
    end
  end
end
