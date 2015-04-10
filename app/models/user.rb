# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token
  attr_reader :password

  has_many :groups_organized, class_name: "Group", foreign_key: :organizer_id
  has_many :events_organized, through: :groups_organized, source: :events
  has_many :group_memberships, foreign_key: :member_id
  has_many :groups_joined, through: :group_memberships, source: :group
  has_many :event_reservations, foreign_key: :reserver_id
  has_many :events_reserved, through: :event_reservations, source: :event
  has_many :interestings, as: :interestable
  has_many :interests, through: :interestings, source: :interest

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless user

    return user if user.is_password?(password)
    return nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = generate_session_token
    self.save
    self.session_token
  end
end
