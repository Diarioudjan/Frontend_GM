export interface AdminConfig {
  title: string;
  version: string;
  apiBaseUrl: string;
  dateFormat: string;
  currency: string;
}

export interface AdminModule {
  name: string;
  path: string;
  icon: string;
  description: string;
  permissions?: string[];
  children?: Record<string, AdminModule>;
}

export interface AdminModules {
  [key: string]: AdminModule;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  icon: string;
}

export type StatusType = 'order' | 'product' | 'user' | 'payment';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type ProductStatus = 'draft' | 'published' | 'out_of_stock' | 'discontinued';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
