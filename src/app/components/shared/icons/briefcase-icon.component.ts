import { Component } from '@angular/core';

@Component({
  selector: 'app-briefcase-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12h.01"/>
      <path d="M10 16h4"/>
      <rect width="20" height="14" x="2" y="7" rx="2"/>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <path d="M2 13h4v3H2zm16 0h4v3h-4z"/>
    </svg>
  `
})
export class BriefcaseIconComponent {}
