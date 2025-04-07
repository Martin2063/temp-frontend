import {
  themeFromSourceColor,
  type CustomColor,
  argbFromHex,
  applyTheme,
  hexFromArgb,
  type Theme,
} from "@material/material-color-utilities";
export function applySurfaceStyles(
  theme: Theme,
  { dark }: { dark: boolean }
): void {
  if (dark) {
    const elevationProps = {
      "--md-sys-color-surface": dark
        ? theme.palettes.neutral.tone(13)
        : theme.palettes.neutral.tone(10),
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(6),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(24),
      "--md-sys-color-surface-container-lowest": theme.palettes.neutral.tone(4),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(10),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(12),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(17),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(22),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  } else {
    const elevationProps = {
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(87),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(98),
      "--md-sys-color-surface-container-lowest":
        theme.palettes.neutral.tone(100),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(96),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(94),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(92),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(90),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  }
}

export function applyColorThemeFromPrimaryColor(
  primaryColor: string,
  dark: boolean,
  colors?: CustomColor[]
): boolean {
  const theme = themeFromSourceColor(argbFromHex(primaryColor), colors);
  applyTheme(theme, { target: document.body, dark });
  applySurfaceStyles(theme, { dark });
  return true;
}

type ColorToken =
  | "primary"
  | "on-primary"
  | "primary-container"
  | "on-primary-container"
  | "primary-fixed"
  | "on-primary-fixed"
  | "primary-fixed-dim"
  | "on-primary-fixed-variant"
  | "secondary"
  | "on-secondary"
  | "secondary-container"
  | "on-secondary-container"
  | "secondary-fixed"
  | "on-secondary-fixed"
  | "secondary-fixed-dim"
  | "on-secondary-fixed-variant"
  | "tertiary"
  | "on-tertiary"
  | "tertiary-container"
  | "on-tertiary-container"
  | "tertiary-fixed"
  | "on-tertiary-fixed"
  | "tertiary-fixed-dim"
  | "on-tertiary-fixed-variant"
  | "error"
  | "on-error"
  | "error-container"
  | "on-error-container"
  | "outline"
  | "background"
  | "on-background"
  | "surface"
  | "on-surface"
  | "surface-variant"
  | "on-surface-variant"
  | "inverse-surface"
  | "inverse-on-surface"
  | "inverse-primary"
  | "shadow"
  | "surface-tint"
  | "outline-variant"
  | "scrim"
  | "surface-container-highest"
  | "surface-container-high"
  | "surface-container"
  | "surface-container-low"
  | "surface-container-lowest"
  | "surface-bright"
  | "surface-dim"
  | "surface-container-high-dark";
export function getMaterialColor(token: ColorToken) {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--md-sys-color-${token}`
  );
  return color;
}

export function getActualMaterialColors(token: ColorToken): string {
  const color = getComputedStyle(document.body).getPropertyValue(
    `--md-sys-color-${token}`
  );
  return color;
}
