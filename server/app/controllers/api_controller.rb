class ApiController < ApplicationController
  before_action :set_default_format

  def default_url_options
    {locale: I18n.locale}
  end

  def set_default_format
    request.format = :json
  end
end
