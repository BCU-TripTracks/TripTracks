/**
 * @api {post} /Users/Login 3.로그아웃
 * @apiName Logout
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자의 로그아웃을 처리하는 API 입니다.
 *
 * @apiHeader {String} session.user 사용자 세션 아이디
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *        "logout_result": "success"
 *     }
 *
 * @apiError err 로그아웃실패
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "로그아웃 실패"
 *     }
 */
