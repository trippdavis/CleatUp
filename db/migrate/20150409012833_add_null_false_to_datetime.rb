class AddNullFalseToDatetime < ActiveRecord::Migration
  def change
    remove_column :events, :dateTime
    add_column :events, :date_time, :datetime, null: false
  end
end
