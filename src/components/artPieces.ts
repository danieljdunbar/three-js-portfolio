import { ArtItem, ArtDetails } from "./types";

// Work experience
export const PELOTON_ART: ArtDetails = {
    title: "Peloton",
    description: "Worked at Peloton as a Senior Software Engineer on the Subscriptions team. My main focus was on frontend development using React and TypeScript. I helped completely rewrite many pages to improve user self service and reduce customer support tickets, set standards for conventions and best practices, develop common components, and helped develop the pattern for our migration to Next.js.",
    url: "/images/Peloton.png",
}
export const GOOGLE_ART: ArtDetails = {
    title: "Google",
    description: "My first job out of college was at Google as a Software Engineer where I worked on the a Google Ads team and for Google Domains. On both these teams I mainly focused on frontend development. Was lucky enough to be surrounded by a bunch of smart and wonderful people that I learned a ton from.",
    url: "/images/Google.png",
}
export const MEMORA_HEALTH_ART: ArtDetails = {
    title: "Memora Health",
    description: "I worked at Memora Health as a Fullstack Software Engineer. The company would work with hospitals to create custom text assistants which were designed to triage the low level, simple questions that patients would have after a procedure and free up the care team to focus on more complex issues. I worked on the Outbound Messaging team and owned a couple of internal tools the company used and helped rewrite orchestration of surveys. It was a 50/50 split between frontend and backend development.",
    url: "/images/MemoraHealth.png",
}
export const HEALTHYMIND_ART: ArtDetails = {
    title: "Healthymind",
    description: "Healthymind was a startup that I founded after my time at Google. I was the sole engineer working with a therapist to develop an application that aided behavioral health professionals in diagnosing mental health conditions and creating documentation for insurance claims.",
    url: "/images/Healthymind.png",
}
export const SKILLS_ART: ArtDetails = {
    title: "Skills",
    description: "SKILLS: TypeScript, JavaScript, React, Next.js, GraphQL, Node.js, Angular, Java, Git, SQL (Postgres), Prisma, Google Cloud, making others feel heard, understanding others, accepting criticism, having a good time doing whatever I'm doing. NOT SKILLS: Pessism. I'm a super optimistic dude that has a fundamental belief in the unlimited potential of myself and others",
    url: "/images/Skills.png",
}
export const EDUCATION_ART: ArtDetails = {
    title: "Education",
    description: "I graduated from the University of Arizona with a Bachelors of Science in Computer Science. Prior to that I spent a year studying at the University of South Carolina and attended Pima Community College where I received an Associate of Science in Physics.",
    url: "/images/Education.png",
}

// Personal
const CAT_ART: ArtDetails = {
    title: "Dog",
    description: "A dog is a domesticated mammal that is known for its loyalty and companionship.",
    url: "/images/dog.png",
}
const DOG_ART: ArtDetails = {
    title: "Dog",
    description: "A dog is a domesticated mammal that is known for its loyalty and companionship.",
    url: "/images/dog.png",
}
const SPELLING_BEE_ART: ArtDetails = {
    title: "Cat",
    description: "A cat is a domesticated mammal that is known for its independence and grace.",
    url: "/images/cat.png",
}
const YOUTH_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const BOOKS_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const PIZZA_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const SOCCER_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const CRAFTS_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const HIKING_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const COOKING_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const COWBOY_POETRY_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}
const EXERCISE_ART: ArtDetails = {
    title: "Fish",
    description: "A fish is a domesticated mammal that is known for its intelligence and curiosity.",
    url: "/images/fish.png",
}

export const WEST_GALLERY_ART: ArtItem[] = [
    { details: GOOGLE_ART, pos: [0, 0, 0], scale: [8, 6] },
    { details: GOOGLE_ART, pos: [-10, 3.5, 0], scale: [4, 4] },
    { details: GOOGLE_ART, pos: [10, 3.5, 0], scale: [4, 4] },
    { details: GOOGLE_ART, pos: [-10, -2.5, 0], scale: [4, 4] },
    { details: GOOGLE_ART, pos: [10, -2.5, 0], scale: [4, 4] },
];

export const NORTH_GALLERY_ART: ArtItem[] = [
    { details: GOOGLE_ART, pos: [5, 3, 0], scale: [10, 3] },
    { details: GOOGLE_ART, pos: [-10, 3, 0], scale: [10, 3] },
    { details: GOOGLE_ART, pos: [-5, -2.5, 0], scale: [10, 3] },
    { details: GOOGLE_ART, pos: [10, -2.5, 0], scale: [10, 3] },
];

export const SOUTH_GALLERY_ART: ArtItem[] = [
    { details: GOOGLE_ART, pos: [0, 0, 0], scale: [4, 8] },
    { details: GOOGLE_ART, pos: [-10, 0, 0], scale: [4, 8] },
    { details: GOOGLE_ART, pos: [10, 0, 0], scale: [4, 8] },
];