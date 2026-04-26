"use strict";

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert("Messages", [
            { content: "Pierwsza przykladowa wiadomosc.", createdAt: now, updatedAt: now },
            { content: "Druga przykladowa wiadomosc.", createdAt: now, updatedAt: now },
            { content: "Trzecia przykladowa wiadomosc.", createdAt: now, updatedAt: now }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("Messages", null, {});
    }
}; 
