export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description?: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
}