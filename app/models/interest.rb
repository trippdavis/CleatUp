# == Schema Information
#
# Table name: interests
#
#  id         :integer          not null, primary key
#  topic      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Interest < ActiveRecord::Base
  validates :topic, presence: true, uniqueness: true

  has_many :interestings
  has_many :interested_users, through: :interestings, source: :interestable, source_type: "User"
  has_many :interested_groups, through: :interestings, source: :interestable, source_type: "Group"
end
