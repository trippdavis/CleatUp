json.(@event, :id, :title, :description, :time, :location, :created_at, :updated_at)

json.organizer do
  json.(@organizer, :id, :username)
end

json.(@owned, :owned)
