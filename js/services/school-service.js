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

export async function updateSchool(schoolId, patch) {
  const res = await fetch(`${BASE}/schools/${schoolId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  });

  if (!res.ok) {
    throw new Error('Failed to update school profile');
  }

  return res.json();
}

export async function createSchool(school) {
  const res = await fetch(`${BASE}/schools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...school,
      initials: school.initials || (school.name || '').slice(0, 3).toUpperCase(),
      supportFeatures: school.supportFeatures || [],
      contactPhone: school.contactPhone || '',
      contactEmail: school.contactEmail || '',
      address: school.address || ''
    })
  });

  if (!res.ok) {
    throw new Error('Failed to create school profile');
  }

  return res.json();
}

export async function getOwnSchool(user) {
  const res = await fetch(`${BASE}/schools`);
  if (!res.ok) return null;

  const schools = await res.json();
  let school = schools.find((s) => s.ownerUserId === user.id);

  if (!school) {
    school = schools.find((s) =>
      s.name?.trim().toLowerCase() === user.name?.trim().toLowerCase(),
    );
    if (school) {
      school = await updateSchool(school.id, { ownerUserId: user.id });
    }
  }

  if (!school) {
    school = await createSchool({
      name: user.name,
      district: '',
      location: '',
      description: '',
      type: 'public',
      ownerUserId: user.id,
      supportFeatures: [],
      contactPhone: '',
      contactEmail: '',
      address: ''
    });
  }

  return school;
}
