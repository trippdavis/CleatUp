Rails.application.routes.draw do
  root :to => "sessions#new"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api do
    resources :groups
  end
end
