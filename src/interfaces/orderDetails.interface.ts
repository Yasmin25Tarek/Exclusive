import { IBrand } from "./brand.interface"
import { ICategory } from "./category.interface"
import { ISubcategory } from "./subcategory.interface"

export type Root = IOrderDetails[]

export interface IOrderDetails {
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
  __v: number
  paidAt?: string
}

export interface ShippingAddress {
  details: string
  city: string
  phone?: string
  postalCode?: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItem {
  count: number
  product: Product
  price: number
  _id: string
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
