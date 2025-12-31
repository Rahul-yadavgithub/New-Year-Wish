// js/storage-handler.js
class ExperienceStorage {
  constructor() {
    this.VISITED_KEY = 'newYear2025_celebration_viewed';
    this.VISIT_TIMESTAMP_KEY = 'newYear2025_visit_timestamp';
  }

  hasVisited() {
    return localStorage.getItem(this.VISITED_KEY) === 'true';
  }

  markAsVisited() {
    const timestamp = new Date().toISOString();
    localStorage.setItem(this.VISITED_KEY, 'true');
    localStorage.setItem(this.VISIT_TIMESTAMP_KEY, timestamp);
  }

  getVisitDate() {
    const timestamp = localStorage.getItem(this.VISIT_TIMESTAMP_KEY);
    return timestamp ? new Date(timestamp).toLocaleDateString() : null;
  }

  resetVisitStatus() {
    if (new URL(window.location).searchParams.get('_reset') === 'true') {
      localStorage.removeItem(this.VISITED_KEY);
      localStorage.removeItem(this.VISIT_TIMESTAMP_KEY);
      location.reload();
    }
  }
}