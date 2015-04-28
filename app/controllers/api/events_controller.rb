class Api::EventsController < ApplicationController
  before_action :require_signed_in
  before_action :event_require_current_user, only: [:update, :destroy]

  def index
    type = params["type"]
    if type == "group"
      events = Event.where(group_id: params[:group_id])
    else
      if type == "created"
        events = Event.joins(group: :organizer).where(users: { id: current_user.id })
      elsif type == "reserved"
        events = current_user.events_reserved
      elsif type == "joined-group"
        events = Event.where(group_id: current_user.groups_joined.map(&:id));
      elsif type == "other"
        events = Event.joins(group: :organizer).where.not(
          users: { id: current_user.id },
          group_id: current_user.groups_joined.map(&:id)
        )
      end

      if params["interest_id"].to_i > 0
        events = events.includes(:interests).where(interests: { id: params["interest_id"].to_i })
      end
    end

    @events = events.where("date_time >= ?", Time.now).order("date_time")
    render "index"
  end

  def show
    @event = Event.find(params[:id])
    @organizer = @event.organizer
    @group = @event.group
    @owned = { owned: (@event.organizer == current_user) }

    reservation = EventReservation.where(reserver_id: current_user.id, event_id: params[:id])
    if reservation[0]
      @reservation_id = { reservation_id: reservation[0].id }
    else
      @reservation_id = { reservation_id: 0 }
    end
    render "show"
  end

  def create
    @event = Event.new(event_params);

    if @event.save
      render :json => @event
    else
      @errors = @event.errors.full_messages
      if @errors.include?("Date time can't be blank")
        @errors.delete("Date time can't be blank")
        @errors += date_time_errors
      end

      render "form", :status => :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      render :json => @event
    else
      @errors = @event.errors.full_messages
      if @errors.include?("Date time can't be blank")
        @errors.delete("Date time can't be blank")
        @errors += date_time_errors
      end

      render "form", :status => :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render :json => @event
  end

  private

  def event_params
    event_params = params.require(:event).permit(:group_id, :title, :description, :location)
    if params[:event][:date] == "" || params[:event][:time] == ""
      event_params["date_time"] = ""
    else
      event_params["date_time"] = parse_dateTime(params.require(:event).permit(:time, :date))
    end
    return event_params
  end

  def date_time_errors
    errors = []
    errors << "Date can't be blank" if params[:event][:date] == ""
    errors << "Time can't be blank" if params[:event][:time] == ""

    errors
  end
end
