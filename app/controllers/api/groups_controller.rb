class Api::GroupsController < ApplicationController
  before_action :require_signed_in
  before_action :require_current_user, only: [:update, :destroy]

  def index
    type = params["type"]
    if type == "created"
      @groups = Group.where(organizer_id: current_user.id)
    elsif type == "joined"
    else
      @groups = Group.where.not(organizer_id: current_user.id)
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
    @organizer = @group.organizer
    @owned = { owned: (@group.organizer == current_user) }
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
