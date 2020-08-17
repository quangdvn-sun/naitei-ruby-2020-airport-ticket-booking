# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_200_814_060_113) do
  create_table "airports", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "location_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(location_id), name: "index_airports_on_location_id"
  end

  create_table "booking_statuses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bookings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "booking_email"
    t.string "booking_name"
    t.string "booking_phone"
    t.text "booking_address"
    t.string "seat_number"
    t.float "total_price"
    t.bigint "flight_id", null: false
    t.bigint "customer_id"
    t.bigint "booking_status_id", null: false
    t.bigint "payment_method_id", null: false
    t.bigint "seat_type_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(booking_status_id), name: "index_bookings_on_booking_status_id"
    t.index %w(customer_id), name: "index_bookings_on_customer_id"
    t.index %w(flight_id), name: "index_bookings_on_flight_id"
    t.index %w(payment_method_id), name: "index_bookings_on_payment_method_id"
    t.index %w(seat_type_id), name: "index_bookings_on_seat_type_id"
  end

  create_table "bookings_services", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "booking_id", null: false
    t.bigint "service_id", null: false
    t.index %w(booking_id), name: "index_bookings_services_on_booking_id"
    t.index %w(service_id), name: "index_bookings_services_on_service_id"
  end

  create_table "customers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password"
    t.string "phone"
    t.text "address"
    t.integer "age"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flight_routes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.float "flight_duration"
    t.float "base_price"
    t.bigint "departure_id"
    t.bigint "arrive_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(arrive_id), name: "index_flight_routes_on_arrive_id"
    t.index %w(departure_id arrive_id), name: "index_flight_routes_on_departure_id_and_arrive_id", unique: true
    t.index %w(departure_id), name: "index_flight_routes_on_departure_id"
  end

  create_table "flight_statuses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flights", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "departure_day"
    t.integer "normal_reserved_seat"
    t.integer "business_reserved_seat"
    t.bigint "plane_id", null: false
    t.bigint "flight_route_id", null: false
    t.bigint "shift_id", null: false
    t.bigint "flight_status_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(flight_route_id), name: "index_flights_on_flight_route_id"
    t.index %w(flight_status_id), name: "index_flights_on_flight_status_id"
    t.index %w(plane_id), name: "index_flights_on_plane_id"
    t.index %w(shift_id), name: "index_flights_on_shift_id"
  end

  create_table "locations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "sub_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "notifications", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "booking_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(booking_id), name: "index_notifications_on_booking_id"
  end

  create_table "payment_methods", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "method_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "plane_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "plane_type"
    t.integer "normal_seat_number"
    t.integer "business_seat_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "planes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "plane_type_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(plane_type_id), name: "index_planes_on_plane_type_id"
  end

  create_table "seat_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.float "price_rate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "services", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.float "fee"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "shifts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.integer "departure_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "staffs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "full_name"
    t.string "user_name"
    t.string "password"
    t.boolean "is_admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index %w(user_name), name: "index_staffs_on_user_name", unique: true
  end

  add_foreign_key "airports", "locations"
  add_foreign_key "bookings", "booking_statuses"
  add_foreign_key "bookings", "customers"
  add_foreign_key "bookings", "flights"
  add_foreign_key "bookings", "payment_methods"
  add_foreign_key "bookings", "seat_types"
  add_foreign_key "flights", "flight_routes"
  add_foreign_key "flights", "flight_statuses"
  add_foreign_key "flights", "planes"
  add_foreign_key "flights", "shifts"
  add_foreign_key "notifications", "bookings"
  add_foreign_key "planes", "plane_types"
end
