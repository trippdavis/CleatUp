class UpdateInterestingsIndex < ActiveRecord::Migration
  def change
    remove_index :interestings, [:interest_id, :interestable_id]
    add_index :interestings, [:interest_id, :interestable_id, :interestable_type], unique: true, name: 'interestings_index'
  end
end
