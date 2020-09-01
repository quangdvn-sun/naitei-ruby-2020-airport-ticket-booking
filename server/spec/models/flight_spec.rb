require "rails_helper"

RSpec.describe Flight, type: :model do
  describe "validations" do
    context "when all required fields are given" do
      let(:flight){FactoryBot.build :flight}
      it "should be true" do
        expect(flight.valid?).to eq true
      end
    end

    context "when required fields are missing" do
      let(:flight_fail){FactoryBot.build :flight, plane_id: nil}
      it "should be false" do
        expect(flight_fail.valid?).to eq false
      end
    end
  end

  describe "associations" do
    it "should belong to plane" do
      is_expected.to belong_to :plane
    end
    it "should belong to flight route" do
      is_expected.to belong_to :flight_route
    end
    it "should belong to shift" do
      is_expected.to belong_to :shift
    end
    it "should belong to flight status" do
      is_expected.to belong_to :flight_status
    end
    it "should have many bookings" do
      is_expected.to have_many(:bookings).dependent :destroy
    end
  end

  describe "delegations" do
    it "should delegate to plane with method #name" do
      should delegate_method(:name).to(:plane).with_prefix
    end
    it "should delegate to shift with method #name" do
      should delegate_method(:name).to(:shift).with_prefix
    end
    it "should delegate to flight status with method #name" do
      should delegate_method(:name).to(:flight_status).with_prefix
    end
    it "should delegate to plane with method #plane_type_name" do
      should delegate_method(:plane_type_name).to :plane
    end
    it "should delegate to plane with method #normal_seat_number" do
      should delegate_method(:normal_seat_number).to :plane
    end
    it "should delegate to plane with method #business_seat_number" do
      should delegate_method(:business_seat_number).to :plane
    end
    it "should delegate to shift with method #departure_time" do
      should delegate_method(:departure_time).to :shift
    end
    it "should delegate to flight route with method #base_price" do
      should delegate_method(:base_price).to :flight_route
    end
    it "should delegate to flight route with method #flight_duration" do
      should delegate_method(:flight_duration).to :flight_route
    end
  end

  describe "scopes" do
    describe "#search_by_day" do
      let(:flight1){FactoryBot.create :flight}
      it "should return flights of a customer with that Id" do
        expect(Flight.search_by_day(flight1.departure_day)).to eq [flight1]
      end
    end

    describe "#search_by_route" do
      let(:flight2){FactoryBot.create :flight}
      it "should return flights with status of pending" do
        expect(Flight.search_by_route(flight2.flight_route_id)).to eq [flight2]
      end
    end
  end
end
