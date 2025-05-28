document.addEventListener("DOMContentLoaded", function () {
    // البحث
    document.getElementById("userSearch").addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#usersTable tbody tr");

        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            row.style.display = (name.includes(filter) || email.includes(filter)) ? "" : "none";
        });
    });

    // إظهار المودال
    const addUserButton = document.getElementById("openAddUserModal");
    const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));

    addUserButton.addEventListener("click", () => {
        addUserModal.show();
    });

    // معالجة الإضافة
    document.getElementById("addUserForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("userName").value;
        const email = document.getElementById("userEmail").value;
        const role = document.getElementById("userRole").value;
        const status = document.getElementById("userStatus").value;

        const tbody = document.querySelector("#usersTable tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td>${status}</td>
            <td>
                <button class="btn btn-warning btn-sm">تعديل</button>
                <button class="btn btn-danger btn-sm">حذف</button>
            </td>
        `;
        tbody.appendChild(row);

        // إغلاق المودال
        addUserModal.hide();

        // إعادة تعيين النموذج
        this.reset();
    });
});