import { icons } from "@/lib/icons/icons"

interface IconProps {
    className?: string 
    icon: keyof typeof icons

}

export function Icon({className, icon} : IconProps) {
    return (
      <svg className={className} aria-hidden='true' focusable='false' viewBox='0 0 50 50'>
        <path d={icon} />
      </svg>
    )
}