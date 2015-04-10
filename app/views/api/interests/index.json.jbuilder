json.array! @interests do |interest|
  json.(interest, :id, :topic, :created_at, :updated_at)
  json.user_interest current_user.interests.exists?(interest)
end
