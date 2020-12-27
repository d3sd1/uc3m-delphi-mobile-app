import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  addDarkThemeHandler(): void {
    this.addThemeHandler('dark');
  }

  addLightThemeHandler(): void {
    this.addThemeHandler('light');
  }

  private addThemeHandler(themeName): void {
    const prefersDark = window.matchMedia(`(prefers-color-scheme: ${themeName})`);
    this.setTheme(prefersDark.matches, themeName);
    prefersDark.addEventListener('change', (mediaQuery: MediaQueryListEvent) => {
      this.setTheme(mediaQuery.matches, themeName);
    });
  }

  private setTheme(shouldAdd, themeName): void {
    document.body.classList.toggle(themeName, shouldAdd);
  }
}
