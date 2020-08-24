Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :flights, only: :create
      resources :bookings, only: :create
      post "/signup", to: "customers#create"
      scope :auth do
        post "/login", to: "authentication#create"
        get "/me", to: "authentication#show"
      end
    end
  end
end
