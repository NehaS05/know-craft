# Know-Craft AI Chatbot Design Guidelines

## Design Approach

**Selected Approach**: Design System - Carbon Design System
**Justification**: Carbon Design System (IBM) is purpose-built for enterprise applications with data-intensive interfaces, aligning perfectly with fintech requirements for trust, clarity, and data handling. Its emphasis on information hierarchy and accessibility meets the dual-user-type structure with clear role differentiation.

**Key Design Principles**:
- **Trust Through Clarity**: Clean, predictable interfaces that communicate security and professionalism
- **Role-Based Visual Hierarchy**: Clear visual distinction between internal team and client interfaces without separate designs
- **Data-First Layout**: Prioritize conversation history, audit logs, and query/response displays
- **Functional Efficiency**: Minimize cognitive load with consistent patterns and clear information architecture

---

## Typography

**Font Families**:
- Primary: Inter or IBM Plex Sans (via Google Fonts CDN)
- Monospace: IBM Plex Mono for technical data, timestamps, IDs

**Type Scale**:
- H1: 2.5rem (40px), font-weight-700 - Dashboard headers
- H2: 2rem (32px), font-weight-600 - Section headers
- H3: 1.5rem (24px), font-weight-600 - Panel titles
- Body Large: 1.125rem (18px), font-weight-400 - Chat messages
- Body: 1rem (16px), font-weight-400 - Standard text
- Caption: 0.875rem (14px), font-weight-400 - Metadata, timestamps
- Label: 0.75rem (12px), font-weight-600, uppercase, letter-spacing-wider - Form labels, badges

**Text Hierarchy in Chat**:
- User questions: Body Large, font-weight-500
- AI responses: Body Large, font-weight-400
- System messages: Body, font-weight-400, italic
- Timestamps: Caption
- User role badges: Label

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Micro spacing (within components): p-2, gap-2
- Component internal: p-4, gap-4, m-4
- Section spacing: p-6, p-8, gap-8
- Major sections: p-12, p-16, py-24
- Page margins: px-6 (mobile), px-12 (desktop)

**Container Strategy**:
- Full-width app shell: w-full
- Main content area: max-w-7xl mx-auto
- Chat container: max-w-4xl mx-auto
- Sidebar widths: w-64 (collapsed), w-80 (expanded)

**Grid Systems**:
- Dashboard metrics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Conversation history: Single column list with dividers
- Split view (query/response): grid-cols-1 lg:grid-cols-2 gap-8

---

## Component Library

### Navigation & App Shell

**Top Navigation Bar**:
- Fixed header: h-16, px-6, flex items-center justify-between
- Logo + company name on left
- User profile, role badge (Internal Team / Client), notifications, menu on right
- Role indicator badge using Label typography with px-3 py-1 rounded-full

**Sidebar Navigation** (for internal team):
- w-64, full-height, border-r
- Navigation items: py-3 px-4, flex items-center gap-3
- Active state: Visual indicator (border-l-4 or subtle background)
- Collapsible sections for knowledgebase management, audit logs, settings
- Clients get simplified sidebar: Chat, History, Profile only

### Chat Interface (Core Component)

**Chat Container**:
- Two-column layout on desktop: Conversation list (w-80) + Active chat (flex-1)
- Mobile: Single column with toggle between list and active chat
- Conversation list: Scrollable panel with search, filter by date/user type
- Each conversation item: p-4, border-b, hover state, shows preview, timestamp, user type badge

**Message Display**:
- Messages in alternating layout pattern
- User messages: ml-auto, max-w-2xl, rounded-2xl rounded-br-none, p-4, mb-4
- AI responses: mr-auto, max-w-2xl, rounded-2xl rounded-bl-none, p-4, mb-4
- System messages: mx-auto, max-w-md, text-center, p-3, rounded-lg, mb-4
- Each message includes timestamp (Caption typography) and role indicator where relevant

**Input Area**:
- Fixed bottom: sticky bottom-0, p-4, border-t
- Textarea with auto-expand: min-h-12, rounded-lg, p-3, border
- Send button: Positioned absolute right within input container
- Character counter (if needed): Caption typography, text-right, mt-1
- File attachment button for document upload (internal team only)

### Data Display Components

**Audit Log Table**:
- Responsive table with sticky header: overflow-x-auto
- Columns: Timestamp, User, Role, Query Preview, Response Preview, Actions
- Row hover state with subtle elevation
- Pagination controls: Bottom-center, flex gap-2, p-4
- Export button: Top-right of table header

**Metrics Dashboard** (internal team only):
- Grid of metric cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Each card: p-6, rounded-lg, border
- Card structure: Label (metric name), H2 (number), Caption (change indicator)
- Visual separators between sections: border-t, my-8

**Query History Panel**:
- List view with collapsible items
- Each item: p-4, border-b, cursor-pointer
- Expanded state shows full query + response with copy buttons
- Filter controls at top: Flex row with date range, user type filter, search

### Forms & Authentication

**Login Screen**:
- Centered card: max-w-md mx-auto, mt-24, p-8, rounded-lg, border
- Logo + company name at top (text-center, mb-8)
- Form fields with proper spacing: space-y-6
- Each input: Full width, h-12, px-4, rounded-lg, border
- Submit button: Full width, h-12, rounded-lg, font-weight-600
- Role selection (if applicable): Radio buttons or toggle, mb-6

**Role Selection Badge Display**:
- After login, show active role in top nav
- Badge style: Label typography, px-4 py-2, rounded-full, border-2
- Internal Team vs Client visually distinct through border treatment

### Overlays & Modals

**Confirmation Dialogs**:
- Centered overlay: max-w-md, p-6, rounded-lg, border, shadow-xl
- Header: H3 typography, mb-4
- Body text: Body typography, mb-6
- Action buttons: Flex justify-end gap-3, button heights h-10

**Settings Panel** (slide-out):
- Fixed right, h-full, w-96, p-6, border-l, shadow-2xl
- Sections separated by border-b, py-6
- Toggle switches for preferences: flex justify-between items-center, h-12

### Knowledgebase Management (Internal Team Only)

**Document Upload Area**:
- Drag-and-drop zone: min-h-48, border-2 border-dashed, rounded-lg, p-8, text-center
- File list below: space-y-2, each file as flex justify-between, p-3, rounded, border
- Progress indicators for uploads: h-2 rounded-full progress bars
- Delete/manage buttons per file

**Knowledgebase Selector**:
- Dropdown or tab interface to switch between "Internal Data" and "Client Data"
- Clear visual indicator of active knowledgebase
- Permission lock icon for client users when viewing restricted areas

---

## Responsive Behavior

**Breakpoints**:
- Mobile: Base styles, single column layouts
- Tablet (md:): 768px - Two-column where appropriate, expanded spacing
- Desktop (lg:): 1024px - Full multi-column, sidebars visible
- Wide (xl:): 1280px - Maximum content width constraints active

**Mobile Adaptations**:
- Hamburger menu for navigation (md:hidden)
- Stack chat list and active conversation, toggle between views
- Audit table becomes scrollable cards
- Metric dashboard: Single column on mobile
- Bottom sheet for filters and options instead of sidebars

---

## Accessibility Standards

- All interactive elements: min-h-10 (40px touch target)
- Focus states: 2px outline with offset on all interactive elements
- Form labels: Proper label elements with for attributes
- ARIA labels on icon-only buttons
- Keyboard navigation support for chat history, tables
- Screen reader announcements for new messages
- High contrast ratios maintained throughout (checked post-color assignment)
- Skip links for keyboard users

---

## Animations

**Minimal, Purposeful Motion**:
- Message appearance: Subtle fade-in (150ms duration)
- Sidebar toggle: Smooth width transition (200ms)
- Modal/overlay entry: Fade + slight scale (200ms)
- Loading states: Subtle pulse or skeleton screens
- No scroll-triggered animations, no decorative motion

---

## Images

**No Hero Images**: This is an application, not a marketing site. 

**User-Generated Content**:
- User avatars: Circular, w-10 h-10 (chat), w-12 h-12 (profile)
- Company logo: h-8 in top navigation
- Empty state illustrations: When no conversations exist, use simple SVG illustrations (max-w-sm mx-auto)

**Icon Usage**:
- Use Heroicons (via CDN) throughout for consistency
- Icon sizes: w-5 h-5 (inline), w-6 h-6 (buttons), w-8 h-8 (featured areas)
- Message status icons (sent, delivered, error states)
- Role indicators, navigation icons, action buttons

---

## Security Visual Indicators

- Lock icons next to sensitive data fields
- Visual distinction for client data vs internal data sections
- Audit log immutability communicated through read-only styling
- Session timeout warnings: Toast notification style, top-right, p-4, rounded-lg, border
- Data segregation boundaries: Subtle visual separators, section headers with role context

This design system creates a professional, trustworthy fintech application that clearly differentiates user roles while maintaining a cohesive, efficient user experience optimized for data interaction and secure communication.