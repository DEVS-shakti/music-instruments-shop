export const ADMIN_EMAILS = [
  "devsahushakti785@gmail.com",
  "reunkasahu785@gmail.com"
];

export const ADMIN_GMAIL_HANDLES = [
  "devsahushakti785",
  "reunkasahu785"
];

export const normalizeEmail = (email = "") => {
  const normalized = email.trim().toLowerCase();
  const [localPart = "", domain = ""] = normalized.split("@");

  if (domain === "gmail.com" || domain === "googlemail.com") {
    const gmailLocalPart = localPart.split("+")[0].replace(/\./g, "");
    return `${gmailLocalPart}@gmail.com`;
  }

  return normalized;
};

export const isAdminEmail = (email = "") => {
  const normalizedEmail = normalizeEmail(email);
  const [localPart = "", domain = ""] = normalizedEmail.split("@");

  if (
    (domain === "gmail.com" || domain === "googlemail.com") &&
    ADMIN_GMAIL_HANDLES.includes(localPart)
  ) {
    return true;
  }

  return ADMIN_EMAILS.some(
    (adminEmail) => normalizeEmail(adminEmail) === normalizedEmail
  );
};

export const getUserDisplayName = (user) => {
  if (user?.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (!user?.email) {
    return "User";
  }

  return user.email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

export const getUserInitials = (user) => {
  const displayName = getUserDisplayName(user);
  const parts = displayName.split(" ").filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};
