# 🎨 Color Design Guidelines based on Material Design (v5+)

## 1. Purpose

This document outlines the **principles and standards for using colors** in the project, based on [Material Design 3 (v5+)](https://m3.material.io/), ensuring:

- Consistent visual experience.
- Good compatibility with **Light** and **Dark** modes.
- Compliance with **accessibility standards**, particularly contrast for text and background colors.

---

## 2. Color System Architecture

Material Design v5 proposes a color system that includes:

| Name                                 | Meaning                                                               |
| ------------------------------------ | --------------------------------------------------------------------- |
| **Primary**                          | The main brand color, highlighting key content.                       |
| **Secondary**                        | A supporting color for additional elements.                           |
| **Tertiary** *(optional)*            | An additional color for more creative variations.                     |
| **Error / Success / Warning / Info** | Colors indicating status feedback.                                    |
| **Background / Surface**             | Overall background color / content surface color.                     |
| **Text (on-color)**                  | Text color automatically calculated based on the background contrast. |

---

## 3. Color Design Rules

### ✅ Color Pairing Principles

| Rule                                  | Explanation                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Separate Light and Dark Modes**     | Each mode has its own color palette to ensure good contrast.                                            |
| **Use `contrastText`**                | For each primary color, define a complementary text color (`white` or `black`) to ensure readability.   |
| **Adhere to Minimum Contrast Ratios** | According to [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/):<br/>Normal text: 4.5:1<br/>Large text: 3.0:1 |

### ⚠️ Avoid

- Using undefined colors directly in the theme.
- Mixing light and dark colors in the wrong modes.
- Using overly pale colors that do not meet contrast requirements for text.

---

## 4. Color Declaration Structure in Theme

```ts
// file: color.ts
export const color = {
  black: '#000000',
  white: '#ffffff',
  light: {
    primary: {
    main: '#1E88E5', // Blue 600
    contrastText: '#ffffff',
    },
    secondary: {
    main: '#1565C0', // Blue 800
    contrastText: '#ffffff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7F7F7',
    },
    text: {
    primary: '#0B3D91', // Navy Blue
    secondary: '#5C86C7', // Light Blue
      },
      // ...
  },
  dark: {
    primary: {
      main: '#90CAF9', // Blue 200
      contrastText: '#0B3D91',
      },
      secondary: {
      main: '#64B5F6', // Blue 300
      contrastText: '#0B3D91',
      },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#90CAF9', // Light Blue
      secondary: '#64B5F6', // Sky Blue
    },
    // ...
  },
};
```

## 5. Shadow – Proper Shadow for Each Mode

Shadows are defined separately for light and dark modes to ensure good contrast and visual hierarchy:

```ts
shadow: [
  'none', 
  '0px 1px 2px 0px #0000001a',  // black 10%
  '0px 2px 4px 0px #00000033',  // black 20%
  '0px 3px 6px 0px #0000004d',  // black 30%
  '0px 4px 8px 0px #00000066',  // black 40%
  '0px 6px 12px 0px #00000080',  // black 50%
  '0px 8px 16px 0px #00000099',  // black 60%
  '0px 12px 24px 0px #000000b3',  // black 70%
  '0px 16px 32px 0px #000000cc',  // black 80%
  '0px 20px 40px 0px #000000e6',  // black 90%
  '0px 24px 48px 0px #ffffff1a',  // subtle white overlay (10%)
]
```

## 6. Implementing in `theme.ts`

To implement the colors and shadows based on the Material Design system, you can configure your theme as follows:

```ts
import { createTheme } from '@mui/material/styles';
import { color } from './color';

// Function to create a custom theme based on mode (light or dark)
const createCustomTheme = (mode: 'light' | 'dark') => ({
  palette: {
    mode,  // Automatically sets the mode to light or dark
    ...(mode === 'light' ? color.light : color.dark),  // Use the respective color configuration
  },
  typography: { /* Add your typography configuration here */ },
});

// Export the themes for light and dark modes
export const lightTheme = createTheme(createCustomTheme('light'));
export const darkTheme = createTheme(createCustomTheme('dark'));
```

## 7. Summary

Using the correct Material Design color system helps ensure:

- **Visual consistency** and aesthetic alignment across the application.
- **Optimized user experience** for both light and dark modes.
- **Easy maintenance and scalability** of the design system over time.

> **Tip**: You can use the [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) to generate a color palette that fits your brand's identity and style.

---
