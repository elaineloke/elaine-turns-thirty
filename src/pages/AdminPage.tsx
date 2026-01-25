import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

type RsvpRecord = {
  id: number;
  name: string;
  email: string;
  attending: string;
  message: string | null;
  created_at: string;
};

export const AdminPage = () => {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/rsvp`)
      .then((res) => res.json())
      .then((data: RsvpRecord[]) => setRsvps(data));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        RSVP Admin
      </Typography>

      {rsvps.map((rsvp) => (
        <Paper key={rsvp.id} sx={{ p: 2, mb: 2 }}>
          <Typography><b>Name:</b> {rsvp.name}</Typography>
          <Typography><b>Email:</b> {rsvp.email}</Typography>
          <Typography><b>Attending:</b> {rsvp.attending}</Typography>
          <Typography><b>Message:</b> {rsvp.message}</Typography>
          <Typography variant="caption">{rsvp.created_at}</Typography>
        </Paper>
      ))}
    </Box>
  );
};
