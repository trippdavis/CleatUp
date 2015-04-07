class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.integer :organizor_id, null: false
      t.string :title, null: false
      t.text :description, null: false

      t.timestamps null: false
    end

    add_index :groups, :organizor_id
  end
end
