/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM 전송
 */

const express = require('express');
const router = express.Router();
const db = require('../../utils/DBconn');

// DM_Message 전송 API
router.post('/', async (req, res) => {
    try {
        const { room_id, sender_id } = req.body;
        const content = req.body.content;
        const sql = 'INSERT INTO DM_Message (Room_ID, Sender_ID, Timestamp, Content) VALUES (?, ?, CURRENT_TIMESTAMP, ?)';
        await db.query(sql, [room_id, sender_id, content]);
        res.json({ message: '메시지가 전송되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '메시지 전송 중 오류가 발생했습니다.' });
    }
});

module.exports = router;