import { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { theme } from '../theme';

type RsvpRecord = {
  id: number;
  name: string;
  email: string;
  attending: string;
  message: string | null;
  created_at: string;
};

export const AdminPage = () => {
  const [authorised, setAuthorised] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthorised(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/rsvp`)
      .then((res) => res.json())
      .then((data: RsvpRecord[]) => setRsvps(data));
  }, [apiUrl]);

  if (!authorised) {
    return (
      <Box sx={styles.wrapper}>
        <Paper elevation={6} sx={styles.card}>
          <Typography variant="h4" sx={styles.title}>
            ADMIN LOGIN
          </Typography>
          <Typography sx={styles.subtitle}>Enter the admin password to access RSVPs</Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (error) setError('');
              }}
              sx={styles.input}
              fullWidth
              error={!!error}
              helperText={error}
            />
            <Button type="submit" variant="contained" sx={styles.button}>
              Enter
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2} sx={{ color: theme.palette.primary.main }}>
        RSVP Admin
      </Typography>

      {rsvps.map((rsvp) => (
        <Paper key={rsvp.id} sx={{ p: 2, mb: 2 }}>
          <Typography>
            <b>Name:</b> {rsvp.name}
          </Typography>
          <Typography>
            <b>Email:</b> {rsvp.email}
          </Typography>
          <Typography>
            <b>Attending:</b> {rsvp.attending}
          </Typography>
          <Typography>
            <b>Message:</b> {rsvp.message}
          </Typography>
          <Typography variant="caption">{rsvp.created_at}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default, // #fff5f7
    padding: 2,
  },
  card: {
    maxWidth: 400,
    width: '100%',
    padding: 4,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  title: {
    color: theme.palette.primary.main, // #ec407a
    textAlign: 'center' as const,
  },
  subtitle: {
    color: theme.palette.secondary.main, // #ad1457
    textAlign: 'center' as const,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 24,
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: theme.palette.primary.main },
      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    },
    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontWeight: 600,
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
};
