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
    <a href="${randomMember.url}" class="tcww__random">I'm feeling lucky</a>
  `;
}

function makeMemberList(members) {
  const shuffledMembers = members.sort(() => (Math.random() > 0.5 ? 1 : -1));

  return shuffledMembers
    .map(
      (member) => `<li class="tcww__membersListItem">
        <a href="${member.url}" class="tcww__membersListItemLink">
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
  }

  async connectedCallback() {
    const members = await fetch("https://the-claw-webring.netlify.app/data/members.json").then((res) => res.json());

    const meta = await fetch("https://the-claw-webring.netlify.app/data/meta.json").then((res) => res.json());

    const html = `
    <div class="tcww">
      <div class="tcww__inner">
        <!-- <img src="${meta.image}" alt="${meta.title}" class="tcww__image" /> -->
        <h3 class="tcww__title">${meta.title}</h3>
        
        ${getRandomMember(members)}
        
        <ul class="tcww__membersList">
          ${makeMemberList(members)}
        </ul>
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
