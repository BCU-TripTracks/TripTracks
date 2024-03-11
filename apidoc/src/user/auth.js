/**
 * @api {post} /Users/auth 1.세션확인
 * @apiName auth
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자의 세션을 확인하는 API 입니다.
 *
 * @apiSuccessExample 성공:
 *     HTTP/1.1 201 CREATED
 *     {
 *        "Session_ID": "025512354"
 *        "Session_user_Email": "leeyoungjae2001",
 *     }
 *
 * @apiError NotExistSession 세션이 존재하지 않음
 *
 * @apiErrorExample 에러-NotExistSession:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "세션이 존재하지 않음"
 *     }
 */
