/* Bleu Grave — store script (merch page only).
   Turns each product's empty .buy-slot into a Shopify Buy Button, using
   Shopify's own Buy Button library. It only runs when merch.html has a
   store domain and Storefront token filled in on the #shop grid, and only
   touches products that have a data-product-id. With those blank it does
   nothing, so the page is a plain catalogue.

   Money never touches this site: the button, cart, and checkout are
   Shopify's, rendered in their own frames. Visitors without JavaScript
   see each product's .buy-link (a plain link to the product on Shopify)
   instead. See CLAUDE.md, "How to connect the store". */

(function () {
  "use strict";

  var grid = document.getElementById("shop");
  if (!grid) return;

  var domain = (grid.getAttribute("data-shop-domain") || "").trim();
  var token = (grid.getAttribute("data-shop-token") || "").trim();
  if (!domain || !token) return;

  var products = Array.prototype.slice
    .call(grid.querySelectorAll("[data-product-id]"))
    .filter(function (el) { return (el.getAttribute("data-product-id") || "").trim(); });
  if (!products.length) return;

  // Pull the site's design tokens so the Shopify frames match the page.
  var root = getComputedStyle(document.documentElement);
  function tok(name) { return root.getPropertyValue(name).trim(); }
  var bg = tok("--bg"), bgRaised = tok("--bg-raised"), line = tok("--bg-line");
  var ink = tok("--ink"), inkDim = tok("--ink-dim");
  var accent = tok("--accent"), accentDim = tok("--accent-dim"), accentDeep = tok("--accent-deep");
  var mono = '"Space Mono", "Courier New", monospace';

  var button = {
    "font-family": mono,
    "font-weight": "700",
    "font-size": "13px",
    "letter-spacing": "0.16em",
    "text-transform": "uppercase",
    "color": ink,
    "background-color": "transparent",
    "border": "1px solid " + accentDim,
    "border-radius": "0",
    "padding-top": "13px",
    "padding-bottom": "13px",
    ":hover": { "background-color": accentDeep, "border-color": accent, "color": ink },
    ":focus": { "background-color": accentDeep, "border-color": accent }
  };

  var options = {
    product: {
      iframe: true,
      contents: { img: false, title: false, price: true, options: true, button: true },
      text: { button: "Add to cart" },
      googleFonts: ["Space Mono"],
      styles: {
        product: { "text-align": "left", "margin-bottom": "0", "@media (min-width: 601px)": { "max-width": "100%", "margin-left": "0" } },
        price: { "font-family": mono, "font-size": "16px", "color": ink },
        compareAt: { "font-family": mono, "color": inkDim },
        button: button,
        option: { "font-family": mono },
        options: { "margin-bottom": "12px" }
      }
    },
    cart: {
      iframe: true,
      text: { title: "Cart", total: "Subtotal", button: "Checkout", empty: "Your cart is empty." },
      googleFonts: ["Space Mono"],
      styles: {
        cart: { "background-color": bgRaised, "color": ink, "font-family": mono },
        header: { "color": ink, "font-family": mono },
        title: { "color": ink, "font-family": mono, "text-transform": "uppercase", "letter-spacing": "0.1em" },
        lineItems: { "color": ink },
        subtotalText: { "color": inkDim, "font-family": mono },
        subtotal: { "color": ink, "font-family": mono },
        notice: { "color": inkDim, "font-family": mono },
        currency: { "color": inkDim },
        close: { "color": inkDim, ":hover": { "color": ink } },
        empty: { "color": inkDim, "font-family": mono },
        footer: { "background-color": bgRaised },
        button: button
      }
    },
    toggle: {
      iframe: true,
      googleFonts: ["Space Mono"],
      styles: {
        toggle: {
          "font-family": mono,
          "background-color": bg,
          "border": "1px solid " + accentDim,
          ":hover": { "background-color": accentDeep },
          ":focus": { "background-color": accentDeep }
        },
        count: { "color": accent, "font-family": mono, ":hover": { "color": ink } },
        iconPath: { "fill": accent }
      }
    },
    lineItem: {
      styles: {
        variantTitle: { "color": inkDim, "font-family": mono },
        title: { "color": ink, "font-family": mono },
        price: { "color": ink, "font-family": mono },
        fullPrice: { "color": inkDim },
        discount: { "color": inkDim },
        discountIcon: { "fill": inkDim },
        quantity: { "color": ink },
        quantityIncrement: { "color": ink, "border-color": line },
        quantityDecrement: { "color": ink, "border-color": line },
        quantityInput: { "color": ink, "border-color": line, "background-color": bg }
      }
    }
  };

  function mountAll() {
    var client = window.ShopifyBuy.buildClient({ domain: domain, storefrontAccessToken: token });
    window.ShopifyBuy.UI.onReady(client).then(function (ui) {
      products.forEach(function (product) {
        var slot = product.querySelector(".buy-slot");
        if (!slot) return;
        ui.createComponent("product", {
          id: product.getAttribute("data-product-id").trim(),
          node: slot,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: options
        });
        // The live button replaces the plain link and the placeholder price.
        var link = product.querySelector(".buy-link");
        if (link) link.hidden = true;
        var price = product.querySelector(".price");
        if (price) price.hidden = true;
      });
    });
  }

  // Shopify's Buy Button library — the one store script this site loads.
  var script = document.createElement("script");
  script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  script.async = true;
  script.onload = mountAll;
  document.head.appendChild(script);
})();
