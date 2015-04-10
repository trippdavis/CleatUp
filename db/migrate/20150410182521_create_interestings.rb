class CreateInterestings < ActiveRecord::Migration
  def change
    create_table :interestings do |t|
      t.integer :interest_id, null: false
      t.integer :interestable_id, null: false
      t.string :interestable_type, null: false

      t.timestamps null: false
    end

    add_index :interestings, [:interest_id, :interestable_id], :unique => true
  end
end
