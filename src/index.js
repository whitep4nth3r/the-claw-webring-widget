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
    const cleanHostname = hostname.replace("www.", "");
    const IS_DEV = cleanHostname === "localhost";

    // For testing purposes in development
    if (IS_DEV) {
      members.push({
        url: "http://localhost:8888/",
        name: "Testing in Dev",
        feed: null,
      });
    }

    const meta = await fetch("https://the-claw-webring.netlify.app/data/meta.json").then((res) => res.json());

    const thisMember = members.find((member) => member.url.includes(cleanHostname));
    const thisMemberIndex = members.findIndex((item) => item === thisMember);

    // do not continue if the hostname is not in the data list
    if (thisMemberIndex === -1 && !IS_DEV) {
      console.log("%cOh hai!", "font-size: 20px");
      console.log(
        "You are trying to use The Claw Webring Widget on a site that has not been added to the Webring. Or you might just be trying to view it on a preview deployment URL, or on a development URL that is not localhost. Either way, the code stops working from here.",
      );
      return;
    }

    const prevIndex = thisMemberIndex === 0 ? members.length - 1 : thisMemberIndex - 1;
    const nextIndex = thisMemberIndex === members.length - 1 ? 0 : thisMemberIndex + 1;

    const prevUrl = members[prevIndex].url;
    const nextUrl = members[nextIndex].url;

    const html = `
    <div class="tcwr">
      <div class="tcwr__header">
        <h2 class="tcwr__title">${meta.title}</h2>
        <div class="tcwr__controls">
          <button aria-label="Minimize" data-minimize></button>
          <button aria-label="Maximize" data-maximize></button>
          <button aria-label="Close" data-close></button>
        </div>
      </div>
    
      <div class="tcwr__explosion" data-explosion></div>

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

        <ul class="tcwr__membersList${this.hideMembers === "true" ? " tcwr__membersList--hide" : ""}" data-memberlist>
          ${makeMemberList(members)}
        </ul>
      </div>
    </div>
    `;

    this.shadowRoot.innerHTML = html;

    const minimize = this.shadowRoot.querySelector("[data-minimize]");
    const maximize = this.shadowRoot.querySelector("[data-maximize]");
    const memberList = this.shadowRoot.querySelector("[data-memberlist]");
    const close = this.shadowRoot.querySelector("[data-close]");
    const explosion = this.shadowRoot.querySelector("[data-explosion]");

    minimize.addEventListener("click", () => {
      memberList.style.display = "none";
    });

    maximize.addEventListener("click", () => {
      memberList.style.display = "block";
    });

    close.addEventListener("click", () => {
      memberList.style.display = "none";
      explosion.style.display = "block";

      setTimeout(() => {
        this.shadowRoot.innerHTML = "";
      }, 1000);
    });

    const style = document.createElement("style");
    style.innerHTML = styles;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("the-claw-webring-widget", TheClawWebringWidget);
