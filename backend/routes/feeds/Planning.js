/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 게시물 업로드 시 저장하도록 하는 API 스크립트
 */
const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 여행 계획 세부정보 저장 API
router.post("/", async (req, res) => {
  const user_Id = req.session.User_ID; // 세션에서 사용자 ID 추출
  const { title, travelDays } = req.body;

  console.log("Request body:", req.body);

  if (!travelDays || !Array.isArray(travelDays)) {
    return res
      .status(400)
      .json({ error: "유효하지 않은 여행 데이터(travelDays)입니다." });
  }

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // planning_route에 새로운 계획 생성
    const insertPlanningRouteQuery = `
      INSERT INTO planning_route (User_ID, planning_title) VALUES (?, ?)`;
    const planningResult = await conn.query(insertPlanningRouteQuery, [
      user_Id,
      title,
    ]);

    let planning_ID = planningResult.insertId.toString();
    console.log(`Generated planning_ID: ${planning_ID}`);

    for (const travelDay of travelDays) {
      const day = travelDay.day;
      const places = travelDay.places;

      if (!Array.isArray(places)) {
        throw new Error(`Day ${day}의 places 데이터가 유효하지 않습니다.`);
      }

      for (const place of places) {
        const placeName = place.place_name;
        const placeId = place.place_ID; // place.place_id 사용

        console.log("Validating place:", { placeName, placeId });

        if (!placeName || !placeId) {
          throw new Error("place_name 또는 place_id 정보가 누락되었습니다.");
        }

        const insertDetailQuery = `
          INSERT INTO planning_detail (planning_ID, place, place_ID, day)
          VALUES (?, ?, ?, ?)`;
        await conn.query(insertDetailQuery, [
          planning_ID,
          placeName,
          placeId,
          day,
        ]);
      }
    }

    await conn.commit(); // 트랜잭션 커밋
    return res.status(200).json({
      message: "여행 계획이 성공적으로 저장되었습니다.",
      planning_ID,
    });
  } catch (error) {
    console.error("Error while saving planning:", error);
    if (conn) await conn.rollback();
    return res.status(500).json({
      error: error.message || "내부 서버 오류가 발생했습니다.",
    });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
