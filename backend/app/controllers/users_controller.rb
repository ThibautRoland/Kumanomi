class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      puts "User created successfully"
      render json: @user
    else
      puts "User not created"
      render json: false
    end

  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest, :password_confirmation)
  end
end
