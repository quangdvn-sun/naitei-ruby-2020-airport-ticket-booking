class CreateBookingStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :booking_statuses do |t|
      t.string :method_name

      t.timestamps
    end
  end
end
