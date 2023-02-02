document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('sortedtable');
    const headers = table.querySelectorAll('th');
    const tableBody = table.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');

    // Track sort directions
    const directions = Array.from(headers).map(function () {
        return '';
    });

    // Transform the content of given cell in given column
    const transform = function (index, content) {
        // Get the data type of column
        const type = headers[index].getAttribute('data-type');
        switch (type) {
            case 'number':
                return parseFloat(content);
            case 'string':
            default:
                return content;
        }
    };

    const sortColumn = function (index) {
        // Get the current direction
        const direction = directions[index] || 'asc';

        // A factor based on the direction
        const multiplier = direction === 'asc' ? 1 : -1;

        const newRows = Array.from(rows);

        newRows.sort(function (rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;

            const a = transform(index, cellA);
            const b = transform(index, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiplier;
                case a < b:
                    return -1 * multiplier;
                case a === b:
                    return 0;
            }
        });

        // Remove old rows
        [].forEach.call(rows, function (row) {
            tableBody.removeChild(row);
        });

        // Reverse the direction
        directions[index] = direction === 'asc' ? 'desc' : 'asc';

        // Append new row
        newRows.forEach(function (newRow) {
            tableBody.appendChild(newRow);
        });
    };

    let s = 0;

    [].forEach.call(headers, function (header, index) {
        if (headers[headers.length-1] !== header) {
            header.addEventListener('click', function () {
                sortColumn(index);
                clearAll();
                if (s === 0) {
                    s = 1;
                    header.classList.add('asc');
                }
                else {
                    header.classList.add('desc');
                    s = 0;
                }
            });
        }
    });

    const clearAll = function() {
        headers.forEach(e => {
            e.className = '';
        })
    }
});