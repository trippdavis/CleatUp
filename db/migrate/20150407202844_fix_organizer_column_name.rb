class FixOrganizerColumnName < ActiveRecord::Migration
  def change
    rename_column :groups, :organizor_id, :organizer_id
  end
end
