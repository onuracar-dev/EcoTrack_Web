// Atık Noktaları
function initLeafletMap() {
  window.leafletMapInstance = L.map('map', {
    center: [41.3284, 36.2699],
    zoom: 14,
    zoomControl: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  }).addTo(window.leafletMapInstance);

  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: '<div class="map-pulse-pin"></div>',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  L.marker([41.3320, 36.2650], { icon: customIcon }).addTo(window.leafletMapInstance)
    .bindPopup('<b style="color:#000;">Atakum Sahil Geri Dönüşüm</b><br><span style="color:#666;">Organik & Gıda Atıkları</span>');

  L.marker([41.3250, 36.2750], { icon: customIcon }).addTo(window.leafletMapInstance)
    .bindPopup('<b style="color:#000;">Ömürevleri Mobil İstasyon</b><br><span style="color:#666;">Cam, Kağıt, Plastik</span>');
}

// Ne Kurtardım
function hesaplaTasarruf() {
  const plasticCount = Number(document.getElementById("plastikInput").value) || 0;
  const paperKg = Number(document.getElementById("kagıtInput").value) || 0;
  const glassCount = Number(document.getElementById("camInput").value) || 0;
  const metalCount = Number(document.getElementById("metalInput").value) || 0;

  const totalTrees = (paperKg * 0.017) + (plasticCount * 0.0001) + (glassCount * 0.0002) + (metalCount * 0.0003);
  const totalWater = (plasticCount * 3) + (paperKg * 26) + (glassCount * 1.2) + (metalCount * 5);
  const totalCO2 = (plasticCount * 0.08) + (paperKg * 0.90) + (glassCount * 0.30) + (metalCount * 0.50);

  document.getElementById("agacSayisi").textContent = totalTrees.toFixed(3);
  document.getElementById("suMiktari").textContent = Math.round(totalWater);
  document.getElementById("co2Miktari").textContent = totalCO2.toFixed(1);
}

// Atık Bankası
const wasteDatabase = [
  { name: "Pet Şişe", category: "plastik", points: "15 Puan/Adet", desc: "Plastik su/alkolsüz içecek şişeleri ve kapakları." },
  { name: "Naylon Poşet", category: "plastik", points: "5 Puan/Adet", desc: "Yırtılmamış temiz market poşetleri." },
  { name: "Karton Koli", category: "kağıt", points: "25 Puan/Kg", desc: "Kuru, katlanmış temiz karton kutular." },
  { name: "Gazete & Defter", category: "kağıt", points: "20 Puan/Kg", desc: "Okunmuş gazeteler, eski okul defterleri." },
  { name: "Cam Kavanoz", category: "cam", points: "20 Puan/Adet", desc: "Temizlenmiş boş cam kavanozlar." },
  { name: "Maden Suyu Şişesi", category: "cam", points: "15 Puan/Adet", desc: "Kırılmamış yeşil/beyaz cam içecek şişeleri." },
  { name: "Alüminyum Kutu", category: "metal", points: "30 Puan/Adet", desc: "Alüminyum içecek kutuları." },
  { name: "Konserve Kutusu", category: "metal", points: "25 Puan/Adet", desc: "Temiz yıkanmış konserve ve salça tenekeleri." }
];

function filtreleAtikBankasi() {
  const searchInput = document.getElementById("atikAramasi").value.trim().toLowerCase();
  const bankSection = document.getElementById("atikBankasi");
  const resultsGrid = document.getElementById("aramaSonuclari");

  if (searchInput.length > 0) {
    bankSection.classList.add("searching");
    let resultsHtml = '<div class="aramaSonuclarıKismi">';
    let foundAny = false;

    for (let i = 0; i < wasteDatabase.length; i++) {
      const item = wasteDatabase[i];
      if (item.name.toLowerCase().includes(searchInput) || item.category.toLowerCase().includes(searchInput)) {
        foundAny = true;
        resultsHtml += '<div class="resultCard">' +
                         '<span class="resPoints">' + item.points + '</span>' +
                         '<h4>' + item.name + '</h4>' +
                         '<p>' + item.desc + '</p>' +
                       '</div>';
      }
    }
    resultsHtml += '</div>';

    if (foundAny) {
      resultsGrid.innerHTML = resultsHtml;
    } else {
      resultsGrid.innerHTML = '<div class="resultCard" style="grid-column: 1 / -1; text-align: center; border-color: var(--good-orange);">' +
                                 '<h4 style="color: var(--good-orange);">Atık Türü Bulunamadı</h4>' +
                                 '<p>Lütfen plastik, kağıt, cam veya metal aramayı deneyin.</p>' +
                               '</div>';
    }
  } else {
    bankSection.classList.remove("searching");
    resultsGrid.innerHTML = "";
  }
}

// Hakkımızda
const aboutCards = document.querySelectorAll(".aboutCard");
let currentCardIndex = 0;
let isAboutTransitioning = false;

for (let i = 0; i < aboutCards.length; i++) {
  aboutCards[i].className = "aboutCard";
}
if (aboutCards.length > 0) {
  aboutCards[0].className = "aboutCard active-card";
}

function showAboutCard(index) {
  if (index < 0 || index >= aboutCards.length || isAboutTransitioning) return;
  isAboutTransitioning = true;
  
  const outgoingCard = aboutCards[currentCardIndex];
  const incomingCard = aboutCards[index];
  
  if (outgoingCard) {
    outgoingCard.className = "aboutCard exit-card";
  }
  incomingCard.className = "aboutCard active-card";
  
  currentCardIndex = index;
  
  setTimeout(function() {
    isAboutTransitioning = false;
  }, 400);
}

const aboutSection = document.getElementById("hakkimizda");
if (aboutSection) {
  aboutSection.addEventListener("wheel", function(e) {
    if (e.deltaY > 0) {
      if (currentCardIndex < aboutCards.length - 1) {
        showAboutCard(currentCardIndex + 1);
      }
    } else {
      if (currentCardIndex > 0) {
        showAboutCard(currentCardIndex - 1);
      }
    }
  });
}

// Ayarlar
function toggleSetting(button) {
  button.classList.toggle("active");
  if (button.classList.contains("active")) {
    button.textContent = "Aktif";
  } else {
    button.textContent = "Pasif";
  }
}

const saveBtn = document.querySelector(".settingsSaveBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", function() {
    const btn = document.querySelector(".settingsSaveBtn");
    const originalText = btn.textContent;
    
    btn.textContent = "Tercihler Kaydedildi! ✓";
    btn.style.background = "#ffffff";
    btn.style.color = "#000000";
    
    setTimeout(function() {
      btn.textContent = originalText;
      btn.style.background = "#ffffff";
      btn.style.color = "#000000";
    }, 2000);
  });
}

// SPA Sayfa Yönlendirici
function navigateTo(hash) {
  let targetId = "home";
  if (hash) {
    targetId = hash.replace("#", "");
  }
  
  const sections = document.querySelectorAll(".videoKismi");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  let targetSection = document.getElementById(targetId);
  if (!targetSection) {
    targetSection = document.getElementById("home");
  }
  
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active-page");
  }
  targetSection.classList.add("active-page");
  
  if (targetSection.id === "atikNoktalari" && !window.leafletMapInstance) {
    setTimeout(function() {
      initLeafletMap();
    }, 200);
  } else if (targetSection.id === "atikNoktalari" && window.leafletMapInstance) {
    setTimeout(function() {
      window.leafletMapInstance.invalidateSize();
    }, 200);
  }
  
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
    if (navLinks[i].getAttribute("href") === "#" + targetSection.id) {
      navLinks[i].classList.add("active");
    }
  }

  if (targetSection.id === "hakkimizda") {
    for (let i = 0; i < aboutCards.length; i++) {
      aboutCards[i].className = "aboutCard";
    }
    if (aboutCards.length > 0) {
      aboutCards[0].className = "aboutCard active-card";
    }
    currentCardIndex = 0;
    isAboutTransitioning = false;
  }
}

// Menü Dinleyicileri
const links = document.querySelectorAll(".nav-links a");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function(e) {
    e.preventDefault();
    const hash = this.getAttribute("href");
    window.location.hash = hash;
    navigateTo(hash);
  });
}

window.addEventListener("hashchange", function() {
  navigateTo(window.location.hash);
});

document.addEventListener("DOMContentLoaded", function() {
  hesaplaTasarruf();
  navigateTo(window.location.hash);
});