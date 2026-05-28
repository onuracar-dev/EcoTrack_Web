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