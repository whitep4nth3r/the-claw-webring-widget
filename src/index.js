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
    <a href="${randomMember.url}" class="webring__random" part="random">Random</a>
  `;
}

function makeMemberList(members) {
  const shuffledMembers = members.sort(() => (Math.random() > 0.5 ? 1 : -1));

  return shuffledMembers
    .map(
      (member) => `<li class="webring__membersListItem" part="membersListItem">
        <a href="${member.url}" class="webring__membersListItemLink" part="membersListItemLink">
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
    <div class="webring">
    <!-- <img src="${meta.image}" alt="${meta.title}" class="webring__image" /> -->
    <h3 class="webring__title" part="title">${meta.title}</h3>
    
    ${getRandomMember(members)}
    
    <ul class="webring__membersList" part="membersList">
    ${makeMemberList(members)}
    </ul>
    </div>
    `;

    this.shadowRoot.innerHTML = html;

    const style = document.createElement("style");
    style.innerHTML = styles;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("the-claw-webring-widget", TheClawWebringWidget);
