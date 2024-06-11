function expandUrl(shortUrl) {
  try {
    var response = UrlFetchApp.fetch(shortUrl, {'followRedirects': false});
    if (response.getResponseCode() == 301 || response.getResponseCode() == 302) {
      var redirectedUrl = response.getHeaders()['Location'];
      return redirectedUrl;
    } else {
      return shortUrl; // Return the original URL if there's no redirection
    }
  } catch (e) {
    return "Error: " + e.message; // Return the error message if there's an issue
  }
}

function expandUrlsInSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange('D1:D'); // Adjust this to the range where your short URLs are
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    if (values[i][0]) {
      var shortUrl = values[i][0];
      var expandedUrl = expandUrl(shortUrl);
      sheet.getRange(i + 1, 4).setValue(expandedUrl); // Puts expanded URL in column B
    }
  }
}
