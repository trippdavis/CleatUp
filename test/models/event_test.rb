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

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
