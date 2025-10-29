# Design Guidelines: Cross-Platform Activity Listing Page

## Design Approach

**Selected Approach:** Design System - Material Design 3
**Justification:** Educational platforms require consistency, clarity, and strong visual hierarchy for information-dense interfaces. Material Design provides excellent cross-platform patterns, robust component libraries (Material UI for web, React Native Paper for mobile), and proven usability in learning applications.

**Key Design Principles:**
1. **Clarity First:** Every activity status, type, and action must be immediately scannable
2. **Consistent Hierarchy:** Information density balanced with breathing room
3. **Action-Oriented:** CTAs guide users naturally through their learning journey
4. **Cross-Platform Parity:** Identical information architecture with platform-appropriate patterns

---

## Core Design Elements

### A. Typography System

**Font Family:** 
- Primary: Roboto (web) / System Default (mobile - SF Pro/Roboto)
- Monospace: Roboto Mono (for duration/date displays)

**Hierarchy:**
- Page Title: 32px/2rem, Medium (500)
- Section Headers: 24px/1.5rem, Medium
- Activity Title: 18px/1.125rem, Medium
- Activity Metadata: 14px/0.875rem, Regular (400)
- Type Badge: 12px/0.75rem, Medium (all caps with letter-spacing: 0.5px)
- Filter Labels: 14px/0.875rem, Medium
- Button Text: 14px/0.875rem, Medium

### B. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (badges, chips): 2, 4
- Component internal: 4, 6, 8
- Component external: 12, 16
- Section breaks: 20, 24

**Grid Structure:**

**Web:**
- Container: max-w-7xl (1280px) with px-6
- Activity Grid: 
  - Large screens: 3 columns (grid-cols-3)
  - Medium screens: 2 columns (grid-cols-2)
  - Small screens: 1 column (grid-cols-1)
- Gap between cards: gap-6

**Mobile:**
- Single column with px-4 container
- Cards fill width with mb-4 spacing

**Filter Bar Layout:**
- Web: Horizontal flex with wrap, sticky top position (top-0 z-10)
- Mobile: Collapsible accordion or bottom sheet for filters, search bar always visible

---

## C. Component Library

### 1. Filter Bar Components

**Search Input:**
- Height: h-12
- Leading icon (search/magnifying glass)
- Border radius: rounded-lg
- Padding: px-4
- Placeholder: "Search activities..."

**Filter Chips (Type/Status):**
- Height: h-10
- Horizontal padding: px-4
- Border radius: rounded-full
- Gap between chips: gap-2
- Active state: distinct elevation (shadow-md)
- Inactive state: subtle border

**Clear Filters Button:**
- Text button, no background
- Positioned at end of filter row
- Only visible when filters active

### 2. Activity Card Design

**Card Structure:**
- Border radius: rounded-xl
- Elevation: shadow-sm (default), shadow-md (hover on web)
- Padding: p-6
- Min height: Variable based on content

**Card Layout (Top to Bottom):**

1. **Header Row** (flex justify-between items-start):
   - Activity Type Badge (left) - pill shaped, rounded-full, px-3, py-1
   - Status Indicator (right) - dot + text combo

2. **Activity Title** (mt-3):
   - Line clamp: 2 lines max
   - mb-4

3. **Metadata Grid** (grid grid-cols-2 gap-4 mb-6):
   - Date/Due Date with calendar icon
   - Duration with clock icon (for classes)
   - Program/Week (if applicable)
   - Icons: 16px, positioned before text

4. **Action Button** (full width):
   - Height: h-11
   - Border radius: rounded-lg
   - Text transforms based on status:
     - "Start Activity" (Not Started)
     - "Continue Learning" (In Progress)
     - "Review & Reflect" (Completed)
   - Icon: trailing chevron-right for Start/Continue, eye icon for Review

**Type Badge Variations:**
- Online Class: Solid fill with video icon
- Quiz: Solid fill with clipboard-check icon
- Assignment: Solid fill with document icon
- Discussion: Solid fill with chat-bubbles icon

**Status Indicator Patterns:**
- Not Started: Outlined dot (○) + label
- In Progress: Pulsing filled dot (●) + label + progress ring if applicable
- Completed: Checkmark in circle (✓) + label

### 3. Empty States

**No Results Found:**
- Centered container with max-w-md
- Large icon (w-24 h-24) - search with x or empty folder
- Heading: "No activities found"
- Subtext: "Try adjusting your filters or search term"
- Clear filters button below

**Initial Load Empty:**
- Icon: graduation cap or books
- Heading: "Your learning journey starts here"
- Subtext: "Activities will appear as they're assigned"

### 4. Loading States

**Initial Load:**
- Skeleton cards matching actual card structure
- 6 skeleton cards in grid
- Pulse animation

**Filter Changes:**
- Subtle fade transition between states
- Loading spinner in filter bar

---

## D. Interactions & Transitions

**Card Interactions (Web Only):**
- Hover: elevation increase (shadow-sm to shadow-md), subtle scale (scale-[1.02])
- Transition: transition-all duration-200 ease-out
- Active: slight scale down (scale-[0.98])

**Mobile Touch Feedback:**
- Ripple effect on card tap (Material Design standard)
- No hover states

**Filter Interactions:**
- Chip selection: immediate visual feedback with subtle scale
- Search: debounced (300ms) filtering
- Filter changes: smooth fade transition for list

**Theme Toggle:**
- Positioned in top-right corner (web) or settings menu (mobile)
- Moon/Sun icon switch
- Instant theme change, no loading

---

## E. Responsive Breakpoints

- Mobile: < 640px (single column, stacked filters)
- Tablet: 640px - 1024px (2-column grid, horizontal filters)
- Desktop: > 1024px (3-column grid, full filter bar)

**Mobile-Specific Patterns:**
- Filter bar: Sticky header with search, "Filters" button opens bottom sheet
- Cards: Full width with optimized touch targets (min 44px)
- Bottom sheet filters: Grouped by category (Type, Status) with apply/clear actions

**Web-Specific Patterns:**
- Sticky filter bar with horizontal scroll if needed
- Hover states and tooltips for additional info
- Keyboard navigation support (tab through filters and cards)

---

## F. Special Considerations

**Accessibility:**
- All interactive elements: min 44px touch target (mobile) / 40px (web)
- ARIA labels for status indicators and badges
- Keyboard navigation: logical tab order, focus visible states
- Screen reader announcements for filter changes and list updates
- Sufficient contrast ratios maintained in both light/dark modes

**Performance Optimizations:**
- Virtualized list on mobile (FlatList) for 50+ items
- Lazy image loading if activity thumbnails added later
- Memoized filter computations
- Debounced search input

**Cross-Platform Consistency:**
- Identical information architecture
- Same spacing ratios (adapt units for platform)
- Matching typography hierarchy
- Consistent iconography (size adjustments for platform)
- Platform-appropriate interactions (hover vs touch)

---

## Images

**No hero images required** - This is a functional application page, not a marketing page. Focus remains on the activity list content and filtering functionality.

If activity thumbnails are added in future iterations:
- Aspect ratio: 16:9 or 4:3
- Position: Top of each activity card
- Size: Full card width, max height 180px
- Placeholder: Gradient or pattern if no image available