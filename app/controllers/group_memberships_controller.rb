class GroupMembershipsController < ApplicationController
  def create
    @membership = GroupMembership.new(
      group_id: params[:group_id],
      member_id: current_user.id
    )

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
end
