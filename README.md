# The Claw Webring Widget

## Example usage

Add the following to a page on your website.

The fallback content is provided in case JavaScript isn't available. Feel free to omit this or edit
this as you wish.

```html
<script
  src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs"
  type="module"
></script>

<the-claw-webring-widget>
  <!-- start optional fallback content in the case of no JavaScript -->
  <div style="color: inherit; font-family: system-ui; padding: 1rem; font-size: 1rem;">
    <div
      style="display: grid; gap: 0.5rem 1rem; align-items: center; margin-bottom: 1rem; justify-content: flex-start; grid-template-areas: 'image title' 'image view';"
    >
      <img
        src="https://the-claw-webring.netlify.app/img/theclaw.png"
        alt="The Claw Webring"
        style="grid-area: image; height: 4rem; transform: rotate(-8deg);"
      />
      <h2 style="grid-area: title; font-size: 1.4rem; margin: 0;">The Claw Webring</h2>
      <a
        href="https://github.com/whitep4nth3r/the-claw-webring"
        style="grid-area: view; margin: 0; color: inherit;"
      >
        View on GitHub
      </a>
    </div>
  </div>
  <!-- end optional fallback content in the case of no JavaScript -->
</the-claw-webring-widget>
```

## Options

Set the following options as attributes on the web component tag.

```text
theme: "dark | light" (default: dark)
hideMembers: "true | false" (default: false)
fullWidth: "true | false" (default: false)
```

For example:

```html
<the-claw-webring-widget theme="light" hideMembers="true" fullWidth="true">
  <!-- ... -->
</the-claw-webring-widget>
```

## About `fullWidth`

The component has a default fixed width of 320px for nostalgia reasons 🌚. If you'd like to put the
widget inside a container and allow the widget to span the full width of that container, use
`fullWidth="true"`.
