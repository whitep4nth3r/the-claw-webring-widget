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
  }

  async connectedCallback() {
    const members = await fetch("https://the-claw-webring.netlify.app/data/members.json").then((res) => res.json());
    const loc = document.location.href;

    // // For testing purposes in development
    // if (loc === "http://localhost:8888/") {
    //   members.push({
    //     url: "http://localhost:8888/",
    //     name: "Testing in Dev",
    //     feed: null,
    //   });
    // }

    const meta = await fetch("https://the-claw-webring.netlify.app/data/meta.json").then((res) => res.json());

    const thisMemberIndex = members.map((e) => e.url).indexOf(loc);

    const prevIndex = thisMemberIndex === 0 ? members.length - 1 : thisMemberIndex - 1;
    const nextIndex = thisMemberIndex === members.length - 1 ? 0 : thisMemberIndex + 1;

    const prevUrl = members[prevIndex].url;
    const nextUrl = members[nextIndex].url;

    const html = `
    <div class="tcwr">
      <div class="tcwr__inner">
        <div class="tcwr__header">
          <img src="${meta.image}" alt="${meta.title}" class="tcwr__image" />
          <h2 class="tcwr__title">${meta.title}</h2>
          <p class="tcwr_count">${members.length} members</p>
          <a href="https://github.com/whitep4nth3r/the-claw-webring#join-the-claw-webring" class="tcwr_join">Join The Claw Webring</a>
        </div>

        <div class="tcwr__nav">
          <a href=${prevUrl} class="tcwr__navItem">Prev</a>
          ${getRandomMember(members)}
          <a href="${nextUrl}" class="tcwr__navItem">Next</a>
        </div>

        <ul class="tcwr__membersList">
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
