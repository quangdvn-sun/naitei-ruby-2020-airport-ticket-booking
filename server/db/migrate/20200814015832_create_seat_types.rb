class CreateSeatTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :seat_types do |t|
      t.string :type
      t.float :price_rate

      t.timestamps
    end
  end
end
