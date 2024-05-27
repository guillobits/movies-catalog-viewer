import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateSortMode } from "@/lib/features/movies/movies.slice"

export type SortMode = "release_date_desc" | "release_date_asc"

const SORT_MODE_TEXTS = {
  release_date_desc: "Most Recent",
  release_date_asc: "Oldest",
}

export const SortSelect = () => {
  const sortMode = useAppSelector((state) => state.movies.sortMode)
  const dispatch = useAppDispatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-test-id="SortSelect">
          {SORT_MODE_TEXTS[sortMode]}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => dispatch(updateSortMode("release_date_desc"))}
        >
          {SORT_MODE_TEXTS["release_date_desc"]}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => dispatch(updateSortMode("release_date_asc"))}
        >
          {SORT_MODE_TEXTS["release_date_asc"]}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
