json.(@event, :id, :title, :description, :date_time, :location, :created_at, :updated_at)

json.organizer do
  json.(@organizer, :id, :username)
end

json.(@owned, :owned)
