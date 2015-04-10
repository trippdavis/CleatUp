class Api::InterestsController < ApplicationController
  def index
    @interests = Interest.all
    render json: @interests
  end

  def show
    @interest = Interest.find(params[:id])
    render json: @interest
  end
end
