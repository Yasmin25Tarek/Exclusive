import { IBrand } from "./brand.interface"
import { ICategory } from "./category.interface"
import { ISubcategory } from "./subcategory.interface"

export interface IOrderReasponse {
  results: number
  metadata: Metadata
  data: IOrder[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface IOrder {
  shippingAddress?: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
  paidAt?: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}

export interface Product {
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  id: string
}
