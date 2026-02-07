import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Button } from '@mui/material';
import { RSVPForm } from '../components/RSVPForm';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useState } from 'react';

export const HomePage = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();
  const navigateToFaq = () => {
    navigate('/faq');
  };

  // Called after successful "yes" RSVP
  const handleRsvpYes = () => {
    setShowConfetti(true);
    setFadeOut(false);

    setTimeout(() => setFadeOut(true), 5000);
    setTimeout(() => setShowConfetti(false), 7000);
  };

  return (
    <Box sx={styles.mainContainer}>
      {showConfetti && (
        <Box
          sx={{
            ...styles.confettiBox,
            opacity: fadeOut ? 0 : 1,
          }}
        >
          <Confetti
            width={width}
            height={height}
            numberOfPieces={700}
            gravity={0.15}
            recycle={true}
          />
        </Box>
      )}
      <Box sx={styles.headerSection}>
        <Typography variant="body1" sx={styles.whisperText}>
          Can I keep the presents and stay
        </Typography>
        <Typography variant="h1" sx={styles.surpriseText}>
          Twenty Nine?
        </Typography>
      </Box>

      <Container maxWidth="md" sx={styles.contentContainer}>
        {/* Join Us Section */}
        <Box sx={styles.joinUsSection}>
          <Typography variant="h2" sx={styles.joinUsText}>
            YOU ARE CORDIALLY INVITED TO
          </Typography>
        </Box>

        {/* Birthday Name Section */}
        <Box sx={styles.birthdaySection}>
          <Typography variant="h1" sx={styles.birthdayName}>
            Elaine&apos;s
          </Typography>
          <Typography variant="h2" sx={styles.birthdayAge}>
            30th Birthday
          </Typography>
        </Box>

        {/* Details Section */}
        <Box sx={styles.detailsSection}>
          <Typography variant="h5" sx={styles.detailText}>
            SATURDAY, FEBRUARY 28TH
          </Typography>
          <Typography variant="h5" sx={styles.detailText}>
            6:30PM ONWARDS
          </Typography>
          <Typography
            variant="h5"
            sx={{
              ...styles.detailText,
              color: '#874000',
              textDecoration: 'underline',
            }}
          >
            STICKY MANGO, TOWER BRIDGE
          </Typography>
          <Typography variant="h5" sx={styles.detailText}>
            36C SHAD THAMES, LONDON SE1 2YE
          </Typography>
        </Box>

        <Button variant="outlined" sx={styles.faqButton} onClick={navigateToFaq}>
          FAQs
        </Button>

        {/* RSVP Section */}
        <Box sx={styles.rsvpSection}>
          <Typography variant="h6" sx={styles.rsvpDeadline}>
            RSVP BELOW BY FEBRUARY 20TH
          </Typography>

          {/* RSVP Form */}
          <Box sx={styles.formContainer}>
            <RSVPForm onYesSubmit={handleRsvpYes} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  mainContainer: {
    margin: '-8px',
    minHeight: '100vh',
    width: '100vw',
    // Background covers entire viewport
    backgroundImage:
      'url("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // Ensure it covers mobile too
    backgroundSize: {
      xs: 'cover',
      sm: 'cover',
      md: 'cover',
    },
    // Fallback solid color if image fails to load
    backgroundColor: '#fff5f7',
    // Full viewport coverage
    position: 'relative',
    overflowX: 'hidden',
    padding: {
      xs: '15px 0px 30px 0px',
      md: '20px 0px 40px 0px',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // Overlay for readability
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 245, 247, 0.88)', // Soft pink overlay
      zIndex: 1,
      // Darker overlay on mobile for better contrast
      '@media (max-width: 600px)': {
        backgroundColor: 'rgba(255, 245, 247, 0.92)',
      },
    },
  },
  confettiBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'opacity 1s ease-out',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingTop: '20px',
    zIndex: 2,
  },
  whisperText: {
    fontSize: '24px',
    fontFamily: "'Allura', cursive",
    marginBottom: '-10px',
    color: '#874000',
  },
  surpriseText: {
    fontSize: '72px',
    fontFamily: "'Sacramento', cursive",
    fontWeight: 700,
    letterSpacing: '2px',
    color: '#F7C1BB',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: {
      xs: '0px 15px', // Mobile
      md: '0px 20px', // Desktop
    },
  },
  joinUsSection: {
    textAlign: 'center',
    marginBottom: '40px',
    borderTop: '2px solid #f48fb1',
    borderBottom: '2px solid #f48fb1',
    padding: '15px 0px',
    width: '100%',
  },
  joinUsText: {
    fontSize: '28px',
    fontWeight: 400,
    letterSpacing: '3px',
    color: '#d81b60',
  },
  birthdaySection: {
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '-24px',
  },
  birthdayName: {
    fontSize: '80px',
    fontFamily: "'Kapakana Variable', cursive",
    fontWeight: 500,
    color: '#ad1457',
    marginBottom: '-10px',
  },
  birthdayAge: {
    fontSize: '48px',
    fontFamily: "'Kapakana Variable', cursive",
    fontWeight: 400,
    letterSpacing: '2px',
    color: '#c2185b',
  },
  detailsSection: {
    textAlign: 'center',
    marginBottom: '60px',
    width: '100%',
  },
  detailText: {
    fontSize: '20px',
    fontWeight: 400,
    letterSpacing: '1px',
    marginBottom: '15px',
    color: '#555',
  },
  rsvpSection: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  rsvpDeadline: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '1px',
    color: '#d81b60',
    marginBottom: '40px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
  },
  faqButton: {
    marginTop: '-54px',
    marginBottom: '24px',
    borderColor: '#AD1457',
    color: '#874000',
    '&:hover': {
      borderColor: '#AD1457',
      backgroundColor: 'rgba(173, 20, 87, 0.1)',
    },
  },
};
