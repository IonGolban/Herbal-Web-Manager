// Funcție pentru descărcarea statisticilor în format CSV
async function downloadStats() {
    await fetch('/statistics/liked/download/pdf')
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Error fetching statistics');
            }
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'statistici_plante.pdf');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error(error);
        });
}

// Funcție pentru actualizarea datelor statistice pe pagină
function updateStats(likedPlantsCount, downloadedPlantsCount) {
    document.getElementById('liked-plants-count').textContent = `Total Plante Apreciate: ${likedPlantsCount}`;
    document.getElementById('downloaded-plants-count').textContent = `Total Plante Descărcate: ${downloadedPlantsCount}`;
}

// Obține statisticile inițiale la încărcarea paginii
const xhrStats = new XMLHttpRequest();
xhrStats.open('GET', '/get-stats', true);
xhrStats.onload = function () {
    if (xhrStats.status === 200) {
        const stats = JSON.parse(xhrStats.responseText);
        updateStats(stats.likedPlantsCount, stats.downloadedPlantsCount);
    }
};
xhrStats.send();

document.getElementById('download-btn').addEventListener('click', downloadStats);
