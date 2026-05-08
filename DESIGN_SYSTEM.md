# BeyondCareer Design System Implementation

## Overview
This document outlines the implementation of the Build Something Wonderful design system for the BeyondCareer consulting platform.

## Brand Identity
- **Product/Brand**: BeyondCareer
- **Audience**: Developers and technical teams seeking MBB strategy consulting careers
- **Product Surface**: Documentation/Educational site
- **Visual Style**: Clean, functional, implementation-oriented

## Typography

### Font Family
- **Primary**: Inter (fallback for lastik)
- **Stack**: `Inter, lastik, system-ui, sans-serif`
- **Base Size**: 17px
- **Base Weight**: 400
- **Base Line Height**: 26px

### Type Scale
```css
--font-size-xs: 16px
--font-size-sm: 17px
--font-size-md: 18px
--font-size-lg: 20px
--font-size-xl: 30px
--font-size-2xl: 32px
--font-size-3xl: 36px
--font-size-4xl: 50px
```

## Color Palette (OKLAB-based)

### Semantic Tokens
```css
--color-text-primary: oklab(0 0 0 / 0.7)
--color-surface-base: #000000
--color-text-tertiary: #171717
--color-surface-muted: #ffffff
--color-surface-raised: #197dd8
--color-surface-strong: oklab(0.999994 0.0000455678 0.0000200868 / 0.25)
```

### Extended Palette
- Indigo scale (260 hue): oklch values for consistent color relationships
- Slate scale (260 hue): Tinted neutrals, never pure gray

## Spacing Scale
```css
--space-1: 10px
--space-2: 20px
--space-3: 32px
--space-4: 40px
--space-5: 48px
--space-6: 96px
--space-7: 348.4px
```

## Radius & Shadows

### Border Radius
```css
--radius-xs: 26843500px  /* Fully rounded */
--radius-sm: 4px         /* Subtle corners */
--radius-md: 8px         /* Medium corners */
```

### Shadow
```css
--shadow-1: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
            rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, 
            rgba(0, 0, 0, 0.1) 0px 1px 2px -1px
```

## Motion Tokens
```css
--motion-duration-instant: 150ms
--motion-duration-fast: 200ms
--motion-duration-normal: 300ms
```

## Accessibility (WCAG 2.2 AA)

### Focus States
All interactive elements MUST have visible focus indicators:
```css
*:focus-visible {
  outline: 2px solid var(--color-surface-raised);
  outline-offset: 2px;
}
```

### Keyboard Navigation
- All buttons, links, and interactive elements support keyboard navigation
- Tab order follows logical reading flow
- Focus-visible states are clearly distinguishable

### Contrast Requirements
- Text on background must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Interactive elements must have sufficient contrast in all states

## Component States

All interactive components MUST define these states:

1. **Default**: Base appearance
2. **Hover**: Visual feedback on pointer hover
3. **Focus-visible**: Keyboard navigation indicator
4. **Active**: Pressed/clicked state
5. **Disabled**: Non-interactive state (opacity: 0.5)
6. **Loading**: Processing state (when applicable)
7. **Error**: Error state (when applicable)

### Button Example
```css
.btn {
  transition: all var(--motion-duration-fast) ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-surface-raised);
  outline-offset: 2px;
}
```

## Component Density

### Known Page Components
- **Links**: 13
- **Buttons**: 2
- **Navigation items**: 2

## Writing Tone
Concise, confident, implementation-focused. Avoid hyperbole and superlatives.

## Rules

### DO
- Use semantic tokens, not raw hex values
- Define all component states (default, hover, focus-visible, active, disabled, loading, error)
- Specify responsive and edge-case handling
- Document keyboard, pointer, and touch behavior
- Make accessibility acceptance criteria testable

### DON'T
- Allow low-contrast text or hidden focus indicators
- Introduce one-off spacing or typography exceptions
- Use ambiguous labels or non-descriptive actions
- Ship component guidance without explicit state rules

## Implementation Checklist

- [x] Typography scale implemented with semantic tokens
- [x] Color palette using OKLAB values
- [x] Spacing scale applied consistently
- [x] Focus-visible states on all interactive elements
- [x] Keyboard navigation support
- [x] Component state definitions (hover, active, disabled)
- [x] Motion tokens for consistent transitions
- [x] Shadow tokens applied
- [x] Accessible contrast ratios
- [x] Semantic HTML structure
- [x] ARIA labels where needed

## Testing Requirements

### Accessibility Testing
1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with NVDA/JAWS/VoiceOver
3. **Contrast**: Verify all text meets WCAG AA ratios
4. **Focus Indicators**: Ensure all focus states are visible
5. **Touch Targets**: Minimum 44x44px for mobile

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Testing
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Anti-Patterns

### Prohibited Implementations
1. **Hidden focus indicators**: All focus states must be visible
2. **Inconsistent spacing**: Use spacing scale tokens only
3. **Raw color values**: Always use semantic color tokens
4. **Missing states**: All interactive components need all 7 states
5. **Low contrast**: Text must meet WCAG AA minimum
6. **Non-semantic HTML**: Use proper heading hierarchy and landmarks

## Migration Notes

### From Previous Design
- Replaced Plus Jakarta Sans with Inter (lastik fallback)
- Updated spacing from arbitrary values to semantic scale
- Applied OKLAB color system for better perceptual uniformity
- Added comprehensive focus-visible states
- Implemented motion tokens for consistent animations
- Enhanced accessibility with ARIA labels and semantic HTML

## Quality Gates

- Every non-negotiable rule uses "must"
- Every recommendation uses "should"
- Every accessibility rule is testable in implementation
- Teams prefer system consistency over local visual exceptions
