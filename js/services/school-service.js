const BASE = "http://localhost:3001";

export async function getSchools() {
  const res = await fetch(`${BASE}/schools`);
  if (!res.ok) return [];
  return res.json();
}

export async function getSchoolById(id) {
  const res = await fetch(`${BASE}/schools/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// district filtrado no servidor; features (array) filtrado client-side com AND - json-server não suporta arrays
export async function searchSchools({ district = '', features = [] } = {}) {
  // Fetch all schools and perform client-side filtering so district
  // matching can be done case-insensitively and without relying on server behavior.
  const res = await fetch(`${BASE}/schools`);
  if (!res.ok) return [];
  const data = await res.json();

  const districtQuery = (district || '').trim().toLowerCase();
  let filtered = data;

  if (districtQuery) {
    filtered = filtered.filter((s) =>
      (s.district || '').toLowerCase().includes(districtQuery),
    );
  }

  if (!features.length) return filtered;

  return filtered.filter((s) =>
    features.every((f) => s.supportFeatures.includes(f)),
  );
}
