// Get the modal and button
const addStationButton = document.querySelector(".btn-success");
const addStationModal = new bootstrap.Modal(document.getElementById('addStationModal'));
function fet(){

fetch('navbar.html')
        .then(res => res.text())
        .then(data => document.getElementById('navbar').innerHTML = data);

    // إدراج التذييل
    fetch('footer.html')
        .then(res => res.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}
fet();
        // Open the modal when the button is clicked
addStationButton.addEventListener("click", () => {
    addStationModal.show();
});

// Handle form submission
document.getElementById("addStationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect the form data
    const stationName = document.getElementById("stationName").value;
    const stationAddress = document.getElementById("stationAddress").value;
    const fuelType = document.getElementById("fuelType").value;
    const fuelLevel = document.getElementById("fuelLevel").value;
    const fuelQuality = document.getElementById("fuelQuality").value;
    const stationStatus = document.getElementById("stationStatus").value;

    // You can send this data to the backend to store it (for now, just log it)
    console.log({
        stationName,
        stationAddress,
        fuelType,
        fuelLevel,
        fuelQuality,
        stationStatus
    });

    // Close the modal after submission
    addStationModal.hide();
});


// Example of edit button for a station
document.querySelectorAll('.btn-warning').forEach(button => {
    button.addEventListener("click", () => {
        // Populate the form with the station data for editing
        // Here you can replace the following with actual data fetching logic
        const stationData = {
            stationName: "محطة الطاقة",
            stationAddress: "الرياض",
            fuelType: "بنزين",
            fuelLevel: 75,
            fuelQuality: "جيد",
            stationStatus: "نشط"
        };

        // Set form values for editing
        document.getElementById("stationName").value = stationData.stationName;
        document.getElementById("stationAddress").value = stationData.stationAddress;
        document.getElementById("fuelType").value = stationData.fuelType;
        document.getElementById("fuelLevel").value = stationData.fuelLevel;
        document.getElementById("fuelQuality").value = stationData.fuelQuality;
        document.getElementById("stationStatus").value = stationData.stationStatus;

        // Show the modal for editing
        addStationModal.show();
    });
});


// لإظهار نموذج إضافة الموظف
const addUserButton = document.querySelector(".btn-success");
const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));

addUserButton.addEventListener("click", () => {
    addUserModal.show();
});

// Handle form submission
document.getElementById("addUserForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userRole = document.getElementById("userRole").value;
    const userStatus = document.getElementById("userStatus").value;

    console.log({
        userName,
        userEmail,
        userRole,
        userStatus
    });

    addUserModal.hide();
});


//حذف المحطة
document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener("click", () => {
        if (confirm("هل أنت متأكد من أنك تريد حذف هذه المحطة؟")) {
            button.closest("tr").remove();  // Remove the row
        }
    });
});



//حذف الموظف؟ 
document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener("click", () => {
        if (confirm("هل أنت متأكد من أنك تريد حذف هذا الموظف؟")) {
            button.closest("tr").remove();  // Remove the row
        }
    });
});