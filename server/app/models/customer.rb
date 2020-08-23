class Customer < ApplicationRecord
  VALID_EMAIL_REGEX = Settings.validations.user.email_regex
  VALID_PHONE_REGEX = Settings.validations.user.phone_regex
  CUSTOMERS_PARAMS = %i(full_name email password password_confirmation phone address age).freeze

  has_many :bookings, dependent: :destroy

  validates :full_name, presence: true,
    length: {minimum: Settings.validations.user.name_minlength,
             maximum: Settings.validations.user.name_maxlength}

  validates :email, presence: true,
    length: {minimum: Settings.validations.user.email_minlength,
             maximum: Settings.validations.user.email_maxlength},
    format: {with: VALID_EMAIL_REGEX},
    uniqueness: {case_sensitive: false}

  validates :password, presence: true,
    length: {minimum: Settings.validations.user.password_minlength,
             maximum: Settings.validations.user.password_maxlength},
    allow_nil: true

  validates :phone, presence: true,
    length: {minimum: Settings.validations.user.phone_minlength,
             maximum: Settings.validations.user.phone_maxlength},
    format: {with: VALID_PHONE_REGEX},
    uniqueness: {case_sensitive: false}

  validates :address, presence: true

  validates :age, presence: true,
            numericality: {only_integer: true, greater_than_or_equal_to: Settings.validations.user.min_age}

  before_save :downcase_email

  has_secure_password

  private

  def downcase_email
    email.downcase!
  end
end
