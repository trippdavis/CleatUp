# == Schema Information
#
# Table name: interestings
#
#  id                :integer          not null, primary key
#  interest_id       :integer          not null
#  interestable_id   :integer          not null
#  interestable_type :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Interesting < ActiveRecord::Base
  validates :interest_id, :interestable_id, :interestable_type, presence: true
  validates :interest_id, :uniqueness => { :scope => [:interestable_id, :interestable_type] }

  belongs_to :interest
  belongs_to :interestable, polymorphic: true
end
