# == Schema Information
#
# Table name: group_memberships
#
#  id         :integer          not null, primary key
#  group_id   :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GroupMembership < ActiveRecord::Base
  validates :group_id, :member_id, presence: true
  validates :group_id, :uniqueness => { :scope => :member_id }

  belongs_to :member, class_name: "User", foreign_key: :member_id
  belongs_to :group

end
