json.array! @events do |event|
  json.(event, :id, :group_id, :title, :description, :location, :date_time, :created_at, :updated_at)
  json.group_title event.group.title
end
