class TransactionSerializer < ActiveModel::Serializer
	attributes :id, :description, :amount, :category_id
	
	
end
