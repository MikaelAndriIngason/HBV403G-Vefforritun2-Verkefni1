document.addEventListener('DOMContentLoaded', function () {
    initialize();
});

function initialize() {
    const table = document.getElementById('sortedtable');
    const headers = table.querySelectorAll('th');
    const tableBody = table.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');

    // Geymir röðunaráttina
    const direction = [];

    const sortColumn = function (index) {
        // Nær í áttina
        const dir = direction[index] || 'asc';
        
        const multiplier = dir === 'asc' ? 1 : -1;
        const newRows = Array.from(rows);

        // Raðar röðunum
        newRows.sort(function (rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;
            const a = checkType(headers, index, cellA);
            const b = checkType(headers, index, cellB);

            if (a > b)
                return 1 * multiplier;
            else if (a < b)
                return -1 * multiplier;
            else if (a === b)
                return 0;
        });

        // Hreinsar allar raðinar
        [].forEach.call(rows, function (row) {
            tableBody.removeChild(row);
        });

        // Snýr áttinni við
        direction[index] = dir === 'asc' ? 'desc' : 'asc';

        // Bætir við röðuðu röðunum við
        newRows.forEach(function (newRow) {
            tableBody.appendChild(newRow);
        });
    };

    let s = 0;

    // Setur eventListener á alla dálkahausa til að sort-a og setja örvar
    [].forEach.call(headers, function (header, index) {
        if (headers[headers.length-1] !== header) {
            header.addEventListener('click', function () {
                sortColumn(index);
                clearAll(headers);
                if (s === 0) {
                    s = 1;
                    header.classList.add('asc');
                }
                else {
                    s = 0;
                    header.classList.add('desc');
                }
            });
        }
    });
}

// Ef dálkur er með tölur þá er hann breyttur frá tölum yfir í float, annars bara að skila
function checkType(headers, index, content) {
    const type = headers[index].getAttribute('data-type');

    if (type === 'number')
        return parseFloat(content);
    else 
        return content;
}

// Hreinsar alla klasa af table headers (örvarnar)
function clearAll(headers) {
    headers.forEach(e => {
        e.className = '';
    })
}