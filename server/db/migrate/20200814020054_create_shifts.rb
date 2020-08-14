class CreateShifts < ActiveRecord::Migration[6.0]
  def change
    create_table :shifts do |t|
      t.string :name
      t.integer :departure_time

      t.timestamps
    end
  end
end
