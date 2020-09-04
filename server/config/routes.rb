Rails.application.routes.draw do
  devise_for :customers
  namespace :api do
    namespace :v1 do
      namespace :customers do
        resources :flights, only: :create
        resources :bookings, only: %i(index create)
      end
      post "/signup", to: "customers#create"
      scope :auth do
        post "/login", to: "authentication#create"
        get "/me", to: "authentication#show"
      end
    end
  end
end
