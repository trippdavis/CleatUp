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

  def group_require_current_user
    group = Group.find(params[:id])
    unless group.organizer_id == current_user.id
      fail
    end
  end

  def event_require_current_user
    event = Event.find(params[:id])
    unless event.organizer.id == current_user.id
      fail
    end
  end
end
