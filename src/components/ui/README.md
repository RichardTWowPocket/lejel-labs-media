# Aceternity UI Components

This directory is for Aceternity UI components.

## How to Add Components

1. Visit [Aceternity UI](https://ui.aceternity.com/)
2. Browse the components library
3. Click on any component you want to use
4. Copy the component code
5. Create a new file in this `src/components/ui/` directory
6. Paste the component code

## Popular Components to Try

- **Hero Section**: Spotlight, Aurora Background, Hero Parallax
- **Cards**: 3D Card Effect, Hover Effect, Card Stack
- **Animations**: Text Generate Effect, Type Writer Effect, Moving Border
- **Backgrounds**: Background Beams, Background Gradient, Meteors
- **Navigation**: Floating Navbar, Sidebar
- **Forms**: Input with Label, Textarea
- **And many more!**

## Example Usage

After copying a component (e.g., `button.tsx`), you can import it in your pages:

```tsx
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <Button>Click me</Button>
  );
}
```

## Utilities

The `cn()` utility function is available at `@/lib/utils` for merging Tailwind classes:

```tsx
import { cn } from '@/lib/utils';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

