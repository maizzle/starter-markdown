---
layout: secondary
title: "Edition #2: Using a custom layout"
---

# {{ page.title }} {.m-0 .mb-10}

This edition uses a custom layout: the header shows a different logo image, which is now also left-aligned instead of centered.

This is done via the `layout` property in the front matter:

```yaml
---
layout: secondary
---
```

The value of `layout` must match one of the file names inside the `src/layouts` directory.

Cheers,\
The Maizzle Team
