import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { theme } from '../theme';
import { MOCK_RSVPS } from '../mocks/mockRsvp';
import { useDeleteRsvp } from '../hooks/useDeleteRsvp';

export type RsvpRecord = {
  id: number;
  name: string;
  attending: string;
  message: string | null;
  created_at: string;
};

export const AdminPage = () => {
  const [authorised, setAuthorised] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const [rsvps, setRsvps] = useState<RsvpRecord[] | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const isLocal = window.location.hostname === 'localhost';

  const fetchRsvps = async () => {
    if (isLocal) {
      setRsvps(MOCK_RSVPS);
      return;
    }
    setRsvps(null);
    try {
      const res = await fetch(`${apiUrl}/api/rsvp`);
      const data: RsvpRecord[] = await res.json();
      setRsvps(data);
    } catch (err) {
      console.error('Failed to fetch RSVPs:', err);
      setRsvps([]);
    }
  };

  useEffect(() => {
    fetchRsvps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

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

  const {
    deleteTarget,
    loading: deleteLoading,
    error: deleteError,
    handleDelete,
    cancelDelete,
    confirmDelete,
  } = useDeleteRsvp((id) => {
    setRsvps((prev) => prev?.filter((r) => r.id !== id) ?? null);
  });

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

  // Show loading spinner while fetching
  if (rsvps === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2}>Loading RSVPs...</Typography>
      </Box>
    );
  }

  // Show no rsvp if empty
  if (rsvps.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No RSVPs found.</Typography>
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
            <b>Attending:</b> {rsvp.attending}
          </Typography>
          <Typography>
            <b>Message:</b> {rsvp.message}
          </Typography>
          <Typography variant="caption" display="block" mb={1}>
            {new Date(rsvp.created_at).toLocaleString()}
          </Typography>

          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(rsvp)}>
            Delete
          </Button>
        </Paper>
      ))}

      <Dialog open={!!deleteTarget} onClose={cancelDelete}>
        <DialogTitle>Delete RSVP</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{deleteTarget?.name}</b>?
          </Typography>

          {deleteError && (
            <Typography color="error" mt={1}>
              {deleteError}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Yes, delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
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
    color: theme.palette.primary.main,
    textAlign: 'center' as const,
  },
  subtitle: {
    color: theme.palette.secondary.main,
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
