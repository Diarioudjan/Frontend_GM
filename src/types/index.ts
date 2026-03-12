export interface User {
    id: string;
    _id?: string;
    prenom: string;
    nom: string;
    email: string;
    telephone?: string;
    role: 'client' | 'vendeur' | 'admin';
    boutique?: string;
    adresses?: Address[];
    avatar?: string;
}

export interface Address {
    _id?: string;
    id?: string;
    label: string;
    rue: string;
    ville: string;
    region: string;
    isDefault: boolean;
}

export interface Product {
    id: string;
    _id?: string;
    nom: string;
    description: string;
    prix: number;
    categorie: string;
    region: string;
    stock: number;
    images: string[];
    vendeur?: string;
    createdAt?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface OrderItem {
    product?: Product;
    productId?: string;
    id?: string;
    nom?: string;
    prix?: number;
    quantity: number;
}

export interface Order {
    _id: string;
    id?: string;
    items?: {
        product: Product;
        quantity: number;
        prix: number;
    }[];
    orderItems?: OrderItem[];
    total?: number;
    totalPrice?: number;
    status: string;
    adresseLivraison?: Address;
    date?: string;
    createdAt: string;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data: T;
}
