Rails.application.routes.draw do
  devise_for :customers
  namespace :api do
    namespace :v1 do
      namespace :customers do
        resources :flights, only: :create
        resources :bookings, only: %i(index create)
        scope :bookings do
          get "/search", to: "search_bookings#index"
        end
      end
      post "/signup", to: "customers#create"
      resources :customers, only: :update
      scope :auth do
        post "/login", to: "authentication#create"
        get "/me", to: "authentication#show"
      end
    end
  end
end
