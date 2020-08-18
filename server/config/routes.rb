Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :flights, only: :create
    end
  end
end
