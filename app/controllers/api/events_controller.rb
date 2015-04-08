class Api::EventsController < ApplicationController
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
  end

  private

  def event_params
  end
end
