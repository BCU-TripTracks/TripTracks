/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 특정 여행 계획의 세부 정보를 조회하는 API
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 특정 여행 계획 상세 조회 API
router.get("/:planning_ID", async (req, res) => {
  const { planning_ID } = req.params;
  const user_Id = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // planning_route에서 기본 여행 계획 정보 조회
    const selectPlanningRouteQuery = `
      SELECT planning_ID, planning_title, User_ID
      FROM planning_route 
      WHERE planning_ID = ? AND User_ID = ?`;

    const [routeResult] = await conn.query(selectPlanningRouteQuery, [
      planning_ID,
      user_Id,
    ]);

    if (routeResult.length === 0) {
      return res
        .status(404)
        .json({ error: "해당 여행 계획을 찾을 수 없습니다." });
    }

    // planning_detail에서 여행 계획의 장소 상세 정보 조회
    const selectPlanningDetailQuery = `
      SELECT day, place, place_ID 
      FROM planning_detail 
      WHERE planning_ID = ? 
      ORDER BY day ASC`;

    const travelDays = await conn.query(selectPlanningDetailQuery, [
      planning_ID,
    ]);
    console.log(travelDays);
    return res.status(200).json({
      message: "여행 계획 상세 조회 성공",
      planning: {
        ...routeResult,
        travelDays,
      },
    });
  } catch (error) {
    console.error("Error while fetching planning details:", error);
    return res.status(500).json({
      error: error.message || "여행 계획 상세 조회 중 오류가 발생했습니다.",
    });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
