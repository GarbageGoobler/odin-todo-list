# Catppuccin Mocha Style Guide

## Introduction

**Catppuccin** is a community-driven pastel theme that aims to be the middle ground between low and high-contrast themes. It consists of 4 soothing warm flavors with 26 eye-candy colors each, perfect for coding, designing, and much more.

**Mocha** is "The Original" — Catppuccin's darkest variant offering a cozy feeling with color-rich accents. It's perfect for developers who prefer dark themes while maintaining excellent readability and visual appeal.

## Design Philosophy

1. **Colorful is better than colorless**: The colorfulness of something contributes to the distinction amongst the parts of that something, making it marginally easier to understand how things are structured.

2. **There should be balance**: Not too dull, not too bright. Suitability under various light conditions is a must.

3. **Harmony is superior to dissonance**: Vivacious colors must complement each other.

---

## Complete Color Palette

### Background Colors

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Base** | `#1e1e2e` | rgb(30, 30, 46) | hsl(240, 21%, 15%) | Main background pane |
| **Mantle** | `#181825` | rgb(24, 24, 37) | hsl(240, 21%, 12%) | Secondary panes, elevated surfaces |
| **Crust** | `#11111b` | rgb(17, 17, 27) | hsl(240, 23%, 9%) | Darkest backgrounds, borders |

### Surface Colors

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Surface 0** | `#313244` | rgb(49, 50, 68) | hsl(237, 16%, 23%) | Raised elements (lightest) |
| **Surface 1** | `#45475a` | rgb(69, 71, 90) | hsl(234, 13%, 31%) | Raised elements (medium) |
| **Surface 2** | `#585b70` | rgb(88, 91, 112) | hsl(233, 12%, 39%) | Raised elements (darkest) |

### Overlay Colors

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Overlay 0** | `#6c7086` | rgb(108, 112, 134) | hsl(231, 11%, 47%) | Overlays on backgrounds |
| **Overlay 1** | `#7f849c` | rgb(127, 132, 156) | hsl(230, 13%, 55%) | Mid-range overlays |
| **Overlay 2** | `#9399b2` | rgb(147, 153, 178) | hsl(228, 17%, 64%) | Lightest overlays |

### Text Colors

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Text** | `#cdd6f4` | rgb(205, 214, 244) | hsl(226, 64%, 88%) | Body copy, main headlines |
| **Subtext 0** | `#a6adc8` | rgb(166, 173, 200) | hsl(228, 24%, 72%) | Sub-headlines, labels |
| **Subtext 1** | `#bac2de` | rgb(186, 194, 222) | hsl(227, 35%, 80%) | Sub-headlines, labels |

---

## Accent Colors

### Primary Accents

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Rosewater** | `#f5e0dc` | rgb(245, 224, 220) | hsl(10, 56%, 91%) | Cursor, gentle highlights |
| **Flamingo** | `#f2cdcd` | rgb(242, 205, 205) | hsl(0, 59%, 88%) | Extended accent |
| **Pink** | `#f5c2e7` | rgb(245, 194, 231) | hsl(316, 72%, 86%) | Keywords, links |
| **Mauve** | `#cba6f7` | rgb(203, 166, 247) | hsl(267, 84%, 81%) | Keywords, classes |

### Warm Accents

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Red** | `#f38ba8` | rgb(243, 139, 168) | hsl(343, 81%, 75%) | Errors, deletion |
| **Maroon** | `#eba0ac` | rgb(235, 160, 172) | hsl(350, 65%, 77%) | Parameters, warnings |
| **Peach** | `#fab387` | rgb(250, 179, 135) | hsl(23, 92%, 75%) | Constants, numbers |
| **Yellow** | `#f9e2af` | rgb(249, 226, 175) | hsl(41, 86%, 83%) | Warnings, classes |

### Cool Accents

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|-----------|-----|-----|-------|
| **Green** | `#a6e3a1` | rgb(166, 227, 161) | hsl(115, 54%, 76%) | Strings, success |
| **Teal** | `#94e2d5` | rgb(148, 226, 213) | hsl(170, 57%, 73%) | Enum variants, information |
| **Sky** | `##89dceb` | rgb(137, 220, 235) | hsl(189, 71%, 73%) | Operators, active links |
| **Sapphire** | `#74c7ec` | rgb(116, 199, 236) | hsl(199, 76%, 69%) | Selection highlights |
| **Blue** | `#89b4fa` | rgb(137, 180, 250) | hsl(217, 92%, 76%) | Functions, links |
| **Lavender** | `#b4befe` | rgb(180, 190, 254) | hsl(232, 97%, 85%) | Active elements, hover states |

---

## Styling Guidelines

### Background Usage

- **Background Pane**: Use `Base` (#1e1e2e) for the main background
- **Secondary Panes**: Use `Mantle` (#181825) or `Crust` (#11111b) for secondary areas
- **Surface Elements**: Use `Surface 0/1/2` for raised elements like cards, buttons
- **Overlays**: Use `Overlay 0/1/2` for overlays on top of backgrounds

### Typography

| Element | Recommended Color |
|---------|------------------|
| Body Copy | Text (#cdd6f4) |
| Main Headlines | Text (#cdd6f4) |
| Sub-Headlines, Labels | Subtext 0 (#a6adc8), Subtext 1 (#bac2de) |
| Subtle Text | Overlay 1 (#7f849c) |
| Text on Accent Colors | Base (#1e1e2e) |
| Links, URLs | Blue (#89b4fa) |
| Success Messages | Green (#a6e3a1) |
| Warnings | Yellow (#f9e2af) |
| Errors | Red (#f38ba8) |
| Tags, Pills | Blue (#89b4fa) |

### UI Elements

| Element | Recommended Color |
|---------|------------------|
| Cursor | Rosewater (#f5e0dc) |
| Active Border/Focus | Lavender (#b4befe) |
| Inactive Border | Overlay 0 (#6c7086) |
| Selection Background | Overlay 2 with 20-30% opacity |
| Line Numbers | Overlay 1 (#7f849c) |
| Active Line Number | Lavender (#b4befe) |

### Syntax Highlighting (for code editors)

| Syntax Element | Recommended Color |
|---------------|------------------|
| Keywords | Mauve (#cba6f7) |
| Strings | Green (#a6e3a1) |
| Symbols, Atoms | Red (#f38ba8) |
| Escape Sequences, Regex | Pink (#f5c2e7) |
| Comments | Overlay 2 (#9399b2) |
| Constants, Numbers | Peach (#fab387) |
| Operators | Sky (#89dceb) |
| Braces, Delimiters | Overlay 2 (#9399b2) |
| Methods, Functions | Blue (#89b4fa) |
| Parameters | Maroon (#eba0ac) |
| Builtins | Red (#f38ba8) |
| Classes, Interfaces, Types | Yellow (#f9e2af) |
| Enum Variants | Teal (#94e2d5) |
| Properties | Blue (#89b4fa) |
| Attributes | Yellow (#f9e2af) |
| Macros | Rosewater (#f5e0dc) |

---

## Best Practices

### Color Usage

1. **Always prioritize legibility over strict adherence to guidelines** - text colors are guidelines and may require deviations for specific backgrounds

2. **Use Base for backgrounds** - This is your main canvas and provides the best contrast for most elements

3. **Reserve accent colors for emphasis** - Don't overuse accent colors; they're meant to draw attention to specific elements

4. **Maintain contrast ratios** - Ensure sufficient contrast between text and background colors for accessibility

5. **Create visual hierarchy** - Use the gradient from Base → Surface → Overlay to create depth

### Accessibility Notes

- **Base (#1e1e2e)** + **Text (#cdd6f4)** = WCAG AAA compliant (17.6:1 contrast ratio)
- **Base (#1e1e2e)** + **Green (#a6e3a1)** = Excellent contrast
- **Base (#1e1e2e)** + **Yellow (#f9e2af)** = Good contrast, but use sparingly
- When placing text on colored backgrounds, ensure the contrast ratio is at least 4.5:1 (WCAG AA)
- Avoid using light colors like Rosewater, Yellow, or Lavender as background colors with light text

### Common Patterns

1. **Buttons**
   - Primary button: Background = Mauve (#cba6f7), Text = Base (#1e1e2e)
   - Secondary button: Background = Surface 0 (#313244), Text = Text (#cdd6f4)
   - Hover state: Slightly lighten or use accent color

2. **Cards/Containers**
   - Background = Surface 0 (#313244) or Surface 1 (#45475a)
   - Border = Mantle (#181825) or Overlay 0 (#6c7086)
   - Text = Text (#cdd6f4)

3. **Inputs**
   - Background = Mantle (#181825)
   - Border = Overlay 0 (#6c7086)
   - Focus border = Lavender (#b4befe)
   - Text = Text (#cdd6f4)
   - Placeholder = Subtext 0 (#a6adc8)

4. **Tables**
   - Header background = Surface 0 (#313244)
   - Row hover background = Surface 1 (#45475a)
   - Border = Mantle (#181825)

---

## Rainbow Color Sequences

### For Brackets, Tags, Headings (high contrast)

| Order | Color | Hex Code |
|-------|-------|-----------|
| 1 | Red | #f38ba8 |
| 2 | Peach | #fab387 |
| 3 | Yellow | #f9e2af |
| 4 | Green | #a6e3a1 |
| 5 | Sapphire | #74c7ec |
| 6 | Lavender | #b4befe |

---

## Quick Reference Card

```
# Backgrounds
Base:       #1e1e2e
Mantle:     #181825
Crust:      #11111b

# Surfaces
Surface0:   #313244
Surface1:   #45475a
Surface2:   #585b70

# Overlays
Overlay0:   #6c7086
Overlay1:   #7f849c
Overlay2:   #9399b2

# Text
Text:       #cdd6f4
Subtext0:   #a6adc8
Subtext1:   #bac2de

# Accents
Rosewater:  #f5e0dc
Flamingo:   #f2cdcd
Pink:       #f5c2e7
Mauve:      #cba6f7
Red:        #f38ba8
Maroon:     #eba0ac
Peach:      #fab387
Yellow:     #f9e2af
Green:      #a6e3a1
Teal:       #94e2d5
Sky:        #89dceb
Sapphire:   #74c7ec
Blue:       #89b4fa
Lavender:   #b4befe
```

---

## Resources

- **Official Website**: https://catppuccin.com
- **GitHub Repository**: https://github.com/catppuccin/catppuccin
- **Palette**: https://catppuccin.com/palette
- **Style Guide**: https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md
- **Discord Community**: https://discord.com/servers/catppuccin-907385605422448742

---

## License

Catppuccin is released under the MIT License. You are free to use it in your projects, both personal and commercial.

---

*This style guide is based on the official Catppuccin documentation and is designed to help you build beautiful, consistent interfaces using the Mocha color palette.*