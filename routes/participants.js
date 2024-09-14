const express = require('express');
const router = express.Router();
const ParticipantService = require('../services/ParticipantServices');
const authenticateAdmin = require('../middleware/auth');

// Create an instance of ParticipantService
const participantService = new ParticipantService();

// Base endpoint
router.get('/', (req, res) => {
    res.send('Participants route');
});

// Add a new participant
router.post('/add', authenticateAdmin, async (req, res) => {
    const { email, firstname, lastname, dob, work, home } = req.body;

    // Validate required fields
    if (!email || !firstname || !lastname || !dob || !work || !home) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate the email and date of birth formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!dobRegex.test(dob)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    try {
        const participant = await participantService.createParticipant(email, firstname, lastname, dob, work, home);
        res.status(201).json(participant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all participants
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const participants = await participantService.getAllParticipants();
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all participants' personal details
router.get('/details', authenticateAdmin, async (req, res) => {
    try {
        const participants = await participantService.getAllParticipants();
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch participant details' });
    }
});

// Fetch a specific participant's personal details
router.get('/details/:email', authenticateAdmin, async (req, res) => {
    const { email } = req.params;
    try {
        const participant = await participantService.getParticipantByEmail(email);
        if (participant) {
            res.status(200).json({
                firstname: participant.firstname,
                lastname: participant.lastname,
                active: participant.active
            });
        } else {
            res.status(404).json({ error: 'Participant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch participant details' });
    }
});

// Fetch a specific participant's work details
router.get('/work/:email', authenticateAdmin, async (req, res) => {
    const { email } = req.params;
    try {
        const participant = await participantService.getParticipantByEmail(email);
        if (participant) {
            const workDetails = await participantService.Work.findOne({
                where: { ParticipantId: participant.id }
            });
            if (workDetails) {
                res.status(200).json(workDetails);
            } else {
                res.status(404).json({ error: 'Participant or work details not found' });
            }
        } else {
            res.status(404).json({ error: 'Participant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch work details' });
    }
});

// Fetch a specific participant's home details
router.get('/home/:email', authenticateAdmin, async (req, res) => {
    const { email } = req.params;
    try {
        const participant = await participantService.getParticipantByEmail(email);
        if (participant) {
            const homeDetails = await participantService.Home.findOne({
                where: { ParticipantId: participant.id }
            });
            if (homeDetails) {
                res.status(200).json(homeDetails);
            } else {
                res.status(404).json({ error: 'Participant or home details not found' });
            }
        } else {
            res.status(404).json({ error: 'Participant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch home details' });
    }
});

// Delete a participant
router.delete('/:email', authenticateAdmin, async (req, res) => {
    const { email } = req.params;
    try {
        const result = await participantService.deleteParticipant(email);
        res.status(200).json({ message: 'Participant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete participant' });
    }
});

// Update a participant
router.put('/:email', authenticateAdmin, async (req, res) => {
    const { email } = req.params;
    const { firstname, lastname, dob, work, home } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !dob || !work || !home) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate the date of birth format
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    try {
        const updatedParticipant = await participantService.updateParticipant(email, { firstname, lastname, dob, work, home });
        res.status(200).json(updatedParticipant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update participant' });
    }
});

module.exports = router;
