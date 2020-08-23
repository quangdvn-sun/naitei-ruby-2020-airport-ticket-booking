class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :full_name
      t.string :email
      t.string :password_digest
      t.string :phone
      t.text :address
      t.integer :age

      t.timestamps
    end
  end
end
