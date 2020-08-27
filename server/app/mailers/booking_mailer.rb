class BookingMailer < ApplicationMailer
  def one_way_payment_confirmation response
    @total_price = response[:data][:total_price]
    @payment_method = response[:data][:payment_method]
    @user = response[:data][:user]
    @bookings = response[:data][:bookings]
    @departure_day = response[:data][:departure_day]

    mail to: @user[:email], subject: t(".subject")
  end

  def round_trip_paymnent_confirmation response
    @total_price = response[:data][:total_price]
    @payment_method = response[:data][:payment_method]
    @user = response[:data][:user]
    @first_bookings = response[:data][:first_bookings]
    @first_departure_day = response[:data][:first_departure_day]
    @second_bookings = response[:data][:second_bookings]
    @second_departure_day = response[:data][:second_departure_day]

    mail to: @user[:email], subject: t(".subject")
  end
end
