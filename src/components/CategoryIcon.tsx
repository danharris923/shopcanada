import {
  Shirt,
  Sparkles,
  Gem,
  Footprints,
  Heart,
  Coffee,
  Home,
  Leaf,
  UtensilsCrossed,
  ShoppingBag,
  Baby,
  Glasses,
  PawPrint,
  ShoppingCart,
  Scissors,
  Cookie,
  Salad,
  type LucideIcon
} from 'lucide-react'

// Map category names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  'Clothing': Shirt,
  'Beauty': Sparkles,
  'Jewellery': Gem,
  'Shoes': Footprints,
  'Health': Heart,
  'Coffee': Coffee,
  'Home': Home,
  'Food': Leaf,
  'Restaurant': UtensilsCrossed,
  'Accessories': ShoppingBag,
  'Intimates': Sparkles,
  'Keto': Salad,
  'Snacks': Cookie,
  'Haircare': Scissors,
  'Pets': PawPrint,
  'Retail': ShoppingCart,
  'Eyewear': Glasses,
  'Baby': Baby,
}

interface CategoryIconProps {
  category: string
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 24, className = '' }: CategoryIconProps) {
  const Icon = iconMap[category] || Leaf
  return <Icon size={size} className={className} />
}

// Export the icon map for use in other components
export { iconMap }
