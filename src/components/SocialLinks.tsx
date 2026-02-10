"use client";

import { Linkedin, Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function SocialLinks() {
    return (
        <div className="absolute top-10 left-10 flex flex-col gap-2 z-50">
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Daniel's Gallery</h1>

            <div className="flex gap-6">
                <a
                    href="https://github.com/danieljdunbar/three-js-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110"
                    aria-label="GitHub"
                >
                    <SiGithub size={24} />
                </a>
                <a
                    href="https://www.linkedin.com/in/danieljdunbar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={24} />
                </a>
                <a
                    href="mailto:dunbardanielj@gmail.com"
                    className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110"
                    aria-label="Email"
                >
                    <Mail size={24} />
                </a>
            </div>
        </div>
    );
}
