class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def login_user!(user)
    session[:token] = user.reset_session_token
    @current_user = user
  end

  def logout!
    current_user.reset_session_token
    session[:token] = nil
    @current_user = nil
  end

  def require_signed_in
    redirect_to new_session_url unless current_user
  end
end
