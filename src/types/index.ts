// src/types/index.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  href?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Reference {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  url?: string;
}

export interface ContactInfo {
  phone: string;
  phoneLink: string;
  whatsapp: string;
  whatsappLink: string;
  email?: string;
  address?: string;
}

export interface SolutionCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}
