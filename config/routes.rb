Rails.application.routes.draw do
  root :to => "site#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  resources :group_memberships, only: [:create, :destroy]
  resources :event_reservations, only: [:create, :destroy]

  namespace :api, :defaults => { :format => :json } do
    resources :groups, except: [:new, :edit]
    resources :events, except: [:new, :edit]
    resources :interests, only: [:index, :show]
  end
end
