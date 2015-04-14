class InterestingsController < ApplicationController
  def create
    if params[:group_id] != ""
      interestable_id = params[:group_id].to_i
    else
      interestable_id = current_user.id
    end

    @interesting = Interesting.new(
      interest_id: params[:interest_id],
      interestable_id: interestable_id,
      interestable_type: params[:type].capitalize
    )

    if @interesting.save
      render json: @interesting
    else
      render json: @interesting
    end
  end

  def destroy
    if params[:group_id] != ""
      interestable_id = params[:group_id].to_i
    else
      interestable_id = current_user.id
    end

    @interesting = Interesting.where(
      interest_id: params[:interest_id],
      interestable_id: interestable_id,
      interestable_type: params[:type].capitalize
    ).first

    @interesting.destroy
    render json: @interesting
  end
end
