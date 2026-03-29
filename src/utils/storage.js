import sampleDogs from '../data/sampleDogs';

const STORAGE_KEY = 'pawlink_dogs';
const REVIEWS_KEY = 'pawlink_reviews';
const REPORTS_KEY = 'pawlink_reports';
const FAVORITES_KEY = 'pawlink_favorites';

// ===== Dogs =====
export function getDogs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDogs));
    return sampleDogs;
  }
  return JSON.parse(raw);
}

export function getDogById(id) {
  const dogs = getDogs();
  return dogs.find((d) => d.id === id) || null;
}

export function addDog(dog) {
  const dogs = getDogs();
  const newDog = {
    ...dog,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  dogs.unshift(newDog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dogs));
  return newDog;
}

// ===== Reviews =====
export function getReviews() {
  const raw = localStorage.getItem(REVIEWS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addReview(review) {
  const reviews = getReviews();
  const newReview = {
    ...review,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
}

// ===== Reports =====
export function getReports() {
  const raw = localStorage.getItem(REPORTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addReport(report) {
  const reports = getReports();
  const newReport = {
    ...report,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  reports.unshift(newReport);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return newReport;
}

// ===== Favorites =====
export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function toggleFavorite(dogId) {
  const favs = getFavorites();
  const idx = favs.indexOf(dogId);
  if (idx === -1) {
    favs.push(dogId);
  } else {
    favs.splice(idx, 1);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
}

export function isFavorite(dogId) {
  return getFavorites().includes(dogId);
}
