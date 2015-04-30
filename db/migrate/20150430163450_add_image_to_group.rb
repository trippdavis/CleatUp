class AddImageToGroup < ActiveRecord::Migration
  def change
    add_column :groups, :filepicker_url, :string
  end
end
