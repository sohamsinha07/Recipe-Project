import { Box } from "@mui/material";

const STATUS_PROPS = {
  approved: {
    bg: "#F0FFF4",
    fg: "#38A169",
    label: "Approved",
    icon: (
      <>
        <circle cx="8" cy="8" r="7" stroke="#38A169" strokeWidth="2" fill="none" />
        <polyline
          points="5.5,9 7.5,11 11,6"
          fill="none"
          stroke="#38A169"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    published: undefined,
  },
  rejected: {
    bg: "#FFF5F5",
    fg: "#C53030",
    label: "Rejected",
    icon: (
      <>
        <circle cx="8" cy="8" r="7" stroke="#C53030" strokeWidth="2" fill="none" />
        <line
          x1="5.5"
          y1="5.5"
          x2="10.5"
          y2="10.5"
          stroke="#C53030"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="10.5"
          y1="5.5"
          x2="5.5"
          y2="10.5"
          stroke="#C53030"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  pending: {
    bg: "#FFF5F5",
    fg: "#C53030",
    label: "Pending Review",
    icon: (
      <>
        <circle cx="7" cy="7" r="6" stroke="#C53030" strokeWidth="1.5" fill="none" />
        <rect x="6.25" y="3" width="1.5" height="5" rx="0.75" fill="#C53030" />
        <circle cx="7" cy="10.5" r="1" fill="#C53030" />
      </>
    ),
  },
};

STATUS_PROPS.published = {
  ...STATUS_PROPS.approved,
  label: "Published",
};

export default function StatusBadge({ status = "pending" }) {
  const key = (status || "pending").toLowerCase();
  const cfg = STATUS_PROPS[key] || STATUS_PROPS.pending;

  return (
    <Box
      sx={{
        background: cfg.bg,
        color: cfg.fg,
        borderRadius: 1.5,
        px: 1.5,
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: 500,
        gap: 0.75,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16">
        {cfg.icon}
      </svg>
      {cfg.label}
    </Box>
  );
}
