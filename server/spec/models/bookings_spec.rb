require "rails_helper"

RSpec.describe Booking, type: :model do
  describe "validations" do
    context "when all required fields are given" do
      let(:booking){FactoryBot.build :booking}
      it "should be true" do
        expect(booking.valid?).to eq true
      end
    end

    context "when required fields are missing" do
      let(:booking_fail){FactoryBot.build :booking, booking_name: nil}
      it "should be false" do
        expect(booking_fail.valid?).to eq false
      end
    end
  end

  describe "associations" do
    it "should optinally belong to customer" do
      is_expected.to belong_to(:customer).optional
    end
    it "should belong to booking status" do
      is_expected.to belong_to :booking_status
    end
    it "should belong to payment method" do
      is_expected.to belong_to :payment_method
    end
    it "should belong to seat type" do
      is_expected.to belong_to :seat_type
    end
    it "should belong to flight" do
      is_expected.to belong_to :flight
    end
    it "should have and belong to services" do
      is_expected.to have_and_belong_to_many :services
    end
  end

  describe "delegations" do
    it "should delegate to flight with method #plane" do
      should delegate_method(:plane).to :flight
    end
    it "should delegate to seat type with method #name" do
      should delegate_method(:name).to(:seat_type).with_prefix
    end
    it "should delegate to booking status with method #name" do
      should delegate_method(:name).to(:booking_status).with_prefix
    end
    it "should delegate to payment method with method #method_name" do
      should delegate_method(:method_name).to :payment_method
    end
  end

  describe "scopes" do
    let!(:booking_status_1){FactoryBot.create(:booking_status, :pending)}
    let!(:booking_status_2){FactoryBot.create(:booking_status, :success)}

    describe "#search_by_id" do
      let(:booking1){FactoryBot.create :booking}
      it "should return bookings of a customer with that Id" do
        expect(Booking.search_by_id(booking1.customer_id)).to eq [booking1]
      end
    end

    describe "#is_pending" do
      let(:booking2){FactoryBot.create :booking, booking_status_id: booking_status_1.id}
      it "should return bookings with status of pending" do
        expect(Booking.is_pending).to eq [booking2]
      end
    end

    describe "#is_success" do
      let(:booking3){FactoryBot.create :booking, booking_status_id: booking_status_2.id}
      it "should return bookings with status of success" do
        expect(Booking.is_success).to eq [booking3]
      end
    end
  end
end
