class BookingMailer < ApplicationMailer
  def payment_confirmation response
    @total_price = response[:data][:total_price]
    @payment_method = response[:data][:payment_method]
    @user = response[:data][:user]
    @bookings = response[:data][:bookings]

    mail to: @user[:email], subject: t(".subject")
  end
end
