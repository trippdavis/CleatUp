# == Schema Information
#
# Table name: groups
#
#  id             :integer          not null, primary key
#  organizer_id   :integer          not null
#  title          :string           not null
#  description    :text             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  filepicker_url :string
#

class Group < ActiveRecord::Base
  validates :organizer_id, :title, :description, presence: true

  belongs_to :organizer, class_name: "User"
  has_many :events
  has_many :memberships, class_name: "GroupMembership"
  has_many :members, through: :memberships, source: :member
  has_many :interestings, as: :interestable
  has_many :interests, through: :interestings, source: :interest
end
