# TOPSIS Web Service

A web-based implementation of TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) with email delivery.

## 🌐 Live Demo

Visit: https://github.com/HaryiankKumra/TOPSIS

## Features

- ✅ Upload CSV files for TOPSIS analysis
- ✅ Input weights and impacts
- ✅ Receive results via email
- ✅ Real-time validation
- ✅ Beautiful responsive UI
- ✅ No backend required (runs on GitHub Pages)

## How to Use

1. **Prepare Your CSV File**
   - First column: Option names
   - Remaining columns: Numeric criteria values
   - Example:
     ```csv
     Model,Price,Storage,Camera,Battery
     P1,250,64,12,4000
     P2,200,32,8,3500
     P3,300,128,16,4500
     ```

2. **Upload and Fill Form**
   - Upload your CSV file
   - Enter weights (comma-separated, e.g., `1,1,1,2`)
   - Enter impacts (comma-separated + or -, e.g., `-,+,+,+`)
   - Enter your email address

3. **Submit**
   - Click "Calculate TOPSIS & Send Results"
   - Results will be sent to your email

## Setup for GitHub Pages

### Step 1: Set Up EmailJS

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}` - Recipient email
   - `{{user_email}}` - User's email
   - `{{weights}}` - Weights used
   - `{{impacts}}` - Impacts used
   - `{{result_data}}` - CSV results
   
4. Get your credentials:
   - Public Key (User ID)
   - Service ID
   - Template ID

### Step 2: Configure the Website

Edit `website/main.js` and replace:
- `YOUR_PUBLIC_KEY` with your EmailJS Public Key
- `YOUR_SERVICE_ID` with your EmailJS Service ID
- `YOUR_TEMPLATE_ID` with your EmailJS Template ID

### Step 3: Deploy to GitHub Pages

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TOPSIS Web Service"
   git branch -M main
   git remote add origin https://github.com/YourUsername/topsis-web.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save

3. **Access Your Website**
   - URL will be: `https://yourusername.github.io/topsis-web/`

## Email Template Example

Create this template in EmailJS:

```
Subject: TOPSIS Analysis Results

Hello,

Your TOPSIS analysis is complete!

Analysis Parameters:
- Weights: {{weights}}
- Impacts: {{impacts}}

Results (CSV Format):
{{result_data}}

You can copy the results above and save them as a CSV file.

Best regards,
TOPSIS Web Service
```

## Validation Rules

- ✓ CSV must have at least 3 columns (1 name + 2 criteria)
- ✓ All criteria values must be numeric
- ✓ Weights must be comma-separated numbers
- ✓ Impacts must be comma-separated + or -
- ✓ Number of weights must equal number of criteria
- ✓ Number of impacts must equal number of criteria
- ✓ Email format must be valid

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- EmailJS API

## File Structure

```
topsis-web/
├── index.html          # Main entry point
├── website/
│   ├── topsis.js      # TOPSIS calculation logic
│   └── main.js        # Form handling & email integration
└── README.md          # This file
```

## Local Testing

1. Open `index.html` in a web browser
2. Test with sample CSV files
3. Make sure EmailJS is configured correctly

## Troubleshooting

**Email not sending?**
- Verify EmailJS credentials in `main.js`
- Check EmailJS dashboard for quota limits
- Ensure email template is set up correctly

**CSV parsing errors?**
- Check CSV format (comma-separated)
- Ensure all criteria columns contain only numbers
- Verify at least 3 columns exist

**Validation errors?**
- Ensure weights/impacts count matches criteria count
- Check that impacts contain only + or -
- Verify email format is correct

## License

MIT License

## Author

Haryiank Kumra

## Support

For issues, please open a GitHub issue or contact haryiank@gmail.com
