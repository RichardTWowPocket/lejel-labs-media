# 📊 Google Sheets Integration Setup Guide

This guide will help you connect your contact form to Google Sheets so all form submissions are automatically saved to a spreadsheet.

---

## 📋 What You'll Get

- ✅ All form submissions automatically saved to Google Sheets
- ✅ Timestamp for each submission (Jakarta timezone)
- ✅ Organized data in columns (Name, Phone, Email, Company, Message, Timestamp)
- ✅ Real-time updates
- ✅ Easy to export or analyze data
- ✅ No third-party service needed (100% free!)

---

## 🚀 Setup Instructions (15 minutes)

### Step 1: Create a Google Sheet (2 minutes)

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Lejel Labs Media - Form Submissions"**
4. In Row 1, add these column headers:
   ```
   A1: Timestamp
   B1: Name
   C1: Phone
   D1: Email
   E1: Company
   F1: Message
   ```
5. Make the header row bold and add a background color (optional but nice!)
6. Copy the **Sheet ID** from the URL (you'll need it later)
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

---

### Step 2: Create Google Apps Script (5 minutes)

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. **Copy and paste** this entire script:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Create a new row with the data
    var row = [
      data.timestamp || new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.company || '',
      data.message || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Google Sheets API is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Click **Save** (disk icon) and name your project: **"Form to Sheets"**

---

### Step 3: Deploy the Script (5 minutes)

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** (⚙️) next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description**: "Form Submission Handler"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important!)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Form to Sheets (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** 
   - It looks like: `https://script.google.com/macros/s/LONG_ID_HERE/exec`
   - Save this URL - you'll need it in the next step!

---

### Step 4: Add URL to Your Project (2 minutes)

1. In your project root, create a file named **`.env.local`** (if it doesn't exist)
2. Add this line with your actual URL:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
   ```
3. **Replace `YOUR_ACTUAL_ID`** with the ID from Step 3
4. Save the file

---

### Step 5: Restart Your Dev Server (1 minute)

1. Stop your development server (Ctrl+C or Cmd+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. The environment variable will now be loaded!

---

### Step 6: Test the Integration (2 minutes)

1. Open your website in the browser
2. Scroll to the **"Kirim Pesan"** form
3. Fill in all fields:
   - **Name**: Test User
   - **Phone**: 081234567890
   - **Email**: test@example.com
   - **Company**: Test Company
   - **Message**: This is a test submission
4. Click **"Kirim Pesan"**
5. You should see a success message: **"Terima kasih! Pesan Anda telah terkirim..."**
6. Check your Google Sheet - a new row should appear with the test data!
7. If it works, delete the test row and you're done! 🎉

---

## ✅ Verification Checklist

Make sure you've completed all these steps:

- [ ] Created Google Sheet with proper headers
- [ ] Created Google Apps Script
- [ ] Deployed script as Web App
- [ ] Set "Who has access" to **Anyone**
- [ ] Copied the Web App URL
- [ ] Added URL to `.env.local` file
- [ ] Restarted dev server
- [ ] Tested form submission
- [ ] Saw data appear in Google Sheet

---

## 🔧 Troubleshooting

### Problem: "Konfigurasi Google Sheets belum diatur"

**Solution**: 
- Make sure `.env.local` file exists in project root
- Check that the variable name is exactly: `NEXT_PUBLIC_GOOGLE_SHEETS_URL`
- Restart your dev server

---

### Problem: Form submits but no data in Google Sheet

**Solution**:
1. Check that "Who has access" is set to **Anyone** in deployment settings
2. Re-deploy the script:
   - Go to Apps Script → Deploy → Manage deployments
   - Click Edit (pencil icon)
   - Change version to "New version"
   - Click Deploy
   - Update the URL in `.env.local`

---

### Problem: "Script authorization required"

**Solution**:
1. The first time you deploy, you need to authorize
2. Click **Advanced** → **Go to [Project Name] (unsafe)**
3. Click **Allow**
4. This is safe - it's your own script!

---

### Problem: Getting errors in the console

**Solution**:
1. Open Apps Script → **Executions** (clock icon in left sidebar)
2. Check recent executions for error messages
3. Common fixes:
   - Make sure column headers match exactly
   - Check that the sheet is the first/active sheet
   - Verify the script code is pasted correctly

---

## 📊 Viewing Your Data

### In Google Sheets:

1. Open your spreadsheet
2. All submissions appear as new rows
3. Sort by timestamp to see latest first
4. Use filters to find specific submissions
5. Create charts to visualize data

### Download/Export:

- **Excel**: File → Download → Microsoft Excel (.xlsx)
- **CSV**: File → Download → Comma-separated values (.csv)
- **PDF**: File → Download → PDF Document

---

## 🎨 Customize Your Sheet (Optional)

### Add Data Validation:

1. Select Email column (D)
2. Data → Data validation
3. Criteria: Text contains "@"
4. This highlights invalid emails

### Add Conditional Formatting:

1. Select Timestamp column (A)
2. Format → Conditional formatting
3. Color code by date (newest = green, older = yellow)

### Create a Dashboard:

1. Insert → Chart
2. Chart type: Line chart
3. Data range: Timestamp column
4. Shows submissions over time

---

## 🔄 Updating the Script

If you need to modify the script later:

1. Go to Apps Script editor
2. Make your changes
3. Save the script
4. Deploy → Manage deployments
5. Click Edit (pencil icon)
6. New version
7. Click Deploy
8. No need to update `.env.local` - URL stays the same!

---

## 🔐 Security & Privacy

### Is this secure?

✅ **Yes!** Here's why:
- The script runs under YOUR Google account
- Only you can access the spreadsheet
- Data goes directly from your website to YOUR Google Sheet
- No third-party service has access
- HTTPS encryption for all data transfers

### Who can see the data?

- Only people you share the Google Sheet with
- By default, only YOU can see it
- You control all permissions

### GDPR Compliance:

- Add a privacy policy to your website
- Inform users their data will be stored
- Add a checkbox: "I agree to the privacy policy"
- You can delete data anytime from the sheet

---

## 📧 Email Notifications (Bonus Feature)

Want to get emailed when someone submits the form?

### Method 1: Google Sheets Built-in Notification

1. In Google Sheets: Tools → Notification rules
2. Notify me when: **Any changes are made**
3. Email: **Right away**
4. Save

### Method 2: Apps Script Email (More Detailed)

Add this to your `doPost` function (after `sheet.appendRow(row);`):

```javascript
// Send email notification
MailApp.sendEmail({
  to: "your-email@example.com", // Replace with your email
  subject: "New Form Submission - Lejel Labs Media",
  htmlBody: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Message:</strong> ${data.message}</p>
    <p><strong>Time:</strong> ${data.timestamp}</p>
  `
});
```

Save and redeploy!

---

## 📱 Mobile Access

Access your form submissions on mobile:

1. Download **Google Sheets** app (iOS/Android)
2. Sign in with your Google account
3. Open your spreadsheet
4. View/edit submissions anywhere!

---

## 🔗 Integration with Other Tools

### Export to CRM:

1. Download as CSV
2. Import to your CRM (Salesforce, HubSpot, etc.)

### Connect to Google Data Studio:

1. Create a Data Studio report
2. Data source: Google Sheets
3. Create beautiful dashboards

### Zapier Integration:

1. Create a Zapier account
2. Trigger: New row in Google Sheets
3. Action: Send to Slack, Email, CRM, etc.

---

## 🎯 Best Practices

1. **Regular Backups**: Download your data monthly
2. **Clean Data**: Remove test submissions
3. **Archive Old Data**: Move old rows to another sheet
4. **Monitor**: Check for spam/fake submissions
5. **Respond Fast**: Set up notifications for quick response

---

## 🆘 Getting Help

### Can't figure it out?

1. Check the Troubleshooting section above
2. Google Apps Script Documentation: https://developers.google.com/apps-script
3. Stack Overflow: Search "Google Apps Script web app"

### Still stuck?

- Double-check each step carefully
- Try creating a fresh sheet and script
- Make sure you're using the exact code provided

---

## 🎉 Success!

Once set up, your contact form will automatically:
- ✅ Save all submissions to Google Sheets
- ✅ Show success/error messages to users
- ✅ Clear the form after successful submission
- ✅ Organize data in neat columns
- ✅ Timestamp each submission

You can now focus on responding to leads instead of managing data! 🚀

---

## 📝 Quick Reference

**Google Sheet Setup:**
```
Column A: Timestamp
Column B: Name
Column C: Phone
Column D: Email
Column E: Company
Column F: Message
```

**Environment Variable:**
```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

**Test Data:**
- Name: Test User
- Phone: 081234567890
- Email: test@example.com
- Company: Test Company
- Message: This is a test

---

Need to add more features? You can customize the Apps Script to:
- Send auto-reply emails
- Add data to multiple sheets
- Validate data before saving
- Send data to other services
- Create automatic backups

Happy form collecting! 📊✨

