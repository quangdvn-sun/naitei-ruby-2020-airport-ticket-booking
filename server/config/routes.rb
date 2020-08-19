Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :flights, only: :create
      resources :bookings, only: :create
    end
  end
end
