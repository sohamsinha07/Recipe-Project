import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack
} from "@mui/material";
import KeyboardArrowUpIcon   from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon             from "@mui/icons-material/Close";
import AddIcon               from "@mui/icons-material/Add";
import { useState }          from "react";

export default function InstructionsSection() {
  const [steps, setSteps] = useState([]);

  const move = (idx, dir) => {
    const tgt = idx + dir;
    if (tgt < 0 || tgt >= steps.length) return;
    const reordered = [...steps];
    [reordered[idx], reordered[tgt]] = [reordered[tgt], reordered[idx]];
    setSteps(reordered);
  };

  const update = (idx, val) =>
    setSteps(steps.map((s, i) => (i === idx ? val : s)));

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Instructions *
      </Typography>

      {steps.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Click <strong>Add Step</strong> to begin writing instructions.
        </Typography>
      )}

      {steps.map((s, i) => (
        <Stack key={i} direction="row" spacing={1} mb={2}>
          <TextField
            fullWidth
            multiline
            placeholder={`Step ${i + 1}...`}
            value={s}
            onChange={e => update(i, e.target.value)}
          />
          <Stack>
            <IconButton
              size="small"
              onClick={() => move(i, -1)}
              disabled={i === 0}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => move(i, 1)}
              disabled={i === steps.length - 1}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setSteps(steps.filter((_, idx) => idx !== i))}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      ))}

      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => setSteps([...steps, ""])}
      >
        Add Step
      </Button>
    </Paper>
  );
}