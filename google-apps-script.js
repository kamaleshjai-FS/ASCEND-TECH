/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — DIGITAL CRAFT PORTFOLIO CONTACT FORM INTEGRATION
 * ============================================================================
 * 
 * This script runs as a serverless Google Apps Script Web App attached to your
 * Google Sheet. It accepts form submissions from your React portfolio, validates
 * the incoming payload, performs basic spam protection, appends a new row to the
 * spreadsheet, and responds with a verified JSON response.
 * 
 * ----------------------------------------------------------------------------
 * STEP-BY-STEP SETUP INSTRUCTIONS:
 * ----------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a new blank spreadsheet.
 * 2. Name the spreadsheet (e.g. "Portfolio Inquiries 2025").
 * 3. In Row 1 (Header Row), add the following exact columns:
 *    - Cell A1: Timestamp
 *    - Cell B1: Name
 *    - Cell C1: Email
 *    - Cell D1: Project Type
 *    - Cell E1: Budget
 *    - Cell F1: Project Details
 * 
 * 4. In Google Sheets menu, click: "Extensions" > "Apps Script".
 * 5. Delete any existing code in the script editor and paste this entire file.
 * 6. (Optional) Customize the NOTIFICATION_EMAIL setting below if you want an
 *    instant email notification whenever an inquiry is submitted.
 * 7. Click "Save" (Disk icon or Ctrl+S).
 * 
 * ----------------------------------------------------------------------------
 * DEPLOYMENT AS A WEB APP:
 * ----------------------------------------------------------------------------
 * 8. In the top right corner of Apps Script, click: "Deploy" > "New deployment".
 * 9. Click the gear icon next to "Select type" and select: "Web app".
 * 10. Fill in the deployment configuration:
 *     - Description: "Portfolio Contact Form Endpoint"
 *     - Execute as: "Me" (your Google account)
 *     - Who has access: "Anyone" (crucial so your portfolio visitors can submit)
 * 11. Click "Deploy".
 * 12. Authorize the permissions when prompted by Google.
 * 13. Copy the "Web app URL" (it looks like:
 *     https://script.google.com/macros/s/AKfycb.../exec).
 * 14. Open `src/config.js` in your React project and paste the URL into:
 *     GOOGLE_SHEETS_CONFIG.scriptUrl
 * 
 * You're done! Test submitting the form from your portfolio.
 * ============================================================================
 */

// OPTIONAL: Enter your email address to receive an alert on new inquiries
// Set to null or "" if you do not want email alerts.
var NOTIFICATION_EMAIL = "";

/**
 * Handle POST requests from the portfolio contact form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // Parse incoming request payload (handles URL-encoded, FormData, and JSON)
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var name = (data.name || "").trim();
    var email = (data.email || "").trim();
    var projectType = (data.projectType || "").trim();
    var budget = (data.budget || "Not specified").trim();
    var details = (data.details || "").trim();

    // 1. Basic Spam & Bot Protection (Honeypot check)
    if (data._honeypot || data.website_url) {
      return createJsonResponse({
        status: "error",
        message: "Bot submission detected."
      });
    }

    // 2. Server-side Validation
    if (!name || !email || !projectType || !details) {
      return createJsonResponse({
        status: "error",
        message: "Missing required fields."
      });
    }

    // 3. Email Format Validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createJsonResponse({
        status: "error",
        message: "Invalid email address format."
      });
    }

    // 4. Ensure header row exists if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Project Type", "Budget", "Project Details"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#F2F0E8");
    }

    // 5. Append Inquiry Row
    sheet.appendRow([
      timestamp,
      name,
      email,
      projectType,
      budget,
      details
    ]);

    // 6. Optional Email Notification
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") !== -1) {
      try {
        var subject = "New Project Inquiry from " + name + " [" + projectType + "]";
        var body = "You received a new inquiry on your portfolio website:\n\n" +
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Project Type: " + projectType + "\n" +
          "Budget: " + budget + "\n\n" +
          "Details:\n" + details + "\n\n" +
          "Timestamp: " + timestamp;

        MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
      } catch (mailError) {
        Logger.log("Email notification error: " + mailError.toString());
      }
    }

    return createJsonResponse({
      status: "success",
      message: "Inquiry successfully recorded."
    });

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for connection health-check and JSONP fallback
 */
function doGet(e) {
  return createJsonResponse({
    status: "online",
    message: "Google Apps Script Web App is active and ready to accept inquiries."
  });
}

/**
 * Helper to build JSON responses with CORS headers
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
