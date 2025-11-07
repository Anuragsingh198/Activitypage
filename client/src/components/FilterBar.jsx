import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Video, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, selectFilters, setFilters } from "@/store/slices/activitiesSlice";

const typeOptions = [
  { value: "All", label: "All Types" },
  { value: "Online Class", label: "Classes", icon: Video },
  { value: "Quiz", label: "Quizzes", icon: ClipboardCheck },
  { value: "Assignment", label: "Assignments", icon: FileText },
  { value: "Discussion", label: "Discussions", icon: MessageSquare },
];

const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Not Started", label: "Not Started" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

export function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const hasActiveFilters = 
    filters.type !== "All" || 
    filters.status !== "All" || 
    filters.search !== "";

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-card border-b p-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search activities..."
            className="pl-10 bg-white dark:bg-card"
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            data-testid="input-search"
          />
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={() => dispatch(clearFilters())}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
          Type:
        </div>
        {typeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = filters.type === option.value;
          return (
            <Button
              key={option.value}
              variant={isActive ? "default" : "outline"}
              onClick={() => dispatch(setFilters({ type: option.value }))}
              className="rounded-full"
              data-testid={`button-filter-type-${option.value.toLowerCase().replace(" ", "-")}`}
            >
              {Icon && <Icon className="h-3 w-3 mr-1.5" />}
              {option.label}
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
          Status:
        </div>
        {statusOptions.map((option) => {
          const isActive = filters.status === option.value;
          return (
            <Button
              key={option.value}
              variant={isActive ? "default" : "outline"}
              onClick={() => dispatch(setFilters({ status: option.value }))}
              className="rounded-full"
              data-testid={`button-filter-status-${option.value.toLowerCase().replace(" ", "-")}`}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

