// ✅ تصدير التقرير بصيغة PDF أو Word
function exportReport(format) {
    const station = document.getElementById('stationSelect').value;
    const reportType = document.getElementById('reportType').value;
    const dateRange = document.getElementById('dateRange').value;

    console.log(`Exporting ${format} report for station ${station}, type ${reportType}, date range ${dateRange}`);
    alert(`سيتم تصدير التقرير بصيغة ${format.toUpperCase()}`);
}

// ✅ تفعيل التقويم لاختيار الفترة
$(document).ready(function () {
    $('#dateRange').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: 'تطبيق',
            cancelLabel: 'إلغاء',
            customRangeLabel: 'مخصص',
            daysOfWeek: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
            monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        }
    });
});
