//   if (confirm("هذا التطبيق يحتاج للوصول إلى موقعك لعرض محطات الوقود القريبة. هل توافق؟")) {

//      // ثم طلب الموقع فعليًا
//     navigator.geolocation.getCurrentPosition(async position => {
//       // let userLocation = [13.594597039230123, 43.964329684811126];

//       const userLat = position.coords.latitude;
//       const userLon = position.coords.longitude;

//      const map = L.map('map').setView([userLat, userLon], 14);

    //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 18
    //   }).addTo(map);

    //   // رمز محطة الوقود
    //   const fuelIcon = L.icon({
    //     iconUrl: '../stationicon.png',
    //     iconSize: [32, 32],
    //     iconAnchor: [16, 32],
    //     popupAnchor: [0, -32]
    //   });


      // موقع المستخدم
    //   L.marker([userLat, userLon])
    //     .addTo(map)
    //     .bindPopup("📍 موقعك الحالي")
    //     .openPopup();


    //  const radius = 4000;
    //   const query = `
    //     [out:json];
    //     node["amenity"="fuel"](around:${radius},${userLat},${userLon});
    //     out body;
    //   `;

    //   try {
    //     const response = await fetch("https://overpass-api.de/api/interpreter", {
    //       method: "POST",
    //       body: query
    //     });


    // const data = await response.json();

    //     const stations = data.elements.map(e => ({
    //       name: e.tags.name || "⛽ محطة غير مسماة",
    //       lat: e.lat,
    //       lon: e.lon
    //     }));


    //  if (stations.length === 0) {
    //       alert("لا توجد محطات وقود قريبة.");
    //     }

    //  stations.forEach(station => {
    //       L.marker([station.lat, station.lon], { icon: fuelIcon })
    //         .addTo(map)
    //         .bindPopup(`${station.name}`);
    //     });

    //   } catch (error) {
    //     console.error("خطأ في جلب المحطات:", error);
    //     alert("حدث خطأ أثناء تحميل المحطات.");
    //   }

    //  }, error => {
    //   alert("⚠️ لم يتم السماح بالحصول على الموقع. لن يتم عرض المحطات القريبة.");
    // });

//   }else {
//     alert("❌ لن يتم عرض المحطات بدون السماح بتحديد الموقع.");
//   }


const stations = [
    { name: "محطة القبة", lat: 13.5766993, lon: 44.0003234, fuelPrices: { بنزين: 2.18, ديزل: 2.05, غاز: 0.90 }, congestion: "منخفض" },
    { name: "محطة 26", lat: 13.5757414, lon: 44.0047197, fuelPrices: { بنزين: 2.20, ديزل: 2.10, غاز: 0.95 }, congestion: "متوسط" },
    { name: "محطة الوفاء", lat: 13.5927369, lon: 43.9681122, fuelPrices: { بنزين: 2.15, ديزل: 2.00, غاز: 0.88 }, congestion: "مرتفع" }
];

const map = L.map('map').setView([24.7136, 46.6753], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let currentRoute;
let userLocation = [13.594597039230123, 43.964329684811126];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        userLocation = [position.coords.latitude, position.coords.longitude];
        map.setView(userLocation, 13);
    });
}

function getCongestionColor(level) {
    if (level === "منخفض") return "bg-success";
    if (level === "متوسط") return "bg-warning text-dark";
    if (level === "مرتفع") return "bg-danger";
    return "bg-secondary";
}

function renderStations() {
    const congestionValue = document.getElementById('congestionFilter').value;
    const fuelType = document.getElementById('fuelTypeFilter').value;
    const stationList = document.getElementById('stationList');

    stationList.innerHTML = '';

    const filtered = stations.filter(st => {
        if (congestionValue && st.congestion !== congestionValue) return false;
        if (fuelType) {
            return st.fuelPrices[fuelType] === Math.min(...stations.map(s => s.fuelPrices[fuelType]));
        }
        return true;
    });

    filtered.forEach(station => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-gas-pump text-primary"></i> ${station.name}</h5>
                    <p class="card-text">الازدحام: <span class="badge ${getCongestionColor(station.congestion)} badge-congestion">${station.congestion}</span></p>
                    <ul class="list-unstyled small">
                        <li>بنزين: ${station.fuelPrices.بنزين} ريال</li>
                        <li>ديزل: ${station.fuelPrices.ديزل} ريال</li>
                        <li>غاز: ${station.fuelPrices.غاز} ريال</li>
                    </ul>
                    <button class="btn btn-outline-primary btn-sm" onclick="showRoute(${station.lat}, ${station.lon})">
                        <i class="fas fa-route"></i> عرض الطريق
                    </button>
                </div>
            </div>
        `;
        stationList.appendChild(card);
    });
}

function formatRouteInstructions(instructions) {
    return instructions.map(instruction => `
        <div class="route-instruction">
            <div class="fw-bold">${instruction.text}</div>
            <div class="text-muted small">المسافة: ${Math.round(instruction.distance)} م</div>
        </div>
    `).join('');
}

function showRoute(lat, lon) {
    if (currentRoute) map.removeControl(currentRoute);

    currentRoute = L.Routing.control({
        // يتم إرسال طلب إلى محرك التوجيه  مع إحداثيات A و B.
        waypoints: [L.latLng(userLocation), L.latLng(lat, lon)],
        routeWhileDragging: false,
        show: false
    }).addTo(map);

    currentRoute.on('routesfound', function(e) {
        const instructions = e.routes[0].instructions;
        document.getElementById('routeInstructions').innerHTML = formatRouteInstructions(instructions);
        document.getElementById('routeSidebar').classList.add('active');
    });
}

function closeSidebar() {
    document.getElementById('routeSidebar').classList.remove('active');
}

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('routeSidebar');
    if (!sidebar.contains(event.target) && !event.target.closest('.btn-outline-primary')) {
        closeSidebar();
    }
});

document.getElementById('congestionFilter').addEventListener('change', renderStations);
document.getElementById('fuelTypeFilter').addEventListener('change', renderStations);

renderStations();
