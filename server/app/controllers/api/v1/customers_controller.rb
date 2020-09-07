class Api::V1::CustomersController < ApiController
  before_action :authenticate_customer!, only: :update
  before_action :find_customer, only: :update
  before_action :require_same_customer, only: :update

  def create
    @customer = Customer.new customer_create_params

    if @customer.save
      @token = JsonWebToken.encode id: @customer.id
      render :create, status: :ok
    else
      validation_errors = @customer.errors.full_messages
      render json: {success: false, message: I18n.t("customers.unable_create"), errors: validation_errors},
              status: :bad_request
    end
  end

  def update
    if @customer.update customer_update_params
      render :update, status: :ok
    else
      validation_errors = @customer.errors.full_messages
      render json: {success: false, message: I18n.t("customers.unable_update"), errors: validation_errors},
              status: :bad_request
    end
  end

  private

  def customer_create_params
    params.permit Customer::CUSTOMERS_CREATE_PARAMS
  end

  def customer_update_params
    params.permit Customer::CUSTOMERS_UPDATE_PARAMS
  end

  def require_same_customer
    return if current_customer? @customer

    render json: {success: false, message: I18n.t("customers.forbidden")}, status: :forbidden
  end

  def find_customer
    @customer = Customer.find_by id: params[:id]
    return if @customer

    render json: {success: false, message: I18n.t("customers.not_found")}, status: :not_found
  end

  def current_customer? customer
    customer && customer == current_customer
  end
end
