/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.12.07.
 * 코드 설명:
 * 사용자가 계획한 여행을 삭제하는 API
 */
const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 여행 계획 삭제 API
router.post("/", async (req, res) => {
  const user_Id = req.session.User_ID; // 세션에서 사용자 ID 추출
  const planning_ID = req.body.planning_ID;

  console.log(`Request to delete planning with ID: ${planning_ID}`);

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 먼저 planning_detail 테이블에서 해당 여행 계획에 속하는 장소들 삭제
    const deleteDetailQuery = `DELETE FROM planning_detail WHERE planning_ID = ?`;
    await conn.query(deleteDetailQuery, [planning_ID]);

    // 그 후 planning_route 테이블에서 해당 계획 삭제
    const deleteRouteQuery = `DELETE FROM planning_route WHERE planning_ID = ? AND User_ID = ?`;
    const result = await conn.query(deleteRouteQuery, [planning_ID, user_Id]);

    if (result.affectedRows === 0) {
      // 계획이 존재하지 않거나, 다른 사용자의 계획이라면
      throw new Error("해당 여행 계획을 찾을 수 없습니다.");
    }

    await conn.commit(); // 트랜잭션 커밋
    return res.status(200).json({
      message: "여행 계획이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("Error while deleting planning:", error);
    if (conn) await conn.rollback();
    return res.status(500).json({
      error: error.message || "내부 서버 오류가 발생했습니다.",
    });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
