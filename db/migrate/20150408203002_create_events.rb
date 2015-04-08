class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :group_id, null: false
      t.string :title, null: false
      t.text :description
      t.time :time, null: false
      t.string :location, null: false

      t.timestamps null: false
    end
    
    add_index :events, :group_id
  end
end
