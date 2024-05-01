/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM출력
 */

const express = require('express');
const router = express.Router();
const db = require('../../utils/DBconn');

// 특정 방의 채팅 내역 조회 API
router.get('/', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const sql = `
            SELECT 
                m.Type, 
                m.Message, 
                TIME_FORMAT(m.Timestamp, '%H:%i:%s') AS Time 
            FROM DM_Message m 
            WHERE m.Room_ID = ? 
            ORDER BY m.Timestamp ASC;
        `;
        const messages = await db.query(sql, [roomId]);
        
        // 클라이언트에서 요청한 형식으로 채팅 내역 가공
        const chatHistory = {
            Room_ID: roomId,
            User_ID: req.session.User_ID, // 세션에서 사용자 이름 가져오기
            Messages: messages.map(msg => ({
                Type: msg.Type,
                Message: msg.Message,
                Time: msg.Time
            }))
        };

        res.json(chatHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '채팅 내역을 가져오는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;