"use client";

import { Star, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "../types";
import { formatPrice } from "../utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge variant="secondary" className="mb-2 bg-secondary/50">
              {product.category}
            </Badge>
            <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors duration-300">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            className="w-full gap-2" 
            onClick={() => onAddToCart(product)}
          >
            <ShoppingBag className="h-4 w-4" />
            カートに追加
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}