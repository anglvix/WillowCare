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
export async function searchSchools({ district, features = [] } = {}) {
  const params = new URLSearchParams();
  if (district) params.set("district", district);
  const res = await fetch(`${BASE}/schools?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  if (!features.length) return data;
  return data.filter((s) =>
    features.every((f) => s.supportFeatures.includes(f)),
  );
}
