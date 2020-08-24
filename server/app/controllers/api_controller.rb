class ApiController < ApplicationController
  before_action :set_default_format

  attr_reader :current_customer

  def authenticate_token!
    payload = JsonWebToken.decode auth_token
    return if payload.blank?

    @current_customer = Customer.find_by id: payload["id"]

    @current_customer.nil? &&
      render(json: {success: false, message: I18n.t("customers.unavailable")}, status: :not_found)
  rescue JWT::DecodeError
    render json: {success: false, message: I18n.t("customers.invalid_token")}, status: :unauthorized
  end

  def auth_token
    @auth_token ||= request.headers.fetch("Authorization", "").split(" ").last
  end

  def default_url_options
    {locale: I18n.locale}
  end

  def set_default_format
    request.format = :json
  end
end
