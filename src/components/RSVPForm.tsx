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
  CircularProgress
} from '@mui/material';

export const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    try {
      const response = await fetch('http://localhost:3000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          message: formData.message || ''
        }),
      });
  
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          attending: 'yes',
          message: ''
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

      {submitStatus === 'success' && (
        <Alert severity="success" sx={styles.alert}>
          Thank you for your RSVP! We look forward to celebrating with you.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert severity="error" sx={styles.alert}>
          There was an error submitting your RSVP. Please try again.
        </Alert>
      )}

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

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        sx={styles.textField}
        disabled={isSubmitting}
      />

      <FormControl component="fieldset" sx={styles.radioGroup}>
        <Typography variant="subtitle1" sx={styles.radioLabel}>
          Will you be attending?
        </Typography>
        <RadioGroup
          row
          name="attending"
          value={formData.attending}
          onChange={handleChange}
        >
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
        {isSubmitting ? (
          <CircularProgress size={24} sx={styles.spinner} />
        ) : (
          'Submit RSVP'
        )}
      </Button>
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
};