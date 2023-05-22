

export const AcademicSkills = ["Admin", "Advocate", "Animals", "Art", "Astrogation", "Electronics", "Engineer", "Language", "Medic", "Navigation", "Profession", "Science"] as const;
export const BackgroundSkills = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
export const AllSkills = [...new Set([
  ...BackgroundSkills,
  ...AcademicSkills
])] as const;
export type Skill = (typeof AllSkills)[number];


const Specialties = {
  Animals: ["Training", "Veterinary"],
  Electronics: ["Computers"],
  Engineer: ["J-Drive", "M-Drive", "Power Plants"],
  Language: [],
  Profession: ["Carpenter"],
  Science: ["Biology", "Physics", "Sociology"]
} as const
export type SpecialSkill = (keyof typeof Specialties);
type Specialty = string
export type Skillset = Partial<Record<Skill, number>> | Partial<Record<SpecialSkill, Record<Specialty, number>>>;
