let map, userLat, userLon, routeControl;

    const fuelIcon = L.icon({
      iconUrl: '../images/gas-station.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    function haversine(lat1, lon1, lat2, lon2) {
      const toRad = deg => deg * Math.PI / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    function formatTime(distanceKm) {
      const avgSpeed = 30;
      const minutes = (distanceKm / avgSpeed) * 60;
      return Math.round(minutes) + " دقيقة";
    }

    function routeTo(lat, lon) {
      if (routeControl) {
        map.removeControl(routeControl);
      }

      routeControl = L.Routing.control({
        waypoints: [
          L.latLng(userLat, userLon),
          L.latLng(lat, lon)
        ],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
          styles: [{ color: '#007bff', weight: 5 }]
        },
        createMarker: () => null
      }).addTo(map);
    }

    function renderStations(stations) {
      const container = document.getElementById('stationList');
      container.innerHTML = "";

      if (stations.length === 0) {
        container.innerHTML = "🚫 لا توجد محطات قريبة.";
        return;
      }

      stations.slice(0, 6).forEach((s, index) => {
        const div = document.createElement("div");
        div.className = "station-card";
        div.innerHTML = `
        <h3><i class="fas fa-gas-pump"></i> ${s.name}</h3>
        <p><i class="fas fa-road"></i> المسافة: ${s.distance.toFixed(1)} كم</p>
        <p><i class="far fa-clock"></i> الوقت: ${formatTime(s.distance)}</p>
        <button onclick="routeTo(${s.lat}, ${s.lon})"><img src='../images/path.png'> عرض المسار</button>
      `;
        container.appendChild(div);
      });
    }

    async function loadStations() {
      try {
        const query = `
        [out:json];
        node["amenity"="fuel"](around:5000,${userLat},${userLon});
        out body;
      `;

        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query
        });

        const data = await response.json();
        const stations = data.elements.map(e => {
          const distance = haversine(userLat, userLon, e.lat, e.lon);
          return {
            name: e.tags.name || "محطة غير معروفة",
            lat: e.lat,
            lon: e.lon,
            distance
          };
        });

        stations.sort((a, b) => a.distance - b.distance);

        stations.forEach(s => {
          L.marker([s.lat, s.lon], { icon: fuelIcon })
            .addTo(map)
            .bindPopup(`${s.name}<br><button onclick=\"routeTo(${s.lat}, ${s.lon})\">عرض المسار</button>`);
        });

        renderStations(stations);
      } catch (error) {
        console.error("فشل في جلب المحطات:", error);
        document.getElementById('stationList').innerHTML = "⚠️ حدث خطأ أثناء تحميل المحطات.";
      }
    }

    navigator.geolocation.getCurrentPosition(pos => {
      // userLat = pos.coords.latitude;
      // userLon = pos.coords.longitude;
      userLat = 13.594597039230123;
      userLon = 43.964329684811126;

      map = L.map('map').setView([userLat, userLon], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);

      L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup("📍 موقعك الحالي")
        .openPopup();

      loadStations();
    }, err => {
      alert("⚠️ يجب السماح بالوصول إلى الموقع لعرض المحطات القريبة.");
    });

    window.routeTo = routeTo;