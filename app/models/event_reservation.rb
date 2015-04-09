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

class EventReservation < ActiveRecord::Base
  validates :event_id, :reserver_id, presence: true
  validates :event_id, :uniqueness => { :scope => :reserver_id }

  belongs_to :reserver, class_name: "User", foreign_key: :reserver_id
  belongs_to :event
end
