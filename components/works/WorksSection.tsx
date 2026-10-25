"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  client: string;
  category: "Websites" | "Product Design" | "E-commerce" | "Branding";
  year: string;
  awards: string[];
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: "cedrus",
    title: "Cedrus Architecture Studio",
    client: "Cedrus Design Group",
    category: "Websites",
    year: "2024",
    awards: ["Awwwards SOTD", "CSSDA Special Kudos"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description:
      "An architectural web experience harmonizing brutalist minimalism with spatial 3D navigation and interactive project blueprints.",
  },
  {
    id: "nextoffice",
    title: "NextOffice Alireza Taghaboni",
    client: "NextOffice",
    category: "Websites",
    year: "2024",
    awards: ["Awwwards Site of the Day", "FWA of the Day"],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description:
      "A globally acclaimed portfolio for Iran's leading avant-garde architecture practice featuring smooth fluid transitions and kinetic layouts.",
  },
  {
    id: "paadiran",
    title: "Paadiran Luxury Workspaces",
    client: "Paadiran Industrial Group",
    category: "E-commerce",
    year: "2023",
    awards: ["CSS Winner SOTD", "CSSDA Best UI/UX"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description:
      "High-end corporate e-commerce and interactive furniture configurator with real-time material shaders and bespoke typography.",
  },
  {
    id: "royal-jeans",
    title: "Royal Jeans Flagship Digital",
    client: "Royal Denim Co.",
    category: "Product Design",
    year: "2023",
    awards: ["Awwwards Honors"],
    image:
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80",
    description:
      "A tactile fashion experience highlighting denim textures through WebGL ripple distortions and dynamic audio responsiveness.",
  },
  {
    id: "design-kki",
    title: "Design KKI Industrial",
    client: "KKI Studio",
    category: "Branding",
    year: "2023",
    awards: ["CSSDA Special Kudos"],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Brand identity system and WebGL brand book showcasing tactile mechanical engineering aesthetics.",
  },
];

const categories = ["All", "Websites", "Product Design", "E-commerce", "Branding"];

export default function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="works" className="relative min-h-screen py-32 px-6 md:px-16 z-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
              Selected Portfolio
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Featured <span className="text-[#f7c02f]">Works</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#f7c02f] text-black font-bold scale-105"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor="VIEW CASE"
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#141414] transition-all duration-500 hover:border-[#f7c02f]/50 cursor-pointer ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Image Container with Zoom Effect */}
              <div
                className={`relative w-full overflow-hidden bg-zinc-900 ${
                  idx === 0 ? "h-[450px] md:h-[600px]" : "h-[380px] md:h-[450px]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Awards Chips */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  {project.awards.map((award, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-[#f7c02f]"
                    >
                      ★ {award}
                    </span>
                  ))}
                </div>

                {/* Category & Year */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/80 z-10">
                  {project.category} · {project.year}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#f7c02f] uppercase tracking-wider mb-2">
                    {project.client}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#f7c02f] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/50">
                  <span>Explore Case Study</span>
                  <span className="text-[#f7c02f] group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Preview */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#181818] border border-white/20 p-8 sm:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              data-cursor="CLOSE"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject.awards.map((award, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#f7c02f]/10 text-[#f7c02f] text-xs font-mono border border-[#f7c02f]/30"
                >
                  ★ {award}
                </span>
              ))}
            </div>

            <h3 className="text-3xl sm:text-5xl font-bold text-white mb-2">
              {activeProject.title}
            </h3>
            <p className="text-sm font-mono text-white/50 mb-6">
              Client: {activeProject.client} · Year: {activeProject.year} · Category:{" "}
              {activeProject.category}
            </p>

            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-6">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light mb-8">
              {activeProject.description} Designed with precision using cutting-edge
              WebGL shaders, interactive 3D camera transitions, and bespoke
              editorial art direction.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveProject(null)}
                className="px-8 py-3 rounded-full bg-[#f7c02f] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                Close Preview
              </button>
              <a
                href="#contact"
                onClick={() => setActiveProject(null)}
                className="px-6 py-3 rounded-full border border-white/20 text-white font-medium text-xs uppercase hover:bg-white/10 transition-colors"
              >
                Request Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

