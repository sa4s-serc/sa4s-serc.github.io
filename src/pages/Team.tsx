
import { useState } from "react";
import { Mail, Linkedin, Globe } from "lucide-react";
import { categories, defaultPhoto, teamMembers } from "../data/teamData";
import { publicUrl } from "../lib/utils";
import type { TeamMember } from "../data/team/teamTypes";

const iconBtnCls = "w-9 h-9 bg-[#E8E2D8] hover:bg-[#2D6A4F] hover:text-white text-[#6B6455] rounded-lg flex items-center justify-center transition-all duration-150";
const textBtnCls = "px-3 py-1.5 bg-[#E8E2D8] hover:bg-[#2D6A4F] hover:text-white text-[#6B6455] rounded-lg flex items-center justify-center transition-all duration-150 text-xs font-medium";

function MemberButtons({ member, align = "center" }: { member: TeamMember; align?: "center" | "start" }) {
  const wrap = align === "start" ? "justify-center sm:justify-start" : "justify-center";
  return (
    <div className={`flex ${wrap} mt-4 gap-2 flex-wrap`}>
      {member.email && (
        <a href={`mailto:${member.email}`} className={iconBtnCls} aria-label={`Email ${member.name}`}>
          <Mail size={16} />
        </a>
      )}
      {member.scholar && (
        <a href={member.scholar} target="_blank" rel="noopener noreferrer" className={textBtnCls}>
          Google Scholar
        </a>
      )}
      {member.dblp && (
        <a href={member.dblp} target="_blank" rel="noopener noreferrer" className={textBtnCls}>
          DBLP
        </a>
      )}
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={iconBtnCls} aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
      )}
      {member.website && (
        <a href={member.website} target="_blank" rel="noopener noreferrer" className={iconBtnCls} aria-label="Website">
          <Globe size={16} />
        </a>
      )}
    </div>
  );
}

function FacultyCard({ member }: { member: TeamMember }) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#EAE4D6] border border-[#D8D2C4] hover:border-[#2D6A4F]/40 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-200">
      <img
        src={publicUrl(member.photo === "" ? defaultPhoto : member.photo)}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="w-40 h-40 rounded-full shrink-0 object-cover ring-2 ring-[#D8D2C4]"
      />
      <div className="flex-1 text-center sm:text-left">
        <p className="text-[10px] text-[#2D6A4F] tracking-[0.2em] uppercase font-semibold mb-1">Faculty</p>
        <h3 className="text-lg font-bold text-[#1A1710] mb-0.5">{member.name}</h3>
        <p className="text-sm text-[#6B6455] mb-3">{member.role}</p>
        {member.education && member.education.length > 0 && (
          <ul className="text-sm text-[#6B6455] space-y-1 list-disc list-inside">
            {member.education.map((edu, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: edu }} />
            ))}
          </ul>
        )}
        <MemberButtons member={member} align="start" />
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const isAlumni = member.category === "Alumni";
  return (
    <div className="relative bg-[#F0EBE1] border border-[#D8D2C4] hover:border-[#2D6A4F]/40 rounded-xl p-5 text-center transition-all duration-200">
      {isAlumni && (
        <span className="absolute top-3 right-3 text-[9px] tracking-[0.18em] uppercase font-semibold text-[#9A8F80]">
          Alumni
        </span>
      )}
      <img
        src={publicUrl(member.photo === "" ? defaultPhoto : member.photo)}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="w-36 h-36 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#D8D2C4]"
      />
      <h3 className="text-base font-bold text-[#1A1710] mb-0.5">{member.name}</h3>
      <p className="text-sm text-[#6B6455]">{member.role}</p>
      {member.education && member.education.length > 0 && (
        <ul className="text-left text-sm text-[#6B6455] mt-4 list-disc list-inside space-y-1">
          {member.education.map((edu, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: edu }} />
          ))}
        </ul>
      )}
      <MemberButtons member={member} />
    </div>
  );
}

const Team = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers =
    activeCategory === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

  const faculty = filteredMembers.filter((m) => m.category === "Faculty");
  const rest = filteredMembers.filter((m) => m.category !== "Faculty");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="bg-[#0C2118] border-b border-[#1C4030] py-16">
        <div className="container mx-auto px-4">
          <p className="text-xs text-[#52B788] tracking-[0.25em] uppercase font-semibold mb-3">People</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#EDE8DF]">Our Team</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap justify-center gap-1.5 mb-10 border-b border-[#D8D2C4] pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 text-sm font-medium rounded transition-all duration-150 ${
                activeCategory === category
                  ? "bg-[#1F4A30] text-[#EDE8DF]"
                  : "text-[#6B6455] hover:text-[#2D6A4F] hover:bg-[#EAE4D6]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {faculty.map((m) => <FacultyCard key={m.name} member={m} />)}
          {rest.map((m) => <MemberCard key={m.name + m.role} member={m} />)}
        </div>
      </div>
    </div>
  );
};

export default Team;
