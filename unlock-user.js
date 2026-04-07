// Unlock all locked Payload users
// Run with: mongosh <YOUR_MONGODB_URI> unlock-user.js
// Or directly: mongosh "$MONGODB_URI" unlock-user.js

db.users.updateMany(
  {
    $or: [
      { loginAttempts: { $gt: 0 } },
      { lockUntil: { $exists: true } }
    ]
  },
  {
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: "" }
  }
)

print("✓ All users unlocked")
