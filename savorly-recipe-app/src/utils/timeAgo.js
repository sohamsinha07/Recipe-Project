export function timeAgo(rawTimestamp) {
  if (!rawTimestamp) return "";
  let created;

  if (typeof rawTimestamp.toDate === "function") {
    // Raw is an actual Firestore Timestamp object
    created = rawTimestamp.toDate();
  } else if (rawTimestamp._seconds != null) {
    created = new Date(rawTimestamp._seconds * 1000);
  } else if (rawTimestamp.seconds != null) {
    created = new Date(rawTimestamp.seconds * 1000);
  } else {
    created = new Date(rawTimestamp);
  }

  if (isNaN(created.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = now - created;
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) {
    return "Just now";
  }

  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
}
