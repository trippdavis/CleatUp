class InterestingsController < ApplicationController
  def create
    @interesting = Interesting.new(interesting_params)

    if @interesting.save
      render json: @interesting
    else
      render json: @interesting
    end
  end

  def destroy
    @interestings = Interesting.find(params[:id])
    @interesting.destroy
    render json: @interesting
  end

  private

  def interesting_params
    params.require(:interesting).permit(:interest_id, :interestable_id, :interestable_type)
  end
end
