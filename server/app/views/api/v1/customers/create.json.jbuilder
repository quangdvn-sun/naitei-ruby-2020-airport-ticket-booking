json.success true
json.customer @customer.attributes.except "password_digest", "created_at", "updated_at"
json.token @token
