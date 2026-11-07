// Shared shape validation for public Markdown profiles and private external supplements.
const plainObject = value => value && typeof value === 'object' && !Array.isArray(value);
const strings = (value, label) => {
  if (!Array.isArray(value) || value.length > 100 || value.some(item => typeof item !== 'string' || item.length > 2000)) throw new Error(`Private ${label} must be an array of bounded strings`);
};
export function validatePrivateProfile(profile, id) {
  const fields = ['version', 'userId', 'voice', 'postingHabits', 'relationships', 'knowledgeScope', 'facts', 'boundaries', 'basics', 'notes', 'activityWeight', 'tags', 'currentStatus', 'topics', 'voiceExamples'];
  if (!plainObject(profile) || Object.keys(profile).some(key => !fields.includes(key)) || profile.version !== 1 || profile.userId !== id) throw new Error(`Invalid private profile for ${id}`);
  for (const key of ['voice', 'postingHabits', 'relationships', 'knowledgeScope', 'boundaries']) strings(profile[key], key);
  if (!Array.isArray(profile.facts) || profile.facts.length > 200) throw new Error('Private facts must be an array');
  for (const fact of profile.facts) {
    if (!plainObject(fact) || Object.keys(fact).some(key => !['text', 'status', 'visibility', 'source'].includes(key)) || !['canon', 'inference', 'pending'].includes(fact.status) || !['private', 'public'].includes(fact.visibility) || typeof fact.text !== 'string' || fact.text.length > 4000 || typeof fact.source !== 'string' || fact.source.length > 2000) throw new Error('Private fact needs separate canon status, visibility and source');
  }
  if (profile.basics !== undefined) {
    if (!plainObject(profile.basics) || Object.keys(profile.basics).some(key => !['age', 'occupation', 'location', 'interests', 'personality', 'gender', 'pronouns', 'timezone', 'activeHours'].includes(key))) throw new Error('Invalid private basics');
    for (const key of ['age', 'occupation', 'location']) if (typeof profile.basics[key] !== 'string' || profile.basics[key].length > 240) throw new Error(`Invalid private basics.${key}`);
    for (const key of ['interests', 'personality']) strings(profile.basics[key], key);
    for (const key of ['gender', 'pronouns', 'timezone', 'activeHours']) if (profile.basics[key] !== undefined && (typeof profile.basics[key] !== 'string' || profile.basics[key].length > 240)) throw new Error(`Invalid private basics.${key}`);
  }
  for (const key of ['tags', 'topics', 'voiceExamples']) if (profile[key] !== undefined) strings(profile[key], key);
  if (profile.currentStatus !== undefined && (typeof profile.currentStatus !== 'string' || profile.currentStatus.length > 4000)) throw new Error('Private current status must be bounded text');
  if (profile.notes !== undefined && (typeof profile.notes !== 'string' || profile.notes.length > 20000)) throw new Error('Private notes must be bounded text');
  if (profile.activityWeight !== undefined && (typeof profile.activityWeight !== 'number' || !Number.isFinite(profile.activityWeight) || profile.activityWeight < 0 || profile.activityWeight > 10)) throw new Error('Activity weight must be between 0 and 10');
  return profile;
}

export function emptyProfile(userId) {
  return { version: 1, userId, basics: { age: '', occupation: '', location: '', interests: [], personality: [] }, voice: [], postingHabits: [], relationships: [], knowledgeScope: [], facts: [], boundaries: [], notes: '', activityWeight: 1, tags: [], currentStatus: '', topics: [], voiceExamples: [] };
}

