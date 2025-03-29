
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 pb-0">
        <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
          <img 
            src={product.image || '/placeholder.svg'} 
            alt={product.name}
            className="h-full w-full object-cover object-center" 
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          {product.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
              ))}
              <span className="ml-1 text-sm text-gray-600">({product.reviewCount || 0})</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold">₹{product.price.toLocaleString()}</div>
        <Link 
          to={`/product/${product.id}`} 
          className="px-3 py-1.5 bg-terracotta-500 text-white rounded-md text-sm hover:bg-terracotta-600 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
