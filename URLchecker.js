function urlcheck() {
    //get google sheets/tabs
    var d = new Date();
    var sheet1 = SpreadsheetApp.getActiveSpreadsheet();
    var statusresults_sheet=sheet1.getSheetByName("Sheet1");
    var statusresults_URLsheet=sheet1.getSheetByName("URLSheet2");
    var url = statusresults_URLsheet.getRange('A1').getValue();

    //clean up sheet first
    statusresults_sheet.getDataRange().clearContent();
    //append the row
    var status = retrievesattus(url);
    if (status == 200)
      statusresults_sheet.appendRow([url,status,d]);   
    else
    { 
      statusresults_sheet.appendRow([url,url + " is not responding",d]);   //routine to append check result to google
      MailApp.sendEmail("RECIEPIENT EMAIL HERE", url + " is down", url + " is down");  //routine to send email to myself
      MailApp.sendEmail("1{PHONE_NUMBER}@tmomail.net", url + " is down", url + " is down");  //routine to send text to myself, for example, 18889999999@tmomail.net for tmobile
      }
}

function retrievesattus(url) {
    var response = [];
    try {
        response=UrlFetchApp.fetch(url).getResponseCode();
        return response;
    } catch (error) {
        return error;
    }
}