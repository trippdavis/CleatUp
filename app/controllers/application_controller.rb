class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    User.find_by_session_token(session[:token])
  end

  def login_user!(user)
    session[:token] = user.reset_session_token
  end

  def logout!
    current_user.reset_session_token
    session[:token] = nil
  end
end
