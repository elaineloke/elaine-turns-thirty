import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/CalendarToday';

type RSVPFormProps = {
  onYesSubmit?: () => void;
};

export const RSVPForm = ({ onYesSubmit }: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submittedAttendance, setSubmittedAttendance] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.attending) {
      newErrors.attending = 'Please select yes or no';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          attending: formData.attending,
          message: formData.message || '',
        }),
      });

      if (response.ok) {
        // Trigger confetti for "yes"
        if (formData.attending === 'yes') onYesSubmit?.();

        setSubmitStatus('success');
        setSubmittedAttendance(formData.attending);
        setFormData({
          name: '',
          attending: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Typography variant="h4" sx={styles.formTitle}>
        RSVP Form
      </Typography>

      {submitStatus === 'success' && submittedAttendance === 'no' && (
        <Alert severity="info" sx={styles.alert}>
          Thank you for your RSVP. Sorry to hear you can't make it!
        </Alert>
      )}

      {submitStatus === 'success' && submittedAttendance === 'yes' && (
        <>
          <Alert severity="success" sx={styles.alert}>
            Thank you for your RSVP! Can't wait to celebrate with you.
          </Alert>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={styles.googleCalendarButton}
            href={
              'https://www.google.com/calendar/render?action=TEMPLATE' +
              `&text=${encodeURIComponent("Elaine's 30th Birthday")}` +
              `&dates=${'20260228T183000Z'}/${'20260228T220000Z'}` +
              `&details=${encodeURIComponent("Join us at Sticky Mango, where we'll feast on Southeast Asian food with a spectacular view of Tower Bridge.")}` +
              `&location=${encodeURIComponent('Sticky Mango Tower Bridge 36C Shad Thames, London SE1 2YE')}`
            }
            target="_blank"
          >
            Add to Google Calendar
          </Button>
        </>
      )}

      {submitStatus === 'error' && (
        <Alert severity="error" sx={styles.alert}>
          There was an error submitting your RSVP. Please try again.
        </Alert>
      )}

      {submitStatus !== 'success' && (
        <>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={styles.textField}
            disabled={isSubmitting}
          />
          <FormControl component="fieldset" sx={styles.radioGroup} error={!!errors.attending}>
            <Typography variant="subtitle1" sx={styles.radioLabel}>
              Will you be attending?
            </Typography>
            <RadioGroup row name="attending" value={formData.attending} onChange={handleChange}>
              <FormControlLabel
                value="yes"
                control={<Radio sx={styles.radio} />}
                label="Yes, I'll be there!"
                disabled={isSubmitting}
              />
              <FormControlLabel
                value="no"
                control={<Radio sx={styles.radio} />}
                label="Sorry, can't make it"
                disabled={isSubmitting}
              />
            </RadioGroup>
            {errors.attending && <FormHelperText>{errors.attending}</FormHelperText>}
          </FormControl>
          <TextField
            fullWidth
            label="Message (optional)"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={3}
            sx={styles.textField}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} sx={styles.spinner} /> : 'Submit RSVP'}
          </Button>
        </>
      )}
    </Box>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formTitle: {
    textAlign: 'center',
    color: '#ad1457',
    marginBottom: '10px',
    fontSize: '28px',
    fontWeight: 600,
  },
  alert: {
    marginBottom: '10px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f48fb1',
      },
      '&:hover fieldset': {
        borderColor: '#ec407a',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#d81b60',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#888',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#d81b60',
    },
  },
  radioGroup: {
    marginTop: '10px',
    color: '#555',
  },
  radioLabel: {
    color: '#555',
    marginBottom: '10px',
    fontWeight: 500,
    alignSelf: 'self-start',
  },
  radio: {
    color: '#f48fb1',
    '&.Mui-checked': {
      color: '#d81b60',
    },
  },
  submitButton: {
    backgroundColor: '#ec407a',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
    '&:disabled': {
      backgroundColor: '#f8bbd9',
    },
  },
  spinner: {
    color: '#fff',
  },
  googleCalendarButton: {
    backgroundColor: '#4285F4',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'none',
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#357ae8',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '-10px',
    marginBottom: '-10px',
  },
};
