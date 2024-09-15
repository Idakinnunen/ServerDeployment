const { QueryTypes } = require('sequelize');
const db = require('../models'); // Ensure this is pointing to your models/index.js

class ParticipantService {
    constructor() {
        this.client = db.sequelize;
        this.Participant = db.Participant;
        this.Work = db.Work;
        this.Home = db.Home;
    }

    async createParticipant(email, firstname, lastname, dob, work, home) {
        const transaction = await this.client.transaction();
    
        try {
            // Create participant
            const participant = await this.Participant.create({
                email,
                firstname,
                lastname,
                dob,
            }, { transaction });
    
            // Create associated work details
            const workDetails = await this.Work.create({
                companyname: work.companyname,
                salary: work.salary,
                currency: work.currency,
                ParticipantId: participant.id,
            }, { transaction });
    
            // Create associated home details
            const homeDetails = await this.Home.create({
                country: home.country,
                city: home.city,
                ParticipantId: participant.id,
            }, { transaction });
    
            await transaction.commit();
            return {
                participant,
                workDetails,
                homeDetails,
            };
        } catch (err) {
            await transaction.rollback();
            throw new Error(`Error creating participant: ${err.message}`);
        }
    }
    
    // Fetch all participants with details
    async getAllParticipants() {
        try {
            const participants = await this.Participant.findAll({
                include: [this.Work, this.Home],
            });
            return participants;
        } catch (error) {
            throw new Error(`Error fetching participants: ${error.message}`);
        }
    }

  
// Example method
async getParticipantByEmail(email) {
    try {
        const participant = await this.Participant.findOne({
            where: { email },
            include: [this.Work, this.Home],
        });
        return participant;
    } catch (error) {
        throw new Error(`Error fetching participant: ${error.message}`);
    }
}



    // Update participant details including work and home
    async updateParticipant(email, { firstname, lastname, dob, work, home }) {
        try {
            const participant = await this.Participant.findOne({
                where: { email },
            });

            if (!participant) {
                throw new Error('Participant not found');
            }

            // Update participant info
            await participant.update({ firstname, lastname, dob });

            // Update work details
            await this.Work.update(work, {
                where: { ParticipantId: participant.id },
            });

            // Update home details
            await this.Home.update(home, {
                where: { ParticipantId: participant.id },
            });

            return participant;
        } catch (error) {
            throw new Error(`Error updating participant: ${error.message}`);
        }
    }

    // Delete a participant and related work and home records
    async deleteParticipant(email) {
        try {
            const participant = await this.Participant.findOne({
                where: { email },
            });

            if (!participant) {
                throw new Error('Participant not found');
            }

            // Delete associated work and home details
            await this.Work.destroy({
                where: { ParticipantId: participant.id },
            });
            await this.Home.destroy({
                where: { ParticipantId: participant.id },
            });

            // Delete participant
            await participant.destroy();
            return { message: 'Participant deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting participant: ${error.message}`);
        }
    }
}

module.exports = ParticipantService;
