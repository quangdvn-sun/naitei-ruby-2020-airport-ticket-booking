class ApiController < ApplicationController
  before_action :set_default_format
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :phone, :address, :age])
  end

  def default_url_options
    {locale: I18n.locale}
  end

  def set_default_format
    request.format = :json
  end
end
