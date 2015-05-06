json.(@group, :id, :title, :description, :filepicker_url, :created_at, :updated_at)

json.events(@events) do |event|
  json.(event, :id, :title, :group_id, :description, :date_time, :location, :created_at, :updated_at)
end

json.organizer do
  json.(@organizer, :id, :username, :image_url)
end

json.(@owned, :owned)

json.(@membership_id, :membership_id)

json.interests(@interests) do |interest|
  json.(interest, :topic)
end
