/* Bleu Grave — the site's only script.
   Three jobs: scroll reveals, hero parallax, and rendering events.json.
   All motion is skipped when the visitor prefers reduced motion, and the
   CSS only hides .reveal elements after this file adds the js-motion
   class — so with JS off, every page is complete and readable. */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveals + parallax (motion-allowing visitors only) ---- */

  if (!reducedMotion) {
    document.documentElement.classList.add("js-motion");

    var revealed = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealed.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealed.forEach(function (el) { observer.observe(el); });
    } else {
      // No IntersectionObserver: never leave content hidden.
      revealed.forEach(function (el) { el.classList.add("is-visible"); });
    }

    var heroArt = document.querySelector(".hero-art");
    if (heroArt) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          heroArt.style.transform = "translateY(" + window.scrollY * 0.25 + "px)";
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* ---- Events (events page only) ----
     Reads events.json and renders upcoming + past lists. Shows in
     events.json look like:
       { "date": "2026-10-31", "venue": "...", "city": "...",
         "ticket_url": "...", "note": "..." }
     ticket_url and note may be empty strings. If a list is empty (or
     events.json is missing/broken) its whole section stays hidden. */

  var upcomingSection = document.getElementById("upcoming-shows");
  var pastSection = document.getElementById("past-shows");
  if (!upcomingSection && !pastSection) return;

  function renderEvent(show, isPast) {
    var li = document.createElement("li");
    li.className = "event" + (isPast ? " past" : "");

    var date = document.createElement("span");
    date.className = "event-date";
    // Parse as local time (a bare "2026-10-31" would parse as UTC and
    // show the previous day in western time zones).
    var d = new Date(show.date + "T12:00:00");
    date.textContent = d.toLocaleDateString(undefined, {
      month: "short", day: "numeric", year: "numeric"
    });

    // Poster-style row: DATE ····· CITY, with venue/note/tickets below.
    var leader = document.createElement("span");
    leader.className = "event-leader";
    leader.setAttribute("aria-hidden", "true");

    var city = document.createElement("span");
    city.className = "event-city";
    city.textContent = show.city;

    var detail = document.createElement("span");
    detail.className = "event-detail";
    var venue = document.createElement("span");
    venue.textContent = show.venue;
    detail.appendChild(venue);
    if (show.note) {
      var note = document.createElement("span");
      note.textContent = show.note;
      detail.appendChild(note);
    }
    if (show.ticket_url && !isPast) {
      var tickets = document.createElement("a");
      tickets.href = show.ticket_url;
      tickets.textContent = "Tickets";
      detail.appendChild(tickets);
    }

    li.appendChild(date);
    li.appendChild(leader);
    li.appendChild(city);
    li.appendChild(detail);

    return li;
  }

  function renderList(section, shows, isPast) {
    if (!section) return;
    if (!shows.length) { section.hidden = true; return; }
    var list = section.querySelector(".event-list");
    shows.forEach(function (show) {
      list.appendChild(renderEvent(show, isPast));
    });
    section.hidden = false;
  }

  fetch("events.json")
    .then(function (res) { return res.json(); })
    .then(function (shows) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var upcoming = [];
      var past = [];
      shows.forEach(function (show) {
        var d = new Date(show.date + "T12:00:00");
        (d >= today ? upcoming : past).push(show);
      });
      upcoming.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      past.sort(function (a, b) { return a.date > b.date ? -1 : 1; });
      renderList(upcomingSection, upcoming, false);
      renderList(pastSection, past, true);
      var empty = document.getElementById("no-shows");
      if (empty) empty.hidden = upcoming.length > 0;
    })
    .catch(function () {
      // events.json missing or invalid: leave the sections hidden.
    });
})();
