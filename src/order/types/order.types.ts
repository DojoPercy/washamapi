export enum DetergentType {
  SCENTED = "SCENTED",
  HYPOALLERGENIC = "HYPOALLERGENIC"
}

export enum StarchLevel {
  NONE = "NONE",
  LIGHT = "LIGHT",
  MEDIUM = "MEDIUM",
  HEAVY = "HEAVY"
}

export enum DryingMethod {
  AIR_DRY = "AIR_DRY",
  TUMBLE_DRY = "TUMBLE_DRY",
  SUN_DRY = "SUN_DRY"
}

export enum IroningLevel {
  NONE = "NONE",
  LIGHT = "LIGHT",
  MEDIUM = "MEDIUM"
}

export enum ServiceType {
  WASH_AND_FOLD = "WASH_AND_FOLD",
  DRY_CLEANING = "DRY_CLEANING",
  IRON_ONLY = "IRON_ONLY"
}

export enum OrderStatus {
  PENDING = "PENDING",
  PICKUP_SCHEDULED = "PICKUP_SCHEDULED",
  PICKED_UP = "PICKED_UP",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}
export enum PriceCategory {
  BAG = 'BAG',
  DRY_CLEANING = 'DRY_CLEANING'
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED"
}

export enum FeeType {
  RUSH_DELIVERY = "RUSH_DELIVERY",
  NEXT_DAY_DELIVERY = "NEXT_DAY_DELIVERY",
  SERVICE_FEE = "SERVICE_FEE",
  DELIVERY_FEE = "DELIVERY_FEE"
}
