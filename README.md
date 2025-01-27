# TableAsCSVExtension

Small chrome extension that extracts the tables on a web page and saves them as CSV.
It is tailored to a specific page, so it removes the two first and the last column of the table, plus the last row, because these columns and rows contain info that we don't care about.

## Test it out

1. Clone this repository - or just download the code
1. In Chrome, under extensions `chrome://extensions/`
1. Switch to developer mode (toggle button in top right corner)
1. `Load unpacked` and select the folder for the extension... this should load the extension among your existing extensions
1. Go to the website with tables that you want to download as csv
1. Pin this extension by clicking extensions in the menubar, and pin "Stock table download"
1. Click the extension icon... this should download the tables as csv
