require "rails_helper"

RSpec.describe Customer, type: :model do
  let(:customer) {FactoryBot.build :customer}
  let(:customer_fail) {FactoryBot.build :customer, full_name: nil}

  describe "Customer validations" do
    context "when all required fields are given" do
      it "should be true" do
        expect(customer.valid?).to eq true
      end
    end

    context "when required fields are missing" do
      it "should be false" do
        expect(customer_fail.valid?).to eq false
      end
    end
  end

  describe "Customer associations" do
    it "should have many bookings" do
      is_expected.to have_many(:bookings).dependent :destroy
    end
  end
end
