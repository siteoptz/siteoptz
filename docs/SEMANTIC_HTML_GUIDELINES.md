# Semantic HTML Guidelines for SiteOptz

## Overview
This document provides comprehensive guidelines for implementing semantic HTML across the SiteOptz website to improve accessibility, SEO, and maintainability.

## Core Principles

### 1. Use HTML5 Semantic Elements
Replace generic `<div>` elements with semantic HTML5 elements wherever appropriate:

- `<header>` - Site header and page headers
- `<nav>` - Navigation menus
- `<main>` - Main content area (one per page)
- `<article>` - Self-contained content (blog posts, tool cards)
- `<section>` - Thematic grouping of content
- `<aside>` - Sidebar content, related information
- `<footer>` - Site footer and content footers
- `<figure>` & `<figcaption>` - Images with captions
- `<time>` - Dates and times
- `<address>` - Contact information

### 2. Proper Heading Hierarchy
Maintain a logical heading structure:

```html
<h1>Page Title (one per page)</h1>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
      <h4>Sub-subsection</h4>
```

**Rules:**
- Only one `<h1>` per page
- Never skip heading levels
- Use headings for structure, not styling
- Screen readers use headings for navigation

### 3. ARIA Landmarks and Labels
Enhance semantic HTML with ARIA when needed:

```jsx
<nav aria-label="Primary navigation">
<nav aria-label="Breadcrumb">
<section aria-labelledby="section-title">
<button aria-expanded="false" aria-controls="menu-id">
```

### 4. Interactive Elements
Use appropriate elements for interactions:

- `<button>` - Actions that don't navigate
- `<a>` - Navigation links
- `<form>` - User input collection
- `<label>` - Form field labels
- `<fieldset>` & `<legend>` - Group related form fields

## Component-Specific Guidelines

### Layout Components

#### SemanticLayout.tsx
```jsx
<>
  <a href="#main-content" className="sr-only focus:not-sr-only">
    Skip to main content
  </a>
  <Header />
  <main id="main-content" role="main" tabIndex={-1}>
    {children}
  </main>
  <Footer />
</>
```

#### Header Component
```jsx
<header role="banner" aria-label="Main navigation">
  <nav role="navigation" aria-label="Primary navigation">
    <ul role="menubar">
      <li role="none">
        <a role="menuitem" aria-current="page">
      </li>
    </ul>
  </nav>
</header>
```

#### Footer Component
```jsx
<footer role="contentinfo" aria-label="Site footer">
  <nav aria-label="Footer navigation">
    <section>
      <h2>Section Title</h2>
      <ul>...</ul>
    </section>
  </nav>
</footer>
```

### Page Components

#### Tool Cards
```jsx
<article aria-label="Tool card">
  <header>
    <h3>{tool.name}</h3>
    <figure>
      <img alt="Tool logo" />
    </figure>
  </header>
  <section aria-labelledby="features-heading">
    <h4 id="features-heading" className="sr-only">Features</h4>
    <ul>...</ul>
  </section>
</article>
```

#### Comparison Tables
```jsx
<table role="table" aria-label="Tool comparison">
  <caption>Comparison of tools</caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Tool A</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Price</th>
      <td>$99</td>
    </tr>
  </tbody>
</table>
```

#### Forms
```jsx
<form aria-label="Contact form">
  <fieldset>
    <legend>Personal Information</legend>
    <label for="name">
      Name <span aria-label="required">*</span>
    </label>
    <input id="name" required aria-required="true" />
  </fieldset>
</form>
```

## Accessibility Best Practices

### 1. Skip Links
Always include skip navigation links:
```jsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 2. Focus Management
- Ensure all interactive elements are keyboard accessible
- Provide visible focus indicators
- Manage focus when opening/closing modals

### 3. Screen Reader Support
- Use `sr-only` class for screen reader only content
- Provide alternative text for images
- Use `aria-label` for icon buttons
- Include `aria-live` regions for dynamic content

### 4. Color and Contrast
- Ensure WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information
- Test with color blindness simulators

## SEO Benefits of Semantic HTML

1. **Better Crawlability**: Search engines better understand content structure
2. **Rich Snippets**: Proper markup enables enhanced search results
3. **Page Structure**: Clear hierarchy helps search engines identify important content
4. **Mobile Optimization**: Semantic HTML adapts better to different devices

## Implementation Checklist

### For Every Page:
- [ ] One `<h1>` element
- [ ] Logical heading hierarchy (no skipped levels)
- [ ] `<main>` element for primary content
- [ ] Proper `<nav>` elements for navigation
- [ ] `<footer>` for footer content
- [ ] Skip navigation link
- [ ] Proper ARIA labels where needed
- [ ] Alt text for all informative images
- [ ] Semantic form elements with labels
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified

### For Component Updates:
1. Replace `<div>` with semantic elements where appropriate
2. Add ARIA labels for clarity
3. Ensure proper heading hierarchy
4. Test with keyboard navigation
5. Verify with screen reader
6. Check color contrast
7. Validate HTML structure

## Testing Tools

### Automated Testing:
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: WebAIM's accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools
- **Pa11y**: Command line accessibility testing

### Manual Testing:
- **Keyboard Navigation**: Tab through entire page
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)
- **Browser Tools**: Chrome/Firefox accessibility inspector

## Migration Strategy

### Phase 1: Core Components (Completed)
- ✅ Create SemanticLayout component
- ✅ Create SemanticHeader component
- ✅ Create SemanticFooter component
- ✅ Create semantic tool cards
- ✅ Create semantic comparison tables

### Phase 2: Page Templates
- Update all page templates to use semantic components
- Ensure proper heading hierarchy
- Add breadcrumb navigation

### Phase 3: Forms and Interactions
- Update all forms with proper labels and fieldsets
- Ensure all buttons have appropriate ARIA labels
- Add focus management for modals and dropdowns

### Phase 4: Testing and Refinement
- Run automated accessibility tests
- Conduct manual keyboard navigation testing
- Test with screen readers
- Fix identified issues

## Code Examples

### Before (Non-Semantic):
```jsx
<div className="header">
  <div className="nav">
    <div className="nav-item">Home</div>
  </div>
</div>
<div className="content">
  <div className="card">
    <div className="title">Tool Name</div>
  </div>
</div>
```

### After (Semantic):
```jsx
<header role="banner">
  <nav aria-label="Primary navigation">
    <ul role="menubar">
      <li role="none">
        <a href="/" role="menuitem">Home</a>
      </li>
    </ul>
  </nav>
</header>
<main>
  <article className="card">
    <h2>Tool Name</h2>
  </article>
</main>
```

## Resources

- [MDN Web Docs - HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [W3C - ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM - Semantic Structure](https://webaim.org/resources/htmlcheatsheet/)
- [A11y Project](https://www.a11yproject.com/)

## Conclusion

Implementing semantic HTML is crucial for:
- **Accessibility**: Making content available to all users
- **SEO**: Improving search engine understanding
- **Maintainability**: Creating cleaner, more understandable code
- **Future-proofing**: Ensuring compatibility with future technologies

By following these guidelines, we ensure SiteOptz provides an excellent user experience for all visitors while maintaining strong SEO performance.