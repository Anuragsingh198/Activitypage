import { FilterBar } from "../FilterBar";
import { useActivityStore } from "@/lib/activity-store";

export default function FilterBarExample() {
  const store = useActivityStore();
  
  return (
    <div>
      <FilterBar />
      <div className="p-6 text-sm text-muted-foreground">
        <div>Current filters:</div>
        <div>Type: {store.filters.type}</div>
        <div>Status: {store.filters.status}</div>
        <div>Search: {store.filters.search || "(empty)"}</div>
      </div>
    </div>
  );
}
