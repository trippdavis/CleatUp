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

require 'test_helper'

class InterestingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
