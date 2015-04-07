class GroupsController < ApplicationController
  def index
    @groups = Group.all
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.organizer_id = current_user.id

    if @group.save
      redirect_to @group
    else
      flash.now[:errors] = @group.errors.full_messages
      render :new
    end
  end

  def show
    @group = Group.find(params[:id])
  end

  def edit
    @group = Group.find(params[:id])
    redirect_to @group unless @group.organizer_id == current_user.id
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      redirect_to @group
    else
      flash.now[:errors] = @group.errors.full_messages
      render :edit
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    redirect_to groups_url
  end

  private

  def group_params
    params.require(:group).permit(:title, :description)
  end
end
