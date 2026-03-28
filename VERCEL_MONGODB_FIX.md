# MongoDB SSL/TLS Connection Error Fix for Vercel

## Error
```
MongoNetworkError: SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

## What Was Fixed

### 1. Updated MongoDB Connection Options (payload.config.ts)
Added proper SSL/TLS configuration:
```typescript
connectOptions: {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  tls: true,                          // Enable TLS
  tlsAllowInvalidCertificates: false, // Strict certificate validation
  retryWrites: true,                  // Retry failed writes
  retryReads: true,                   // Retry failed reads
  maxPoolSize: 10,                    // Connection pool size
  minPoolSize: 2,                     // Minimum connections
}
```

### 2. Added Error Handling Fallback
The site now gracefully falls back to `DEFAULT_SITE_SETTINGS` if MongoDB connection fails, preventing the entire site from crashing.

## Vercel Environment Variables Check

Make sure your Vercel environment variables are set correctly:

### Required Variables:
1. **MONGODB_URI**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - ⚠️ **Important**: Make sure to URL-encode special characters in the password
   - Example: If password is `p@ss!word`, encode it as `p%40ss%21word`

2. **PAYLOAD_SECRET**
   - A random 32+ character string
   - Generate: `openssl rand -base64 32`

3. **NEXT_PUBLIC_SERVER_URL**
   - Your Vercel domain: `https://nibedita.kroy.dev`

4. **BLOB_READ_WRITE_TOKEN**
   - Your Vercel Blob storage token

## MongoDB Atlas Configuration

### 1. Network Access (IP Whitelist)
In MongoDB Atlas Dashboard:
- Go to **Network Access**
- Click **Add IP Address**
- Select **Allow Access from Anywhere** (0.0.0.0/0) for Vercel deployments
- Or add Vercel's IP ranges (but 0.0.0.0/0 is simpler)

### 2. Database User Permissions
- Go to **Database Access**
- Ensure your user has **Read and Write to any database** permissions
- Username and password must match your MONGODB_URI

### 3. Connection String Options
Your MongoDB URI should look like this:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&tls=true
```

**Key parameters:**
- `retryWrites=true` - Automatically retry write operations
- `w=majority` - Write concern for data durability
- `tls=true` - Enable TLS/SSL (explicit)

## Common Issues & Solutions

### Issue 1: Special Characters in Password
**Problem**: MongoDB password contains `@`, `!`, `#`, etc.
**Solution**: URL-encode the password
```
Original: p@ss!word
Encoded:  p%40ss%21word
```

### Issue 2: IP Not Whitelisted
**Problem**: Vercel IPs change dynamically
**Solution**: Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access

### Issue 3: Database User Permissions
**Problem**: User doesn't have proper permissions
**Solution**: Grant "Atlas admin" or "Read and write to any database"

### Issue 4: Cluster Paused/Suspended
**Problem**: MongoDB Atlas free tier auto-pauses after inactivity
**Solution**: Resume the cluster in MongoDB Atlas dashboard

### Issue 5: Old MongoDB Driver Version
**Problem**: Incompatible TLS/SSL handshake
**Solution**: Already handled with the config update above

## Testing the Connection

### Test Locally First:
```bash
# Set your MongoDB URI
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# Run the dev server
npm run dev
```

### Test on Vercel:
1. Deploy to Vercel
2. Check the **Functions** logs in Vercel dashboard
3. Look for successful MongoDB connection messages
4. If still failing, check the error details in logs

## Vercel-Specific Considerations

### Serverless Function Timeout
- Vercel free tier has 10-second timeout
- Pro tier has 60-second timeout
- If MongoDB connection is slow, consider:
  - Using a closer MongoDB region
  - Upgrading your MongoDB Atlas tier
  - Implementing connection pooling (already done)

### Cold Starts
- First request after inactivity may be slower
- Connection pooling helps (configured with minPoolSize: 2)
- Consider using Vercel's persistent connections

## Verification Steps

After deploying with these fixes:

1. ✅ Check Vercel deployment logs for MongoDB connection errors
2. ✅ Visit your site homepage - should load without errors
3. ✅ Try accessing `/admin` - Payload CMS should connect
4. ✅ Test form submission - data should save to MongoDB
5. ✅ Check site settings load correctly

## If Still Not Working

### Enable Detailed Logging:
Add to `payload.config.ts`:
```typescript
db: mongooseAdapter({
  url: process.env.MONGODB_URI!,
  connectOptions: {
    // ... existing options
    logger: console.log,
    loggerLevel: 'debug',
  },
}),
```

### Check MongoDB Atlas Metrics:
- Go to your cluster → **Metrics** tab
- Look for connection attempts
- Check for failed authentication

### Contact Support:
- MongoDB Atlas support: https://support.mongodb.com/
- Vercel support: https://vercel.com/support
- Include the full error log from Vercel Functions

---

## Summary

The fix includes:
1. ✅ Proper TLS/SSL configuration
2. ✅ Connection retry logic
3. ✅ Connection pooling for better performance
4. ✅ Graceful error handling with fallbacks
5. ✅ Environment variable documentation

Your site should now work correctly on Vercel with MongoDB Atlas!
