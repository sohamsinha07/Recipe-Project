import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function InstructionsSection() {
  const { control, register } = useFormContext();
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "instructions",
  });

  const move = (idx, dir) => {
    const tgt = idx + dir;
    if (tgt < 0 || tgt >= fields.length) return;
    swap(idx, tgt);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Instructions *
      </Typography>

      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Click <strong>Add Step</strong> to begin writing instructions.
        </Typography>
      )}

      {fields.map((field, i) => (
        <Stack key={field.id} direction="row" spacing={1} mb={2}>
          <TextField
            fullWidth
            multiline
            placeholder={`Step ${i + 1}…`}
            {...register(`instructions.${i}.value`)}
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
              disabled={i === fields.length - 1}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => remove(i)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      ))}

      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => append({ value: "" })}
      >
        Add Step
      </Button>
    </Paper>
  );
}
