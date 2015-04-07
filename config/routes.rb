Rails.application.routes.draw do
  get 'groups/index'

  get 'groups/new'

  get 'groups/show'

  get 'groups/edit'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]
end
