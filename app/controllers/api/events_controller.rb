class Api::EventsController < ApplicationController
  before_action :require_signed_in
  before_action :event_require_current_user, only: [:update, :destroy]

  def index
    type = params["type"]
    if type == "created"
      @events = Event.joins(group: :organizer).where(users: { id: current_user.id })
    elsif type == "joined"
    else
      @events = Event.joins(group: :organizer).where.not(users: { id: current_user.id })
    end

    render :json => @events
  end

  def show
    @event = Event.find(params[:id])
    @organizer = @event.organizer
    @owned = { owned: (@event.organizer == current_user) }
    render "show"
  end

  def create
  end

  def update
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render :json => @event
  end

  private

  def event_params
  end
end
