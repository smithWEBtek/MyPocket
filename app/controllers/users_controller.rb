class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit]

	def index
		@users = User.all
		respond_to do |f|
			f.html {render :index}
			f.json {render json: @users}
		end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    return render :new unless @user.save
    session[:user_id] = @user.id
    redirect_to user_path(@user)
  end

  def show
    @categories = Category.all
    if params[:category].present?
      @transactions = current_user.transactions.where(category: params[:category])
    elsif params[:price].present?
      if params[:price] == "Low to High"
        @transactions = current_user.transactions.by_low_price
      else params[:price] == "High to low"
        @transactions = current_user.transactions.by_high_price
      end
    else
			@transactions = current_user.transactions
			
			respond_to do |f|
				f.html {render :show}
				# f.json {render json: @transactions}
				f.json {render json: current_user}
			end
    end
  end

  def edit
    return head(:forbidden) unless session.include? :user_id
  end

  private

    def set_user
      @user = User.find_by(id: params[:id])
    end 

    def user_params
      params.require(:user).permit(
        :name,
        :password,
        :password_confirmation
      )
    end
end
