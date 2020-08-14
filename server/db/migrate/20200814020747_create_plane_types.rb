class CreatePlaneTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :plane_types do |t|
      t.string :type
      t.integer :normal_seat_number
      t.integer :business_seat_number

      t.timestamps
    end
  end
end
