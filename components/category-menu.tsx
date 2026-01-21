"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// Mobile-first dropdown; routes to /catalogue with query params
export function CategoryMenu() {
  const router = useRouter()
  const go = (params: Record<string, string>) => {
    const usp = new URLSearchParams(params).toString()
    router.push(`/catalogue?${usp}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 px-3 text-sm font-medium hover:bg-muted/50">
          Categories
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-56 w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">Garments</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => go({ category: "garments", segment: "kids" })}
            >
              Kids
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => go({ category: "garments", segment: "mens" })}
            >
              Mens
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => go({ category: "garments", segment: "womens" })}
            >
              Womens
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "footwear" })}
        >
          Footwear
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "luggage" })}
        >
          Luggage
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "accessories" })}
        >
          Accessories
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "kitchen" })}
        >
          Kitchen
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "fmcg" })}
        >
          FMCG
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => go({ category: "electronics" })}
        >
          Electronics
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
