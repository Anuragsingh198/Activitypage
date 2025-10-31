import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, X, Filter as FilterIcon } from "lucide-react";
import { setFilters, clearFilters, selectFilters } from "@/store/slices/activitiesSlice";
import { ActivityStatus, ActivityType } from "@/types/activity";

export default function ActivityFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-card border-b">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Mobile bar */}
        <div className="flex items-center justify-between md:hidden">
          <div className="text-sm font-medium text-card-foreground">Filters</div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-4 space-y-4">
                <SheetHeader>
                  <SheetTitle>Search</SheetTitle>
                </SheetHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search activities..."
                    className="pl-10 w-full bg-white dark:bg-card"
                    value={filters.search}
                    onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Filters">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-4 space-y-4">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Type</div>
                    <Select value={filters.type} onValueChange={(v) => dispatch(setFilters({ type: v as ActivityType | "All" }))}>
                      <SelectTrigger className="h-10 bg-white dark:bg-card text-sm">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent align="start" className="text-sm">
                        <SelectItem value="All" className="text-sm font-normal">All Types</SelectItem>
                        <SelectItem value="Online Class" className="text-sm font-normal">Online Class</SelectItem>
                        <SelectItem value="Quiz" className="text-sm font-normal">Quiz</SelectItem>
                        <SelectItem value="Assignment" className="text-sm font-normal">Assignment</SelectItem>
                        <SelectItem value="Discussion" className="text-sm font-normal">Discussion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Status</div>
                    <Select value={filters.status} onValueChange={(v) => dispatch(setFilters({ status: v as ActivityStatus | "All" }))}>
                      <SelectTrigger className="h-10 bg-white dark:bg-card text-sm">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent align="start" className="text-sm">
                        <SelectItem value="All" className="text-sm font-normal">All Status</SelectItem>
                        <SelectItem value="Not Started" className="text-sm font-normal">Not Started</SelectItem>
                        <SelectItem value="In Progress" className="text-sm font-normal">In Progress</SelectItem>
                        <SelectItem value="Completed" className="text-sm font-normal">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(filters.type !== "All" || filters.status !== "All" || filters.search !== "") && (
                    <Button variant="ghost" size="sm" onClick={() => dispatch(clearFilters())} className="w-full">
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop filters */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-2 w-full overflow-x-auto">
            <div className="relative w-[50%] min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities..."
                className="pl-10 w-full bg-white dark:bg-card"
                value={filters.search}
                onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-2 justify-end whitespace-nowrap">
              <span className="text-xs text-muted-foreground">Type</span>
              <Select value={filters.type} onValueChange={(v) => dispatch(setFilters({ type: v as ActivityType | "All" }))}>
                <SelectTrigger className="h-9 w-[140px] bg-white dark:bg-card text-xs font-normal">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent align="start" className="text-xs">
                  <SelectItem value="All" className="text-xs font-normal">All Types</SelectItem>
                  <SelectItem value="Online Class" className="text-xs font-normal">Online Class</SelectItem>
                  <SelectItem value="Quiz" className="text-xs font-normal">Quiz</SelectItem>
                  <SelectItem value="Assignment" className="text-xs font-normal">Assignment</SelectItem>
                  <SelectItem value="Discussion" className="text-xs font-normal">Discussion</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-xs text-muted-foreground">Status</span>
              <Select value={filters.status} onValueChange={(v) => dispatch(setFilters({ status: v as ActivityStatus | "All" }))}>
                <SelectTrigger className="h-9 w-[140px] bg-white dark:bg-card text-xs font-normal">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent align="start" className="text-xs">
                  <SelectItem value="All" className="text-xs font-normal">All Status</SelectItem>
                  <SelectItem value="Not Started" className="text-xs font-normal">Not Started</SelectItem>
                  <SelectItem value="In Progress" className="text-xs font-normal">In Progress</SelectItem>
                  <SelectItem value="Completed" className="text-xs font-normal">Completed</SelectItem>
                </SelectContent>
              </Select>

              {(filters.type !== "All" || filters.status !== "All" || filters.search !== "") && (
                <Button variant="ghost" size="sm" onClick={() => dispatch(clearFilters())} className="shrink-0">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


