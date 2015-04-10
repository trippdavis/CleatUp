class EventReservationsController < ApplicationController
  def create
    @reservation = EventReservation.new(
      event_id: params[:event_id],
      reserver_id: current_user.id
    )

    if @reservation.save
      render :json => @reservation
    else
      render :json => @reservation, :status => :unprocessable_entity
    end
  end

  def destroy
    @reservation = EventReservation.find(params[:id])
    @reservation.destroy
    render :json => @reservation
  end
end
