import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export type SortMode = "release_date_desc" | "release_date_asc"

export interface SortSelectProps {
  mode: SortMode,
  onChange: (mode: SortMode) => void
}

const SORT_MODE_TEXTS = {
  release_date_desc: 'Most Recent',
  release_date_asc: 'Oldest'
}

export const SortSelect = (props : SortSelectProps) => {  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {SORT_MODE_TEXTS[props.mode]}
          <ChevronDown />
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex gap-2" onClick={() => props.onChange("release_date_desc")}>
          {SORT_MODE_TEXTS["release_date_desc"]}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2" onClick={() => props.onChange("release_date_asc")}>
          {SORT_MODE_TEXTS["release_date_asc"]}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
