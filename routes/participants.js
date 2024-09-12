const express = require('express');
const router = express.Router();
const { Participant, Work, Home } = require('../models');
const authenticateAdmin = require('../middleware/auth');
const ParticipantServices = require('../services/ParticipantServices');

// Define routes here
router.get('/', (req, res) => {
  res.send('Participants route');
});

router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const participants = await participantService.getAllparticipants();
        
        // This is where the dynamically generated JSON (from the database) is returned
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/add', authenticateAdmin, async (req, res) => {
    const { email, firstname, lastname, dob, work, home } = req.body;

    // Validate required fields and format
    if (!email || !firstname || !lastname || !dob || !work || !home) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Email and Date validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!dobRegex.test(dob)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    try {
        const participant = await Participant.create({ email, firstname, lastname, dob });
        await Work.create({ ...work, ParticipantId: participant.id });
        await Home.create({ ...home, ParticipantId: participant.id });

        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add participant' });
    }
});

router.get ('/details', authenticateAdmin, async (req, res) => {
    try {
        const participants = await ParticipantServices.getAllParticipantDetails();
        res.status(200).json(participants);
    } catch (error) {
        res.status (500).json({ error: 'Failed to fetch participants details'});
    }
});

module.exports = router;

