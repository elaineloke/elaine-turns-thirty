import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: 'Where is Sticky Mango?',
    answer: (
      <>
        The closest tube station is London Bridge. From there, it's a 10-minute walk to the
        restaurant, close to Tower Bridge.
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5588.4515821880095!2d-0.08899547640747106!3d51.50170803034421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760367293451eb%3A0x71f54dd05192840b!2sSticky%20Mango%20Tower%20Bridge!5e0!3m2!1sen!2suk!4v1770465373525!5m2!1sen!2suk"
          width="400"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </>
    ),
  },
  {
    question: 'Can I bring a guest?',
    answer: (
      <>
        Yes of course! Feel free to add this detail in the RSVP form message section. The more the
        merrier! 🎉
        <br />
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpnOWYwbXU4MzU3d3RmejA5YzRtY2ZpbzN3OTZ0b2w0Y25xdzdzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DHteSdTB6EdclUtCtc/giphy.gif"
          alt="Bring a guest"
          style={{ width: '100%', maxWidth: 400, marginTop: 10, borderRadius: 8 }}
        />
      </>
    ),
  },
  {
    question: 'How much is the meal?',
    answer: (
      <>
        Sticky Mango's menu can be found{' '}
        <a
          href="https://www.stickymango.co.uk/menus"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#AD1457',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          here
          <OpenInNewIcon fontSize="small" />
        </a>
        . Estimated cost per person is around £35-45 (depending on the type of dishes you choose).
      </>
    ),
  },
  {
    question: 'Is there a dress code?',
    answer: (
      <>
        The dress code for the evening is semi casual. No specific theme. Think vibes like this:
        <br />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: 10,
          }}
        >
          <img
            src="https://rixolondon.com/cdn/shop/files/010.05411.226.07879_Ester_Dress_Ava_Devore_Blue_Flatlay.jpg?v=1768842721&width=1200"
            alt="Outfit 1"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8 }}
          />
          <img
            src="https://images.selfridges.com/is/image/selfridges/R04519711_PEARGREEN_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&dpr=on,2&extend=-18,0,-18,0"
            alt="Outfit 2"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8 }}
          />
          <img
            src="https://www.rihoas.com/cdn/shop/files/the-black-sweetheart-neck-trumpet-dress-dresses-l0zyo2_1296x.jpg?v=1769843292"
            alt="Outfit 3"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8 }}
          />
          <img
            src="https://content.moss.co.uk/images/extraextralarge/967046909_01.jpg"
            alt="Outfit 4"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8 }}
          />
          <img
            src="https://content.moss.co.uk/images/original/966608009_01%20(1).jpg"
            alt="Outfit 5"
            style={{ width: '100%', maxWidth: 200, borderRadius: 8 }}
          />
        </div>
      </>
    ),
  },
  {
    question: 'What colour is the birthday girl wearing?',
    answer: <>I'll be wearing burgundy!</>,
  },
  {
    question: 'What does the evening look like?',
    answer: (
      <>
        I'll be taking pictures outside Sticky Mango near Tower Bridge before dinner. Everyone is
        welcome to join hehe. All guests are expected to arrive at the restaurant by 6:30pm. We will
        be dining until around 8:30pm, then head to my house in Canada Water SE8 5DT (2 stops from
        London Bridge on Jubilee) for birthday cake. Celebration will end around 10pm (30 y/o me is
        old and wants to be in bed before midnight).
        <br />
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExenEydWFucG91cTA5cTcwd2lqem1jOWl1dnA0ZnBud3d5dWFsdjVyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Im6d35ebkCIiGzonjI/giphy.gif"
          alt="Bring a guest"
          style={{ width: '100%', maxWidth: 400, marginTop: 10, borderRadius: 8 }}
        />
      </>
    ),
  },
];

export const FaqPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={styles.container}>
      <IconButton onClick={() => navigate('/')} sx={styles.homeIcon}>
        <HomeIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3" sx={styles.title}>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#d81b60' }} />}
            sx={styles.accordionSummary}
          >
            <Typography sx={styles.question}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <Typography sx={styles.answer}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const styles = {
  container: {
    margin: '-8px',
    p: { xs: 3, md: 6 },
    backgroundColor: '#fff5f7',
    minHeight: '100vh',
  },
  homeIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    color: '#d81b60',
    '&:hover': { backgroundColor: 'rgba(216, 25, 96, 0.1)' },
  },
  title: {
    textAlign: 'center',
    mb: 4,
    color: '#ad1457',
    fontFamily: "'Kapakana Variable', cursive",
    fontWeight: 600,
  },
  accordion: {
    mb: 2,
    borderRadius: '10px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 6px 18px rgba(0,0,0,0.12)',
    },
  },
  accordionSummary: {
    backgroundColor: '#fff0f6',
    borderRadius: '8px',
  },
  question: {
    fontWeight: 600,
    color: '#d81b60',
  },
  accordionDetails: {
    backgroundColor: '#fff5f7',
    p: 2,
  },
  answer: {
    color: '#555',
    fontSize: '16px',
    lineHeight: 1.5,
  },
};
