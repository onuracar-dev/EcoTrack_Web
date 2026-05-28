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