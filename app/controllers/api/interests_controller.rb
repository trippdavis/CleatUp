class Api::InterestsController < ApplicationController
  def index
    @interests = Interest.all
    render "index"
  end

  def show
    @interest = Interest.find(params[:id])
    render json: @interest
  end
end
