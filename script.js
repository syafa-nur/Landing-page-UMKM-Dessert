const IMG_DIR = "images/";
const SITE = {
  wa: { number: "6287824066269" }, 
  benefits: [
    {
      i: "kenyal",
      img: "kenyal.jpg",
      t: "Mochi Kenyal dan lembut",
      d: "Dibuat pagi hari, tetap empuk sampai diterima.",
    },
    {
      i: "custom",
      img: "pilihan.jpg",
      t: "Rasa bisa dipilih",
      d: "Campur rasa sesuai selera atau tema acara.",
    },
    {
      i: "packing",
      img: "kotak.jpg",
      t: "Kemasan aman",
      d: "Dikemas rapi supaya bentuknya utuh sampai tujuan.",
    },
    {
      i: "preorder",
      img: "order.jpg",
      t: "Pre-order mudah",
      d: "Pesan H-1 lewat WhatsApp, tanpa antre.",
    },
  ],
  flavors: [
    {
      cat: "Mochi",
      n: "Strawberry",
      d: "Isian strawberry segar dalam kulit mochi yang lembut dan kenyal.",
      p: 10000,
      img: "strawberry.jpg",
      best: true,
    },
    {
      cat: "Mochi",
      n: "Matcha",
      d: "Matcha pekat dengan rasa sedikit pahit, seimbang dan tidak terlalu manis.",
      p: 10000,
      img: "matcha.jpg",
    },
    {
      cat: "Mochi",
      n: "Coklat",
      d: "Isian coklat lumer, manis secukupnya dan bertabur bubuk coklat.",
      p: 10000,
      img: "coklat.jpg",
    },
    {
      cat: "Mochi",
      n: "Mangga",
      d: "Isian whipped cream dengan mangga yang segar dan manis, cocok untuk yang suka rasa buah.",
      p: 10000,
      img: "mangga.jpg",
    },
    {
      cat: "Mochi",
      n: "Oreo",
      d: "Isian oreo creamy dengan aroma khas dan tekstur halus.",
      p: 10000,
      img: "oreo.jpg",
    },
    {
      cat: "Cookies",
      n: "Dubai Cwhee Cookie",
      d: "Cookie spesial terinspirasi dessert Dubai, renyah dengan isian yang kaya.",
      p: 20000,
      img: "dubai-cwhee-cookie.jpg",
      tag: "Special",
    },
    {
      cat: "Cookies",
      n: "Soft Cookies",
      d: "Cookie homemade yang renyah di luar dan lembut di dalam.",
      p: 25000,
      img: "cwhee-cookies.jpg",
    },
  ],
  testimonials: [
    { q: "Teksturnya lembut banget, manisnya pas. Anak-anak habis sekejap.", n: "Rina, Bandung" },
    { q: "Pesan hampers untuk kado kantor, rapi dan semua suka.", n: "Dimas, Jakarta" },
    { q: "Pesan lewat WhatsApp gampang, dibalas cepat dan tepat waktu.", n: "Sari, Cimahi" },
  ],
  // nanti: data paket, belum ditampilkan di website
  plans: [
    {
      n: "Satuan",
      price: "Rp10.000",
      note: "per mochi",
      items: ["Pilih 1 rasa", "Cocok untuk dicoba"],
    },
    {
      n: "Box 6",
      price: "Rp60.000",
      note: "6 mochi",
      items: ["Campur rasa bebas", "Box kemasan rapi"],
      best: true,
    },
    {
      n: "Hampers 12",
      price: "Rp120.000",
      note: "12 mochi",
      items: ["Campur rasa bebas", "Box hampers + kartu ucapan"],
    },
  ],
  faq: [
    {
      q: "Berapa lama produknya tahan?",
      a: "Dubai Cwhee Cookie dan Soft Cookies tahan 5–7 hari dalam wadah tertutup di tempat sejuk dan kering. Mochi terbaik dikonsumsi di hari yang sama atau disimpan di kulkas hingga 2 hari.",
    },
    { q: "Apakah halal?", a: "Ya, semua bahan halal dan dibuat sendiri di dapur rumah." },
    {
      q: "Pesan harus berapa hari sebelumnya?",
      a: "Sebaiknya H-1. Untuk jumlah besar, pesan 2-3 hari sebelumnya.",
    },
    { q: "Apakah bisa diantar?", a: "Bisa, lewat kurir online. Ongkos dihitung sesuai jarak." },
    {
      q: "Bagaimana cara bayar?",
      a: "Transfer atau e-wallet, detailnya kami kirim lewat WhatsApp.",
    },
  ],
  footer: {
    about: "Mochi homemade dengan sentuhan dessert cafe Jepang-Indonesia.",
    hours: "Senin-Sabtu, 06.00-14.00 WIB",
    social: [
      { n: "Instagram @cwheeandco", u: "https://www.instagram.com/jeena.fa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" },
      { n: "TikTok @cwheeandco", u: "https://www.tiktok.com/@cwheeandco" },
    ],
  },
};

const PRAY = "\u{1F64F}"; 
const rp = (n) => "Rp" + n.toLocaleString("id-ID");
const $ = (id) => document.getElementById(id);
const esc = (t) =>
  String(t).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const waLink = (msg) => `https://wa.me/${SITE.wa.number}?text=${encodeURIComponent(msg)}`;


const safe = (name, fn) => {
  try {
    fn();
  } catch (err) {
    console.error(`[${name}]`, err);
  }
};


const FORM_LINES = [
  "*Nama:* ",
  "*Ambil/Antar:* ",
  "*Alamat (kalau diantar):* ",
  "*Tanggal:* ",
  "*Tambahan/catatan:* ",
];

function orderMessage(item) {
  const what = item.cat === "Mochi" ? "Mochi " + item.n : item.n;
  const price = item.p ? ` (@${rp(item.p)})` : "";
  return [
    `Halo Cwhee & Co, saya mau order ${PRAY}`,
    "",
    `*Pesanan:* ${what}${price}`,
    "*Jumlah:* ",
    ...FORM_LINES,
    "",
    "Mohon dikonfirmasi ya. Terima kasih!",
  ].join("\n");
}

function generalMessage() {
  return [
    `Halo Cwhee & Co, saya mau order ${PRAY}`,
    "",
    "*Pesanan:* ",
    "*Jumlah:* ",
    ...FORM_LINES,
    "",
    "Mohon dikonfirmasi ya. Terima kasih!",
  ].join("\n");
}
function product(f) {
  const tag = f.tag || (f.best ? "Paling laris" : "");
  return `<div class="col-12 col-sm-6 col-lg-4 reveal in"><article class="card product h-100 flex-row flex-sm-column gap-3 gap-sm-0">
    <div class="product-img position-relative"><div class="ratio ratio-4x5"><img class="object-fit-cover" src="${IMG_DIR}${encodeURI(f.img)}" alt="${esc(f.n)}" loading="lazy" onerror="this.onerror=null;this.style.visibility='hidden'"></div>${tag ? `<span class="badge badge-note position-absolute top-0 start-0 m-1 m-sm-2 bg-white border rounded-1 fw-medium">${tag}</span>` : ""}</div>
    <div class="card-body d-flex flex-column p-0 pt-sm-3"><h3 class="mb-1">${esc(f.n)}</h3><p class="card-text flex-grow-1 mb-0 small text-body-secondary">${esc(f.d)}</p>
      <div class="product-foot d-flex align-items-center justify-content-between gap-3 mt-2 mt-sm-3 pt-0 pt-sm-3"><span class="price ${f.p ? "" : "ask"}">${f.p ? rp(f.p) : "Tanya harga"}</span>
      <a class="btn btn-order" href="${waLink(orderMessage(f))}" target="_blank" rel="noopener" aria-label="Pesan ${esc(f.n)} lewat WhatsApp">Pesan</a></div></div></article></div>`;
}

function matches(f, words) {
  const text = `${f.n} ${f.d} ${f.cat}`.toLowerCase();
  return words.every((w) => text.includes(w));
}

function renderMenu(query = "") {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const found = SITE.flavors.filter((f) => matches(f, words));
  const groups = ["Mochi", "Cookies"]
    .map((c) => {
      const items = found.filter((f) => f.cat === c);
      return items.length
        ? `<div class="cat"><h3 class="cat-title fw-medium pb-3 mb-4 border-bottom">${c.toUpperCase()}</h3><div class="row gx-4 gy-0 gy-sm-4">${items.map((f) => product(f)).join("")}</div></div>`
        : "";
    })
    .join("");

  $("menu-groups").innerHTML =
    groups ||
    `<div class="menu-empty py-5 text-body-secondary"><strong class="d-block fs-3 mb-1 text-body font-display">Menu tidak ditemukan</strong>
    Belum ada menu untuk "${esc(query.trim())}". Coba kata lain, atau
    <a href="${waLink(`Halo Cwhee & Co, apakah ada ${query.trim()}?`)}" target="_blank" rel="noopener">tanya langsung lewat WhatsApp</a>.</div>`;

  $("menu-status").textContent = words.length
    ? found.length
      ? `${found.length} menu ditemukan`
      : "Menu tidak ditemukan"
    : "";
}

function renderBenefits() {
  $("benefits").innerHTML = SITE.benefits
    .map(
      (b) =>
        `<div class="col-6 col-lg-3 reveal in"><article class="feature h-100"><img class="feature-image d-block w-100 rounded object-fit-cover mb-3" src="${IMG_DIR}${encodeURI(b.img)}" alt="" aria-hidden="true" loading="lazy" onerror="this.onerror=null;this.style.visibility='hidden'"><h3 class="mb-1">${b.t}</h3><p class="small mb-0 text-body-secondary">${b.d}</p></article></div>`,
    )
    .join("");
}

function renderTestimonials() {
  const firstTestimonial = SITE.testimonials[0];
  $("testimonials").innerHTML =
    `<figure class="testimonial-featured mx-auto mb-0" id="testimonial-panel" role="tabpanel" aria-labelledby="testimonial-tab-0" aria-live="off">
    <blockquote class="testimonial-quote" id="testimonial-quote">“${firstTestimonial.q}”</blockquote>
    <figcaption class="testimonial-author" id="testimonial-author">${firstTestimonial.n}</figcaption>
  </figure>
  <div class="testimonial-tabs nav nav-underline justify-content-center gap-3 gap-md-4 mt-4" role="tablist" aria-label="Pilih testimoni">${SITE.testimonials.map((t, i) => `<button class="testimonial-tab nav-link${i === 0 ? " active" : ""}" id="testimonial-tab-${i}" type="button" role="tab" aria-controls="testimonial-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t.n}</button>`).join("")}</div>`;

  const testimonialTabs = [...$("testimonials").querySelectorAll('[role="tab"]')];
  let activeTestimonialIndex = 0;
  let testimonialRotationTimer;
  let testimonialPaused = false;
  let testimonialSwapTimer;
  const selectTestimonial = (index) => {
    activeTestimonialIndex = index;
    const testimonial = SITE.testimonials[index];
    const panel = $("testimonial-panel");
    const updateQuote = () => {
      $("testimonial-quote").textContent = `“${testimonial.q}”`;
      $("testimonial-author").textContent = testimonial.n;
    };
    window.clearTimeout(testimonialSwapTimer);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panel.classList.remove("is-changing");
      updateQuote();
    } else {
      panel.classList.add("is-changing");
      testimonialSwapTimer = window.setTimeout(() => {
        updateQuote();
        requestAnimationFrame(() => panel.classList.remove("is-changing"));
      }, 140);
    }
    testimonialTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === index;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      tab.classList.toggle("active", isActive);
    });
  };
  const scheduleTestimonialRotation = () => {
    window.clearInterval(testimonialRotationTimer);
    testimonialRotationTimer = window.setInterval(() => {
      if (!testimonialPaused && SITE.testimonials.length > 1)
        selectTestimonial((activeTestimonialIndex + 1) % SITE.testimonials.length);
    }, 4000);
  };
  testimonialTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectTestimonial(index);
      scheduleTestimonialRotation();
    });
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % testimonialTabs.length;
      else if (event.key === "ArrowLeft")
        nextIndex = (index - 1 + testimonialTabs.length) % testimonialTabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = testimonialTabs.length - 1;
      else return;
      event.preventDefault();
      testimonialTabs[nextIndex].focus();
      selectTestimonial(nextIndex);
      scheduleTestimonialRotation();
    });
  });
  const box = $("testimonials");
  const setPaused = (v) => (testimonialPaused = v);
  box.addEventListener("mouseenter", () => setPaused(true));
  box.addEventListener("mouseleave", () => setPaused(box.contains(document.activeElement)));
  box.addEventListener("focusin", () => setPaused(true));
  box.addEventListener("focusout", () => setPaused(box.matches(":hover")));
  scheduleTestimonialRotation();
}

function renderFaq() {
  $("faqList").innerHTML = SITE.faq
    .map(
      (f, i) => `<div class="accordion-item border-bottom">
    <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq${i}" aria-expanded="false" aria-controls="faq${i}">${f.q}</button></h3>
    <div id="faq${i}" class="accordion-collapse collapse" data-bs-parent="#faqList"><div class="accordion-body">${f.a}</div></div></div>`,
    )
    .join("");
}

function renderFooter() {
  const F = SITE.footer;
  $("foot-about").textContent = F.about;
  $("foot-hours").textContent = F.hours;
  $("foot-social").innerHTML = F.social.map((s) => `<li><a class="link-light link-opacity-75 link-opacity-100-hover" href="${s.u}">${s.n}</a></li>`).join("");
  $("foot-copy").textContent = `© ${new Date().getFullYear()} Cwhee & Co. Semua hak dilindungi.`;
}

function wireWhatsAppButtons() {
  // Tombol umum (navbar, tentang, CTA, tombol mengambang) memakai template pesan kosong
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa === "order" ? generalMessage() : a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });
}

function render() {
  safe("menu", () => {
    renderMenu("");
    $("menu-search").addEventListener("input", (e) => renderMenu(e.target.value));
  });
  safe("benefits", renderBenefits);
  safe("testimonials", renderTestimonials);
  safe("faq", renderFaq);
  safe("footer", renderFooter);
  safe("wa-buttons", wireWhatsAppButtons);
}

function observe() {
  const els = document.querySelectorAll(".reveal");
  if (
    !("IntersectionObserver" in window) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  els.forEach((e) => io.observe(e));
}

render();
safe("observe", observe);

// Menu navbar di HP menutup otomatis setelah link diklik
safe("navbar-collapse", () => {
  const navMenu = $("nav");
  navMenu.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show"))
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }),
  );
});

// Navbar berubah warna saat di-scroll
safe("navbar-scroll", () => {
  const nav = document.querySelector(".navbar");
  const onScroll = () => {
    const s = scrollY > 40;
    nav.classList.toggle("scrolled", s);
    nav.setAttribute("data-bs-theme", s ? "light" : "dark");
    const btn = nav.querySelector(".btn-nav");
    btn.classList.toggle("btn-outline-light", !s);
    btn.classList.toggle("btn-outline-dark", s);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});