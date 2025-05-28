// ✅ رسم مخطط توزيع أنواع الوقود (دائري)
const fuelTypeChart = new Chart(document.getElementById("fuelTypeChart"), {
    type: 'doughnut',
    data: {
        labels: ["بنزين", "ديزل", "غاز"],
        datasets: [{
            data: [60, 25, 15],
            backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
        }]
    },
    options: {
        responsive: true,
        
        plugins: {
            title: {
                display: true,
                text: 'توزيع أنواع الوقود'
            }
        }
    }
});

// ✅ رسم مخطط مستوى الوقود في المحطات (عمودي)
const fuelLevelChart = new Chart(document.getElementById("fuelLevelChart"), {
    type: 'bar',
    data: {
        labels: ["محطة الوفاء", "محطة 26", "محطة القبة"],
        datasets: [{
            label: 'مستوى الوقود (%)',
            data: [75, 50, 60],
            backgroundColor: '#0d6efd'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'مستوى الوقود في المحطات'
            }
        }
    }
});
