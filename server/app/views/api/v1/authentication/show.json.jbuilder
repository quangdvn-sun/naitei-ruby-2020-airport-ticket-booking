json.success true
json.data @current_customer.attributes.except "password_digest", "created_at", "updated_at"
