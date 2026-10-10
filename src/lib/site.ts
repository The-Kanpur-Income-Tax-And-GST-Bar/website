import { getCollection, getEntry } from 'astro:content';

export async function getSite() {
  const entry = await getEntry('site', 'main');
  if (!entry) throw new Error('src/data/site.yaml is missing');
  return entry.data;
}

export async function getEventsSorted() {
  const events = await getCollection('events');
  return events.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** An event counts as upcoming until the end of its day (India time). Pages are rebuilt daily. */
export function isUpcoming(date: Date) {
  const endOfDayIST = date.getTime() + 24 * 3600 * 1000 - 5.5 * 3600 * 1000;
  return endOfDayIST > Date.now();
}

export function formatPhone(phone: string) {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

/** Committee members in the order they appear in src/data/committee.yaml. */
export async function getCommittee() {
  const people = await getCollection('committee');
  return people.sort((a, b) => a.data.order - b.data.order);
}
