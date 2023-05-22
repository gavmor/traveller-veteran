
export const AcademicSkills = ["Admin", "Advocate", "Animals", "Animals (Training)", "Animals (Veterinary)", "Art", "Astrogation", "Electronics (any)", "Engineer (any)", "Language (any)", "Medic", "Navigation", "Profession (any)", "Science (any)"] as const;
export const BackgroundSkills = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
export const AllSkills = [...new Set([
  ...BackgroundSkills,
  ...AcademicSkills
])] as const;
export type Skill = (typeof AllSkills)[number];
export type Skillset = Partial<Record<Skill, number>>;
