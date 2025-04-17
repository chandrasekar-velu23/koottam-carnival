// Create a new Google Apps Script project at script.google.com
// Paste this code into the script editor:


function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet - replace with your actual Sheet ID
    const sheet = SpreadsheetApp.openById('1vXdflh5zAsYjaGioRM3QkC_HpESAMT4nNF48R0sb8s0').getActiveSheet();
    
    // Add a new row with the form data
    sheet.appendRow([
      new Date(),  // Timestamp
      data.name,
      data.email,
      data.phone,
      data.eventInterest
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// src/utils/sheetsApi.js
/**
 * This file contains functions to interact with Google Sheets via Google Apps Script
 * You'll need to deploy a Google Apps Script as a web app to use this functionality
 */

export const submitFormToGoogleSheets = async (formData) => {
    try {
      // Replace YOUR_DEPLOYMENT_ID with the actual ID from your deployed Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbyN9WJY-_XDHqNOMr_nDiXy8-ARsWxw17CsjCBbNKyMbgVkD4qeIfMp7gEUKW0nbMXecQ/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };
  
  // Google Apps Script Code to paste into script.google.com

  function doPost(e) {
    try {
      // Parse the incoming data
      const data = JSON.parse(e.postData.contents);
      
      // Open the Google Sheet - replace with your actual Sheet ID
      const sheet = SpreadsheetApp.openById('1vXdflh5zAsYjaGioRM3QkC_HpESAMT4nNF48R0sb8s0').getActiveSheet();
      
      // Add a new row with the form data
      sheet.appendRow([
        new Date(),  // Timestamp
        data.name,
        data.email,
        data.phone,
        data.eventInterest
      ]);
      
      // Return success response
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
      // Return error response
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function doGet() {
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
// After pasting this code:
// 1. Save the project
// 2. Deploy as web app
// 3. Set "Who has access" to "Anyone, even anonymous" 
// 4. Copy the deployment URL to use in your React app