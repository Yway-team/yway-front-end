import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

export default function ProfilePrivacy() {
  return (
    <Stack spacing={3}>
      <h2>
        PRIVACY SETTINGS
      </h2>
      <div>
        Who is allowed to see your quizzes, platforms, achievements, and history?
      </div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="privacy"
          defaultValue="public"
          name="radio-buttons-group"
        >
          <FormControlLabel value="public" control={<Radio />} label="Public (Anyone)" />
          <FormControlLabel value="friends" control={<Radio />} label="Friends only" />
          <FormControlLabel value="private" control={<Radio />} label="Private (Only You)" />
        </RadioGroup>
        </FormControl>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Confirm</Button>
          <Button variant="outlined">Cancel</Button>
        </Stack>
    </Stack>
  );
}