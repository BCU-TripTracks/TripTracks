/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM방 목록 출력
 */

const express = require('express');
const router = express.Router();
const db = require('../../utils/DBconn');

// 특정 사용자가 속한 DM_Room 목록 조회 API
router.get('/', async (req, res) => {
    try {
        const user_Id = req.session.user_Id; // 세션에서 사용자 ID 가져오기
        const sql = `SELECT dm.Room_ID FROM DM_Member dm WHERE dm.User_ID IN (?, ?) GROUP BY dm.Room_ID HAVING COUNT(DISTINCT dm.User_ID) = ? AND COUNT(*) = ?`;
        const rooms = await db.query(sql, [user_Id]);
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '사용자가 속한 방 목록을 가져오는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;