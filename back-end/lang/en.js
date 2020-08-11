const auth = {
  serverError: "",
  passwordChange: "Password changed!",
  passwordChangeFail: "Unable to send confirmation for changing your password.",
  noUserProfile: "Failed to find user profile. Login again!",
  loginSuccess: "Login successful!",
  logoutSuccess: "Logout successful!",
  resetCodeSent: "A six digit code to reset your password was sent to",
  resetCodeExpired: "Reset code is invalid or has expired.",
  setNewPassword: "Set your new password .",
  resetTokenExpired: "Password reset token is invalid or has expired.",
  failedToSendPasswordChangeEmail:
    "Unable to send confirmation for changing your password.",
  invalidUpdateField: "Invalid update field",
  accountDeleted: "Account deleted",
  deleteAccountFail: "Failed to delete account.",
  verificationCodeExpired: "Verification code is invalid or has expired.",
  failedToVerifyAccount:
    "Failed to verify your account account, activation code might have expired.",
  verificationSentToEmail: "New verification code sent to your email!",
  renewActivationCodeFailed: "Failed to renew your activation code!.",
};

module.exports = { auth };
