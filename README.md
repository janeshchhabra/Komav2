# Komakase Website

A responsive website featuring a two-panel design system with light and dark variants.

## Panel System

The website uses a reusable panel system where each page follows the same layout:
- Left panel: Greyscale image with circular overlay
- Right panel: Content with either light or dark variant

### Using the Panel Template

1. Copy the template from `templates/panel.html`
2. Replace the placeholder values:
   - `[image-src]`: Path to your image
   - `[panel-variant]`: Either 'dark' or 'light'
   - `[heading]`: Your panel heading
   - `[description]`: Your panel description

### Example Usage

```html
<!-- Dark variant (as seen on homepage) -->
<div class="flex min-h-screen">
    <div class="w-1/2 relative">
        <img src="images/coffee-pour.jpg" alt="Coffee preparation" 
             class="w-full h-full object-cover grayscale">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[400px] h-[400px] border-2 border-oval rounded-full"></div>
    </div>
    <div class="w-1/2 bg-bg-dark relative p-12 flex flex-col justify-center">
        <!-- Content here -->
    </div>
</div>

<!-- Light variant -->
<div class="flex min-h-screen">
    <div class="w-1/2 relative">
        <img src="images/coffee-beans.jpg" alt="Coffee beans" 
             class="w-full h-full object-cover grayscale">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[400px] h-[400px] border-2 border-oval rounded-full"></div>
    </div>
    <div class="w-1/2 bg-bg-light relative p-12 flex flex-col justify-center">
        <!-- Content here -->
    </div>
</div>
```

## Color System

Colors are defined in `js/tailwind.config.js`:
- `bg`: Background colors (dark/light variants)
- `text`: Text colors (dark/light variants)
- `icon`: Icon colors (dark/light variants)
- `oval`: Color for the circular overlay

## Fonts

The website uses two custom fonts:
- Santa Catalina: Used for headings
- Anybody: Used for body text and UI elements

Font files are located in the `fonts` directory and are configured in `css/styles.css`.
