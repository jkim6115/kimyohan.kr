/**
 * ╔═════════════════════════════════════════════════════════╗
 * ║              이력서 랜더링 파일 (render.js)             ║
 * ║  이 파일은 직접 수정할 필요가 없습니다.                 ║
 * ╚═════════════════════════════════════════════════════════╝
 */

/* ── 유틸 ──────────────────────────────── */
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

const tags = (list) =>
  `<div class="tag-list">${list.map(t => `<span class="tag">${t}</span>`).join("")}</div>`;

/* ── 프로필 헤더 ────────────────────────── */
function renderHeader(p) {
  const header = document.getElementById("section-header");

  // 아바타: 이미지 또는 이니셜
  const avatar = el("div", "profile-avatar");
  if (p.avatarImg) {
    const img = document.createElement("img");
    img.src = p.avatarImg;
    img.alt = p.name;
    avatar.appendChild(img);
    avatar.classList.add("has-img");
  } else {
    avatar.textContent = p.avatar;
  }

  const contact = p.contact
    .map(c => `<span><i class="ic">${c.icon}</i> ${c.text}</span>`)
    .join("");

  const info = el("div", "profile-info", `
    <h1 class="profile-name">${p.name}</h1>
    <p class="profile-title">${p.title}</p>
    <p class="profile-summary">${p.summary}</p>
    <div class="contact-inline">${contact}</div>
  `);

  header.appendChild(avatar);
  header.appendChild(info);
}

/* ── 기술 스택 ──────────────────────────── */
function renderSkills(skillGroups) {
  const section = document.getElementById("section-skills");

  skillGroups.forEach(group => {
    const div = el("div", "skill-group");
    div.appendChild(el("h3", "skill-cat", group.category));

    if (group.bars) {
      group.bars.forEach(s => {
        div.insertAdjacentHTML("beforeend", `
          <div class="skill-item">
            <span class="skill-name">${s.name}</span>
            <div class="skill-bar">
              <div class="skill-fill" style="--w:${s.level}%"></div>
            </div>
          </div>
        `);
      });
    }

    if (group.tags) {
      div.insertAdjacentHTML("beforeend", tags(group.tags));
    }

    section.appendChild(div);
  });
}

/* ── 학력 ───────────────────────────────── */
function renderEducation(list) {
  const section = document.getElementById("section-education");
  list.forEach(e => {
    section.insertAdjacentHTML("beforeend", `
      <div class="edu-item">
        <p class="edu-school">${e.school}</p>
        <p class="edu-major">${e.major}</p>
        <p class="edu-period">${e.period}</p>
      </div>
    `);
  });
}

/* ── 자격증 ─────────────────────────────── */
// function renderCertifications(list) {
//   const section = document.getElementById("section-certs");
//   list.forEach(c => {
//     section.insertAdjacentHTML("beforeend", `
//       <div class="cert-item">
//         <p class="cert-name">${c.name}</p>
//         <p class="cert-sub">${c.sub}</p>
//       </div>
//     `);
//   });
// }

/* ── 어학 ───────────────────────────────── */
// function renderLanguages(list) {
//   const section = document.getElementById("section-languages");
//   list.forEach(l => {
//     section.insertAdjacentHTML("beforeend", `
//       <div class="lang-row">
//         <span class="lang-name">${l.name}</span>
//         <span class="lang-badge${l.native ? " native" : ""}">${l.level}</span>
//       </div>
//     `);
//   });
// }

/* ── 경력 사항 ──────────────────────────── */
function renderExperience(list) {
  const section = document.getElementById("section-experience");
  list.forEach(job => {
    const duties = job.duties.map(d => `<li>${d}</li>`).join("");
    section.insertAdjacentHTML("beforeend", `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-body">
          <div class="job-head">
            <div>
              <h3 class="job-title">${job.title}</h3>
              <p class="job-company">${job.company} &nbsp;·&nbsp; ${job.type}</p>
            </div>
            <span class="job-period">${job.period}</span>
          </div>
          <ul class="duties">${duties}</ul>
        </div>
      </div>
    `);
  });
}

/* ── 프로젝트 ───────────────────────────── */
function renderProjects(list) {
  const section = document.getElementById("section-projects");
  list.forEach(p => {
    section.insertAdjacentHTML("beforeend", `
      <div class="project-card">
        <div class="proj-head">
          <h3 class="proj-name">${p.name}</h3>
          <div class="proj-meta">
            ${p.type ? `<span class="proj-type ${p.type === "개인" ? "personal" : "company"}">${p.type}</span>` : ""}
            <span class="proj-year">${p.year}</span>
          </div>
        </div>
        <p class="proj-desc">${p.desc}</p>
        ${tags(p.tags)}
      </div>
    `);
  });
}

/* ── 문서 타이틀 ─────────────────────────── */
function setTitle(name) {
  document.title = `이력서 - ${name.replace(/\s/g, "")}`;
}

/* ── 진입점 ─────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const d = resumeData;
  setTitle(d.profile.name);
  renderHeader(d.profile);
  renderSkills(d.skills);
  renderEducation(d.education);
  // renderCertifications(d.certifications);
  // renderLanguages(d.languages);
  renderExperience(d.experience);
  renderProjects(d.projects);
});
