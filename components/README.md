# Component Architecture

This directory contains all reusable React components organized by their purpose and scope.

## Directory Structure

```
components/
├── shared/          # Shared utility components used across features
├── features/        # Feature-specific components
├── layouts/         # Layout components (header, footer)
└── ui/              # Base UI composition components
```

## Component Organization

### 📦 `/shared` - Shared Utility Components

Reusable utility components that can be used across multiple features:

- **ErrorBoundary**: Error boundary wrapper for graceful error handling
- **PillButton**: Stylized pill-shaped button component
- **BookCallButton**: Call-to-action button for booking calls

**When to use**: Components that are generic and used by multiple features

### 🎯 `/features` - Feature-Specific Components

Components that are specific to particular features or domains:

- **auth/**: Authentication-related components
  - AuthCard, SignInForm, SignUpForm
  - Input, Checkbox, AuthButton (aliased)
  - ErrorAlert
- **home/**: Home page components
  - HomeSection, HomeData, Social, ScrollDown
- **PortfolioModal**: Modal for portfolio project details
- **BlogHeader**: Blog post header component
- **SkillCard**, **SkillCategory**, **SkillItem**: Skills display components

**When to use**: Components tied to specific features or business logic

### 🏗️ `/layouts` - Layout Components

Structural components that define the application layout:

- **header/**: Navigation header
  - Header, Logo, ThemeToggle
- **footer/**: Footer section
  - Footer

**When to use**: Components that define the page structure and navigation

### 🎨 `/ui` - Base UI Components

Low-level composition components following the compound component pattern:

- **Card**: Flexible card component with subcomponents
  - Card.Header, Card.Content, Card.Footer
- **Button**: Reusable button with variants
  - Button.Primary, Button.Secondary, Button.Ghost
- **Container**: Layout container with responsive padding

**When to use**: Building block components for consistent UI patterns

## Naming Conventions

### Files

- **Components**: PascalCase (e.g., `HomeSection.tsx`, `SkillCard.tsx`)
- **CSS Modules**: camelCase with `.module.css` (e.g., `skillCard.module.css`)
- **Regular CSS**: lowercase with hyphens (e.g., `home.css`, `header.css`)
- **Barrel exports**: `index.ts` in each directory

### Components

- **Component names**: PascalCase matching filename
- **Props interfaces**: `ComponentNameProps`
- **Compound components**: Use dot notation (e.g., `Card.Header`)

## Import Patterns

### Using Barrel Exports (Recommended)

```tsx
// Import from organized subdirectories
import { ErrorBoundary, PillButton } from '@/components/shared';
import { PortfolioModal, SkillCard } from '@/components/features';
import { Header, Footer } from '@/components/layouts';
import { Card, Button, Container } from '@/components/ui';
```

### Direct Imports

```tsx
// When you need a specific component
import { HomeSection } from '@/components/features/home';
import { AuthCard, SignInForm } from '@/components/features/auth';
```

## Component Patterns

### 1. Server vs Client Components

- **Server Components** (default): For static content and data fetching
- **Client Components**: Add `'use client'` for interactivity, hooks, browser APIs

```tsx
// Server Component (default)
export default function StaticSection() {
  return <div>Static content</div>;
}

// Client Component
('use client');
import { useState } from 'react';

export default function InteractiveSection() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 2. Compound Components

UI components use the compound component pattern for flexibility:

```tsx
<Card>
  <Card.Header>
    <h2>Title</h2>
  </Card.Header>
  <Card.Content>
    <p>Content goes here</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

### 3. CSS Modules

Prefer CSS Modules for component-specific styles:

```tsx
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>Content</div>;
}
```

### 4. TypeScript Props

Always define prop interfaces:

```tsx
interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export default function Component({
  title,
  description,
  onAction,
}: ComponentProps) {
  // ...
}
```

## Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Configuration**: Build complex UIs from simple components
3. **Type Safety**: Always define TypeScript interfaces for props
4. **CSS Organization**: Keep styles close to components (CSS Modules or local CSS)
5. **Barrel Exports**: Use index.ts for clean imports
6. **Documentation**: Add JSDoc comments for complex components
7. **Error Boundaries**: Wrap features in ErrorBoundary for graceful failures
8. **Performance**: Use dynamic imports for large components (see portfolio modal)

## Adding New Components

### 1. Determine the Right Location

- **Shared**: Generic, reusable across features → `/shared`
- **Feature-specific**: Tied to business logic → `/features`
- **Layout**: Structural elements → `/layouts`
- **UI primitive**: Base composition pattern → `/ui`

### 2. Create the Component

```bash
# Example: Adding a new shared component
components/shared/
  └── NewComponent.tsx
  └── newComponent.css (if needed)
```

### 3. Add to Barrel Export

Update the appropriate `index.ts`:

```tsx
// components/shared/index.ts
export { default as NewComponent } from './NewComponent';
```

### 4. Import and Use

```tsx
import { NewComponent } from '@/components/shared';
```

## Migration Notes

This architecture was established as part of a comprehensive refactoring:

- Components moved from flat structure to organized directories
- Auth components consolidated under features/auth
- Home components consolidated under features/home
- Layout components (header, footer) moved to layouts
- New UI composition components created (Card, Button, Container)
- All imports updated to use new paths
- Barrel exports created for clean imports
