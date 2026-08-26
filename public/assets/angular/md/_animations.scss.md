# _animations.scss

Shared keyframes, transitions, and motion tokens.

```scss
$transition-fast: 120ms ease;

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Respect `prefers-reduced-motion` when a motion effect is not essential to understanding the interface.
