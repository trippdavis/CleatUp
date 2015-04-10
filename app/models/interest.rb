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
end
