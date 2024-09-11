// services/participantService.js
const { Participant, Work, Home } = require('../models');

class ParticipantService {
    // Create a new participant
    async createParticipant(participantData, workData, homeData) {
        try {
            const participant = await Participant.create(participantData);
            const work = await Work.create({ ...workData, ParticipantId: participant.id });
            const home = await Home.create({ ...homeData, ParticipantId: participant.id });
            return { participant, work, home };
        } catch (error) {
            throw new Error('Failed to create participant');
        }
    }

    // Fetch all participants with work and home details
    async getAllParticipants() {
        try {
            const participants = await Participant.findAll({
                include: [Work, Home], // Include work and home details
            });
            return participants;
        } catch (error) {
            throw new Error('Failed to fetch participants');
        }
    }

    // Fetch participant by email
    async getParticipantByEmail(email) {
        try {
            return await Participant.findOne({ where: { email }, include: [Work, Home] });
        } catch (error) {
            throw new Error('Failed to fetch participant');
        }
    }

    // Update participant by email
    async updateParticipant(email, participantData, workData, homeData) {
        try {
            const participant = await Participant.findOne({ where: { email } });
            if (!participant) throw new Error('Participant not found');

            await participant.update(participantData);
            await participant.Work.update(workData);
            await participant.Home.update(homeData);

            return participant;
        } catch (error) {
            throw new Error('Failed to update participant');
        }
    }

    // Delete participant by email
    async deleteParticipant(email) {
        try {
            const participant = await Participant.findOne({ where: { email } });
            if (!participant) throw new Error('Participant not found');
            
            await participant.destroy();
            return { message: 'Participant deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete participant');
        }
    }
}

module.exports = new ParticipantService();
