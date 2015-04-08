# == Schema Information
#
# Table name: groups
#
#  id           :integer          not null, primary key
#  organizer_id :integer          not null
#  title        :string           not null
#  description  :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Group < ActiveRecord::Base
  validates :organizer_id, :title, :description, presence: true

  belongs_to :organizer, class_name: "User"
  has_many :events
end
