import styles from "./main.css";

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomEntry(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomMember(members) {
  const randomMember = getRandomEntry(members);

  return `
    <a href="${randomMember.url}" class="tcwr__navItem">Random</a>
  `;
}

function makeMemberList(members) {
  return members
    .map(
      (member) => `<li class="tcwr__membersListItem">
        <a href="${member.url}" class="tcwr__membersListItemLink">
          ${member.name}
        </a>
      </li>`,
    )
    .join("");
}

class TheClawWebringWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hideMembers = this.getAttribute("hideMembers") || false;
  }

  async connectedCallback() {
    const members = await fetch("https://the-claw-webring.netlify.app/data/members.json").then((res) => res.json());
    const hostname = document.location.hostname;

    // For testing purposes in development
    if (hostname === "localhost") {
      members.push({
        url: "http://localhost:8888/",
        name: "Testing in Dev",
        feed: null,
      });
    }

    const meta = await fetch("https://the-claw-webring.netlify.app/data/meta.json").then((res) => res.json());

    const thisMember = members.find((member) => member.url.includes(hostname));
    const thisMemberIndex = members.findIndex((item) => item === thisMember);

    const prevIndex = thisMemberIndex === 0 ? members.length - 1 : thisMemberIndex - 1;
    const nextIndex = thisMemberIndex === members.length - 1 ? 0 : thisMemberIndex + 1;

    const prevUrl = members[prevIndex].url;
    const nextUrl = members[nextIndex].url;

    const html = `
    <div class="tcwr">
      <div class="tcwr__header">
        <h2 class="tcwr__title">${meta.title}</h2>
      </div>
      
      <div class="tcwr__inner"> 
        <img src="${meta.image}" alt="${meta.title}" class="tcwr__image" />

        <div class="tcwr__nav">
          <a href=${prevUrl} class="tcwr__navItem">Prev</a>
          ${getRandomMember(members)}
          <a href="${nextUrl}" class="tcwr__navItem">Next</a>
        </div>
        
        <a href="https://github.com/whitep4nth3r/the-claw-webring#join-the-claw-webring" class="tcwr_join">Join  ${
          members.length
        } members</a>

        ${
          this.hideMembers === "true"
            ? ""
            : `<ul class="tcwr__membersList">
          ${makeMemberList(members)}
        </ul>`
        }
      </div>
    </div>
    `;

    this.shadowRoot.innerHTML = html;

    const style = document.createElement("style");
    style.innerHTML = styles;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("the-claw-webring-widget", TheClawWebringWidget);
