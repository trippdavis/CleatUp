class Api::GroupsController < ApplicationController
  def index
    @events = Event.all
    render :json => @events
  end

  def show
    @event = Event.find(params[:id])
    render :json => @event
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
