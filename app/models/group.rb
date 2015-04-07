# == Schema Information
#
# Table name: groups
#
#  id           :integer          not null, primary key
#  organizor_id :integer          not null
#  title        :string           not null
#  description  :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Group < ActiveRecord::Base
  validates :organizor_id, :title, :description, presence: true

  belongs_to :organizor, class_name: "User"
end
