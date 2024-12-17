// Label bulan
const labels = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Data penjualan
const data2022 = [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945];
const data2023 = [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689];

// Menggambar Chart
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Penjualan 2022',
                data: data2022,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Penjualan 2023',
                data: data2023,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Laporan Penjualan Bulanan Tahun 2022 dan 2023',
                font: { size: 18, weight: 'bold' },
                color: '#333'
            },
            legend: {
                labels: { font: { size: 14 }, color: '#555' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Penjualan'
                },
                ticks: {
                    callback: (value) => value.toLocaleString()
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Bulan'
                }
            }
        }
    }
});

// Mengisi Tabel Penjualan
const tableBody = document.getElementById('salesTableBody');
labels.forEach((bulan, index) => {
    const row = `
        <tr>
            <td>${bulan}</td>
            <td>${data2022[index].toLocaleString()}</td>
            <td>${data2023[index].toLocaleString()}</td>
        </tr>
    `;
    tableBody.innerHTML += row;
});
