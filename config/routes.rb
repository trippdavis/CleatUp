Rails.application.routes.draw do
  root :to => "site#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api, :defaults => { :format => :json } do
    resources :groups, except: [:new, :edit]
    resources :events, except: [:new, :edit]
  end
end
