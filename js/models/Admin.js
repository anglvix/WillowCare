import { getDashboardData } from '../services/admin-service.js';

export default class Admin {
    static async getStats() {
        const data = await getDashboardData();
        return {
            users: data.users.length,
            doctors: data.doctors.length,
            schools: data.schools.length,
            workshops: data.workshops.length,
            excursions: data.excursions.length,
            topics: data.forumTopics.length
        };
    }
}