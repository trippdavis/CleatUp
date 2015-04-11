class Api::GroupsController < ApplicationController
  before_action :require_signed_in
  before_action :group_require_current_user, only: [:update, :destroy]

  def index
    type = params["type"]
    if type == "created"
      @groups = Group.where(organizer_id: current_user.id)
    elsif type == "joined"
      @groups = current_user.groups_joined
    elsif type == "other"
      @groups = Group.where.not(
        organizer_id: current_user.id,
        id: current_user.groups_joined.map(&:id)
      )
    elsif type == "interest"
      @groups = Group.includes(:interests).where(interests: { id: params[:interest_id] })
    end

    render :json => @groups
  end

  def create
    @group = Group.new(group_params)
    @group.organizer_id = current_user.id

    if @group.save
      render :json => @group
    else
      @errors = @group.errors.full_messages
      render "form", :status => :unprocessable_entity
    end
  end

  def show
    @group = Group.find(params[:id])
    @events = @group.events
    @organizer = @group.organizer
    @owned = { owned: (@group.organizer == current_user) }

    membership = GroupMembership.where(member_id: current_user.id, group_id: params[:id])
    if membership[0]
      @membership_id = { membership_id: membership[0].id }
    else
      @membership_id = { membership_id: 0 }
    end

    @joined = { joined: (current_user.groups_joined.exists?(@group.id)) }
    render "show"
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      render :json => @group
    else
      @errors = @group.errors.full_messages
      render "form", :status => :unprocessable_entity
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    render :json => @group
  end

  private

  def group_params
    params.require(:group).permit(:title, :description)
  end
end
