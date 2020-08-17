class CreateStaffs < ActiveRecord::Migration[6.0]
  def change
    create_table :staffs do |t|
      t.string :full_name
      t.string :user_name
      t.string :password
      t.boolean :is_admin

      t.timestamps
    end
    add_index :staffs, :user_name, unique: true
  end
end
