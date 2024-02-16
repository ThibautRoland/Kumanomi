class User < ApplicationRecord

    has_secure_password :password, validations: true
    validates :email, presence: true, uniqueness: true
    validates :first_name, :last_name, presence: true
end

