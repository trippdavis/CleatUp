class ChangeDateFormatInEvents < ActiveRecord::Migration
  def change
    remove_column :events, :time
    add_column :events, :dateTime, :datetime 
  end
end
