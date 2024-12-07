/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 저장한 여행 계획 목록을 planning_route 테이블에서 조회하는 API
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 여행 계획 목록 조회 API
router.get("/", async (req, res) => {
  const user_Id = req.session.User_ID; // 세션에서 사용자 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // planning_route 테이블에서 사용자 ID로 여행 계획 조회
    const selectPlanningRouteQuery = `
      SELECT planning_ID, planning_title, User_ID
      FROM planning_route
      WHERE User_ID = ?
    `;

    // 쿼리 실행
    const plan = await conn.query(selectPlanningRouteQuery, [user_Id]);

    console.log("Query Result (rows):", plan);

    return res.status(200).json({
      message: "여행 계획 목록 조회 성공",
      plan, // 배열로 반환
    });
  } catch (error) {
    console.error("Error while fetching planning routes:", error);
    return res.status(500).json({
      error: error.message || "여행 계획 목록 조회 중 오류가 발생했습니다.",
    });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
