# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  group_id    :integer          not null
#  title       :string           not null
#  description :text
#  location    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  date_time   :datetime         not null
#

class Event < ActiveRecord::Base
  validates :group_id, :title, :date_time, :location, presence: true

  belongs_to :group
  has_one :organizer, through: :group, source: :organizer
end
