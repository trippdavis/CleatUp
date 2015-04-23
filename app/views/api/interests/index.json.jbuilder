json.array! @interests do |interest|
  json.(interest, :id, :topic, :created_at, :updated_at)
  json.interested @object.interests.exists?(interest.id)
end
