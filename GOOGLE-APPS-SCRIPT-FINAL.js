function doPost(e) {
  try {
    console.log('doPost called');
    console.log('e:', e);
    
    // Check if e is undefined (happens when running script directly)
    if (!e) {
      console.log('No event parameter - this is normal when running script directly');
      return ContentService
        .createTextOutput("doPost function called without event parameter. This is normal when testing.")
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    console.log('e.postData:', e.postData);
    console.log('e.parameters:', e.parameters);
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data;
    
    // Check if data is in postData (JSON format)
    if (e.postData && e.postData.contents) {
      console.log('Parsing JSON data from postData');
      data = JSON.parse(e.postData.contents);
    }
    // Check if data is in parameters (FormData format)
    else if (e.parameters && e.parameters.data) {
      console.log('Parsing FormData from parameters');
      data = JSON.parse(e.parameters.data[0]);
    }
    // Fallback: try to get data from parameters directly
    else if (e.parameters) {
      console.log('Using parameters directly');
      data = {
        name: e.parameters.name ? e.parameters.name[0] : '',
        phone: e.parameters.phone ? e.parameters.phone[0] : '',
        email: e.parameters.email ? e.parameters.email[0] : '',
        company: e.parameters.company ? e.parameters.company[0] : '',
        message: e.parameters.message ? e.parameters.message[0] : '',
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
      };
    }
    else {
      throw new Error('No data received in doPost');
    }
    
    console.log('Parsed data:', data);
    
    // Save data to sheet
    saveDataToSheet(sheet, data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'row': sheet.getLastRow(),
        'message': 'Data saved successfully via POST'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString(),
        'message': 'Failed to save data via POST'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    console.log('doGet called');
    console.log('e:', e);
    
    // Check if e is undefined (happens when running script directly)
    if (!e) {
      console.log('No event parameter - this is normal when running script directly');
      return ContentService
        .createTextOutput("doGet function called without event parameter. This is normal when testing.")
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    console.log('e.parameters:', e.parameters);
    
    // If no parameters, just return status
    if (!e.parameters || Object.keys(e.parameters).length === 0) {
      return ContentService
        .createTextOutput("Google Sheets API is running! Current time: " + new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }))
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data from URL parameters
    var data = {
      name: e.parameters.name ? e.parameters.name[0] : '',
      phone: e.parameters.phone ? e.parameters.phone[0] : '',
      email: e.parameters.email ? e.parameters.email[0] : '',
      company: e.parameters.company ? e.parameters.company[0] : '',
      message: e.parameters.message ? e.parameters.message[0] : '',
      timestamp: e.parameters.timestamp ? e.parameters.timestamp[0] : new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    };
    
    console.log('Parsed GET data:', data);
    
    // Only save if we have meaningful data (not just a status check)
    if (data.name || data.email || data.message) {
      // Save data to sheet
      saveDataToSheet(sheet, data);
      
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'success', 
          'row': sheet.getLastRow(),
          'message': 'Data saved successfully via GET'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Just a status check
      return ContentService
        .createTextOutput("Google Sheets API is running! Current time: " + new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }))
        .setMimeType(ContentService.MimeType.TEXT);
    }
      
  } catch(error) {
    console.error('Error in doGet:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString(),
        'message': 'Failed to save data via GET'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to save data to sheet
function saveDataToSheet(sheet, data) {
  console.log('Saving data to sheet:', data);
  
  // Create a new row with the data
  var row = [
    data.timestamp || new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.company || '',
    data.message || ''
  ];
  
  console.log('Row to append:', row);
  
  // Append the row to the sheet
  sheet.appendRow(row);
  
  console.log('Row appended successfully, new row number:', sheet.getLastRow());
}

// Test function to verify the script works
function testScript() {
  console.log('Testing script...');
  
  try {
    // Get the sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    console.log('Sheet name:', sheet.getName());
    
    // Test data
    var testData = {
      timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      name: 'Test User - ' + new Date().getTime(),
      phone: '081234567890',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test from the script'
    };
    
    console.log('Test data:', testData);
    
    // Save data to sheet
    saveDataToSheet(sheet, testData);
    console.log('Test row added successfully');
    
    return 'Test completed successfully - check your Google Sheet for the new row!';
    
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

// Function to test doPost with simulated data
function testDoPost() {
  console.log('Testing doPost with simulated data...');
  
  try {
    // Simulate a POST request with JSON data
    var mockEvent = {
      postData: {
        contents: JSON.stringify({
          name: 'Test POST User',
          phone: '081234567890',
          email: 'testpost@example.com',
          company: 'Test POST Company',
          message: 'This is a test POST request',
          timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        })
      }
    };
    
    var result = doPost(mockEvent);
    console.log('doPost test result:', result.getContent());
    return 'doPost test completed successfully!';
    
  } catch (error) {
    console.error('doPost test failed:', error);
    return 'doPost test failed: ' + error.toString();
  }
}

// Function to test doGet with simulated data
function testDoGet() {
  console.log('Testing doGet with simulated data...');
  
  try {
    // Simulate a GET request with URL parameters
    var mockEvent = {
      parameters: {
        name: ['Test GET User'],
        phone: ['081234567890'],
        email: ['testget@example.com'],
        company: ['Test GET Company'],
        message: ['This is a test GET request'],
        timestamp: [new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })]
      }
    };
    
    var result = doGet(mockEvent);
    console.log('doGet test result:', result.getContent());
    return 'doGet test completed successfully!';
    
  } catch (error) {
    console.error('doGet test failed:', error);
    return 'doGet test failed: ' + error.toString();
  }
}
