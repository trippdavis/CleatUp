class GroupMembershipsController < ApplicationController
  def create
    @membership = GroupMembership.new(membership_params)

    if @membership.save
      render :json => @membership
    else
      render :json => @membership, :status => :unprocessable_entity
    end
  end

  def destroy
    @membership = GroupMembership.find(params[:id])
    @membership.destroy
    render :json => @membership
  end

  private

  def membership_params
    params.require(:membership).permit(:group_id, :member_id)
  end
end
