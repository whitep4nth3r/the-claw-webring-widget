# The Claw Webring Widget

## Example usage

Add the following to a page on your website.

The fallback content is provided in case JavaScript isn't available. Feel free to omit this or edit this as you wish.

```html
<script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></script>

<the-claw-webring-widget>
  <!-- start optional fallback content in the case of no JavaScript -->
  <style>
    .tcwr__inner {
      color: inherit;
      font-family: system-ui;
      padding: 1rem;
      font-size: 1rem;
    }

    .tcwr__header {
      display: grid;
      gap: 0.5rem 1rem;
      align-items: center;
      margin-bottom: 1rem;
      justify-content: flex-start;
      grid-template-areas: "image title" "image view";
    }

    .tcwr__title {
      grid-area: title;
      font-size: 1.4rem;
      margin: 0;
    }

    .tcwr__image {
      grid-area: image;
      height: 4rem;
      transform: rotate(-8deg);
    }

    .tcwr__view {
      grid-area: view;
      margin: 0;
      color: inherit;
    }
  </style>
  <div class="tcwr__inner">
    <div class="tcwr__header">
      <img src="https://the-claw-webring.netlify.app/img/theclaw.png" alt="The Claw Webring" class="tcwr__image" />
      <h2 class="tcwr__title">The Claw Webring</h2>
      <a href="https://github.com/whitep4nth3r/the-claw-webring" class="tcwr__view">View on GitHub</a>
    </div>
  </div>
  <!-- end optional fallback content in the case of no JavaScript -->
</the-claw-webring-widget>
```

## Theming

Default theme: `dark`

Themes available:

- `dark`
- `light`

Specify the theme on the Web Component like so:

```html
<the-claw-webring-widget theme="light">
  <!-- ... -->
</the-claw-webring-widget>
```
