# Build & Run Guide - Nibedita Institute Website

## Prerequisites

1. **MongoDB Atlas Setup** (Required for Payload CMS)
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (M0 Free tier)
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Update `.env.local`:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nibedita
     ```
   - **IMPORTANT**: Replace `<username>`, `<password>`, and the cluster URL with your actual values

2. **Generate Payload Secret**
   ```bash
   # Run this command to generate a random 32-character string:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Update `.env.local` with the generated string:
   ```
   PAYLOAD_SECRET=your-generated-secret-here
   ```

## Quick Start

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start development server
npm run dev
```

## First Time Setup

### Step 1: Access the Admin Panel

1. Open your browser to `http://localhost:3000/admin`
2. You'll see the "Create First User" screen
3. Fill in:
   - Email: `admin@nibedita.in`
   - Password: Choose a secure password (save it!)
   - Name: `Admin User`
   - Role: `admin`
4. Click "Create"

### Step 2: Add Sample Data

#### Create a Banner
1. Go to **Banners** collection
2. Click **Create New**
3. Fill in:
   - Headline: `Admissions Open 2026 — Secure Your Future`
   - Subheadline: `Expert guidance for Nursing, Engineering, Pharmacy, MBA & 100+ more courses`
   - CTA Text: `Apply Now`
   - CTA Link: `/admission`
   - Active: ✅ Checked
   - Order: `0`
4. Save

#### Create Sample Courses

Create at least 2 courses (more if you want):

**Course 1: B.Sc Nursing**
- Name: `B.Sc Nursing`
- Category: `nursing`
- Short Description: `4-year undergraduate degree program in Nursing`
- Duration: `4 Years`
- Featured: ✅ Checked
- Order: `1`

**Course 2: B.Tech CSE**
- Name: `B.Tech Computer Science & Engineering`
- Category: `btech`
- Short Description: `4-year undergraduate engineering program`
- Duration: `4 Years`
- Featured: ✅ Checked
- Order: `2`

Add more courses following the same pattern for other categories.

#### Create Testimonials

**Testimonial 1:**
- Student Name: `Priya Sharma`
- Course: `B.Sc Nursing 2024`
- Quote: `Nibedita Institute guided me through the entire admission process. I got into my dream college without any stress.`
- Rating: `5`
- Featured: ✅ Checked

**Testimonial 2:**
- Student Name: `Rahul Das`
- Course: `B.Tech CSE 2023`
- Quote: `The counsellors here are very knowledgeable. They helped me choose the best college within my budget.`
- Rating: `5`
- Featured: ✅ Checked

#### Create Blog Posts

**Blog Post 1:**
- Title: `Career After 12th: Top Options for Science Students in 2026`
- Slug: `career-after-12th-science-students-2026`
- Excerpt: `Confused about what to do after 12th? Here's a comprehensive guide to the best career options for science students in 2026.`
- Content: (Add some rich text content)
- Tags: Add tag `career`
- Published At: (Select current date/time)
- Status: `published`

**Blog Post 2:**
- Title: `Complete Guide to B.Sc Nursing Admission in West Bengal`
- Slug: `bsc-nursing-admission-west-bengal-guide`
- Excerpt: `Everything you need to know about B.Sc Nursing admission process, eligibility, colleges, and career prospects in West Bengal.`
- Content: (Add some rich text content)
- Tags: Add tag `nursing`
- Published At: (Select current date/time)
- Status: `published`

## Testing the Website

### Test the Enquiry Form

1. Go to homepage: `http://localhost:3000`
2. Scroll down to the enquiry form
3. Fill in:
   - Name: `Test User`
   - Phone: `9876543210`
   - Email: `test@example.com`
   - Course: Select any course
   - Message: `I want to know more`
4. Click "Submit Enquiry"
5. You should see a success message
6. Check the admin panel → **Enquiries** collection
7. You should see the new enquiry

### Test All Routes

Visit these URLs to ensure they work:

**Main Pages:**
- Home: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

**Course Pages (need to be built):**
- Courses Hub: `http://localhost:3000/courses`
- Nursing: `http://localhost:3000/courses/nursing`
- Pharmacy: `http://localhost:3000/courses/pharmacy`
- B.Tech: `http://localhost:3000/courses/btech`
- Diploma: `http://localhost:3000/courses/diploma`
- Management: `http://localhost:3000/courses/management`
- Education: `http://localhost:3000/courses/education`
- General Degree: `http://localhost:3000/courses/general-degree`
- Others: `http://localhost:3000/courses/others`

**Other Pages (need to be built):**
- About: `http://localhost:3000/about`
- Services: `http://localhost:3000/services`
- Admission: `http://localhost:3000/admission`
- Student Corner: `http://localhost:3000/student-corner`
- Blog: `http://localhost:3000/blog`
- Contact: `http://localhost:3000/contact`
- Privacy Policy: `http://localhost:3000/privacy-policy`
- Terms: `http://localhost:3000/terms-and-conditions`
- Disclaimer: `http://localhost:3000/disclaimer`

## Current Status

✅ **Completed:**
- Core infrastructure and configuration
- Payload CMS setup with all 7 collections
- UI components (Button, Badge, Card, Input)
- Layout components (Navbar, Footer, WhatsApp Button)
- Site layout with SEO
- API routes for enquiries and Payload
- EnquiryForm component
- Basic Home page

🔨 **Remaining Work:**
- Complete home page with all 10 sections
- All content pages (About, Services, Admission, Student Corner, Contact, Legal)
- Courses hub and 8 course sub-pages
- Blog listing and post pages
- Various smaller components

See `PROJECT_STATUS.md` for detailed breakdown and instructions.

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Check your MongoDB URI in `.env.local`
- Ensure your IP address is whitelisted in MongoDB Atlas
- Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

### Issue: Payload Admin Not Loading
**Solution:**
- Clear browser cache
- Check console for errors
- Ensure `PAYLOAD_SECRET` is set in `.env.local`
- Restart dev server

### Issue: Build Errors
**Solution:**
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check for TypeScript errors with `npm run build`

### Issue: Images Not Uploading
**Solution:**
- Ensure `media` folder exists in project root
- Check folder permissions
- Try smaller image files (< 5MB)

## Email Configuration (Optional)

To enable email notifications when enquiries are submitted:

1. Sign up for Resend at [resend.com](https://resend.com)
2. Get your API key
3. Update `.env.local`:
   ```
   RESEND_API_KEY=re_your_actual_api_key
   RESEND_FROM_EMAIL=enquiry@nibedita.in  # or your verified domain
   RESEND_TO_EMAIL=director@nibedita.in    # where to receive enquiries
   ```

**Note:** Enquiries will still be saved to the database even without email configuration.

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL` (your production URL)
   - `RESEND_API_KEY` (optional)
   - `RESEND_FROM_EMAIL` (optional)
   - `RESEND_TO_EMAIL` (optional)
   - `NEXT_PUBLIC_GA_ID` (optional)
   - `NEXT_PUBLIC_PHONE`
5. Deploy

## Development Workflow

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Payload types
npm run generate:types

# Lint code
npm run lint
```

## Next Steps

1. Set up MongoDB Atlas and update `.env.local`
2. Generate and set `PAYLOAD_SECRET`
3. Run `npm run dev`
4. Access `/admin` and create first user
5. Add sample data (banners, courses, testimonials, blog posts)
6. Test enquiry form
7. Start building remaining pages (see `PROJECT_STATUS.md`)

---

**Need Help?**
- Check `PROJECT_STATUS.md` for detailed component specs
- Check `CLAUDE.md` for complete original specification
- Review completed components in `/components` for reference patterns
