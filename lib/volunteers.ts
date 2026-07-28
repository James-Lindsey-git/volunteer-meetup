import volunteersData from "@/data/volunteers.json";

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  photo: string;
  tagline: string;
  bio: string;
  activities: string[];
};

export function getAllVolunteers(): Volunteer[] {
  return volunteersData as Volunteer[];
}

export function getVolunteerById(id: string): Volunteer | undefined {
  return getAllVolunteers().find((v) => v.id === id);
}
