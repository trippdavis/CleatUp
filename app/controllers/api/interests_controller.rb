class Api::InterestsController < ApplicationController
  def index
    @interests = Interest.all

    if params[:type] == "normal"
      render json: @interests
    elsif params[:interestable_type] == "user"
      @object = current_user
      render "index"
    else
      @object = Group.find(params[:group_id])
      render "index"
    end
  end

  def show
    @interest = Interest.find(params[:id])
    render json: @interest
  end
end
