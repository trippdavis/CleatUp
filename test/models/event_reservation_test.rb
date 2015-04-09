# == Schema Information
#
# Table name: event_reservations
#
#  id          :integer          not null, primary key
#  event_id    :integer          not null
#  reserver_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class EventReservationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
