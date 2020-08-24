class Api::V1::CustomersController < ApiController
  def create
    @customer = Customer.new customer_params

    if @customer.save
      @token = JsonWebToken.encode id: @customer.id
      render :create, status: :ok
    else
      validation_errors = @customer.errors.full_messages
      render json: {success: false, message: I18n.t("customers.unable_create"), errors: validation_errors},
              status: :bad_request
    end
  end

  private

  def customer_params
    params.permit Customer::CUSTOMERS_PARAMS
  end
end
