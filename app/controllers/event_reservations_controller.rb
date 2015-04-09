class EventReservationsController < ApplicationController
  def create

    render :json => @reservation
  end

  def destroy
    @reservation = EventReservation.find(params[:id])
    @reservation.destroy
    render :json => @reservation
  end
end
