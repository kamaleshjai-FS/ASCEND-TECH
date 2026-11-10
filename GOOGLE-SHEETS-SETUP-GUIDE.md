# GOOGLE SHEETS & APPS SCRIPT INTEGRATION GUIDE
================================================================================
Follow this simple, step-by-step guide to connect your contact form to a free Google Sheet. Whenever a visitor submits an inquiry on your portfolio, it will be automatically recorded in your Google Sheet in real-time.

---

## PART 1: CREATE THE GOOGLE SHEET

1. Open your web browser and go to:
   👉 **https://sheets.new** (or open Google Drive and create a Blank Spreadsheet).
2. Rename the spreadsheet at the top left to:
   **Portfolio Client Inquiries**
3. In **Row 1**, type these exact column headers across columns A through F:

| Column | Header Name |
|--------|-------------|
| **A1** | `Timestamp` |
| **B1** | `Name` |
| **C1** | `Email` |
| **D1** | `Project Scope` |
| **E1** | `Budget Tier` |
| **F1** | `Project Details` |

*(Tip: You can make Row 1 bold and freeze it: View -> Freeze -> 1 row)*

---

## PART 2: ADD THE GOOGLE APPS SCRIPT CODE

1. In your Google Sheet, click the top menu:
   **Extensions** ➔ **Apps Script**
2. A new tab will open with a code editor.
3. Delete any default code inside `Code.gs` (e.g., `function myFunction() { ... }`).
4. Copy and paste the complete script below into `Code.gs`:

```javascript
/**
 * DIGITAL CRAFT PORTFOLIO — CONTACT FORM HANDLER
 * Handles incoming POST requests and records submissions to Google Sheets.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds to prevent concurrent write collisions

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Extract parameters from form submission (supports URLSearchParams & FormData)
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var name = e.parameter.name || 'Anonymous';
    var email = e.parameter.email || 'No Email';
    var projectType = e.parameter.projectType || 'General Inquiry';
    var budget = e.parameter.budget || 'Not specified';
    var details = e.parameter.details || '';

    // Append the inquiry as a new row in your sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      projectType,
      budget,
      details
    ]);

    // Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'Portfolio Google Sheets API is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click the **Save** icon (disk icon) or press `Ctrl + S`.

---

## PART 3: DEPLOY AS A WEB APP (CRITICAL STEP)

1. At the top right of the Apps Script window, click the blue **Deploy** button.
2. Select **New deployment**.
3. In the dialog that appears, click the **gear icon (⚙️)** next to "Select type" and choose:
   👉 **Web app**
4. Configure the 3 fields exactly as follows:
   - **Description**: `Portfolio Contact Form API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: 👉 **Anyone** 👈 *(DO NOT choose 'Only myself' or submissions will be blocked!)*
5. Click **Deploy**.
6. Google will ask you to **Authorize access**:
   - Click **Authorize access**.
   - Choose your Google account.
   - You might see a screen saying *"Google hasn’t verified this app"*. Click **Advanced** at the bottom left.
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
7. Google will now display your live **Web app URL**. It looks like this:
   `https://script.google.com/macros/s/AKfycbx.../exec`
8. Click **Copy** to copy this URL.

---

## PART 4: PASTE THE URL IN YOUR CODE

1. Open this file in your project:
   📁 **`src/config.js`**
2. Locate lines 51–56:

```javascript
export const GOOGLE_SHEETS_CONFIG = {
  scriptUrl: "https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_REPLACE_WITH_YOUR_ACTUAL_WEB_APP_URL/exec",
  isConfigured: function () {
    return this.scriptUrl && !this.scriptUrl.includes("PLACEHOLDER");
  }
};
```

3. Replace the placeholder URL with your copied URL:

```javascript
export const GOOGLE_SHEETS_CONFIG = {
  scriptUrl: "https://script.google.com/macros/s/AKfycbxYOUR_ACTUAL_DEPLOYED_URL_HERE/exec",
  isConfigured: function () {
    return this.scriptUrl && !this.scriptUrl.includes("PLACEHOLDER");
  }
};
```

4. Save the file.
5. That's it! The contact form will automatically recognize the live URL, exit Demo Mode, and submit real leads directly into your Google Sheet!
