const { Participant, Work, Home } = require('./models');

// Example usage in a route handler
router.get('/:id', async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id, {
      include: [Work, Home]
    });
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
