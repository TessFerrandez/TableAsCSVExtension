function download_csvs() {
    function download_csv_file(csv_data, filename) {
        let csv_file = new Blob([csv_data], { type: 'text/csv' });
        let url = URL.createObjectURL(csv_file);
        let temp_link = document.createElement('a');
        temp_link.download = filename;
        temp_link.href = url;
        temp_link.style.display = 'none';
        document.body.appendChild(temp_link);
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    document.querySelectorAll('table').forEach(table => {
        let csv_data = [];
        let table_name = 'table';
        let header = true;
        let date_now = new Date().toISOString().split('.')[0].replace(/[^\d]/gi,'');
        table.querySelectorAll('tr').forEach(tr => {
            if (table.querySelector('caption')) {
                table_name = table.querySelector('caption').innerText
            }
            let csv_row = [];
            let owns = false;
            tr.querySelectorAll('td, th').forEach(td => {
                let text = td.innerText;
                if (text.includes('\nDu äger det här värdepappret')) {
                    owns = true;
                    text = text.replace('\nDu äger det här värdepappret', '');
                }
                if (text.includes('saknas')) {
                    text = '';
                }
                text = text.replace(',', '.');
                csv_row.push(text);
            });
            // skip first two columns and the last (markera, sälj/köp and verktyg)
            csv_row = csv_row.slice(2, -1);
            if (header) {
                header = false;
                csv_row.push('Owns');
            }
            else {
                csv_row.push(owns ? 'YES' : 'NO');
            }
            csv_data.push(csv_row.join(','));
        });
        csv_data = csv_data.slice(0, -1).join('\n');
        download_csv_file(csv_data, table_name + '-' + date_now + '.csv');
    });
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: download_csvs
        });
    }
});