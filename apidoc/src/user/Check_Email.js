/**
 * @api {post} /Users/Check_Email 6. 이메일 중복 검사
 * @apiName Check_Email
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자의 Email을 중복 검사하는 API 입니다.
 *
 * @apiHeader {String} user_Email 사용자 이메일
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *      "Result": "Success",
 *      "Message": "Email 중복체크 처리 완료",
 *     }
 *
 * @apiError EmailAlreadyExists 이미 사용중인 이메일
 *
 * @apiErrorExample {json} EmailAlreadyExists-Response:
 *     HTTP/1.1 400 Conflict
 *     {
 *       "Result": "Fail",
 *       "Error": "EmailAlreadyExists",
 *       "Message": "이메일이 이미 사용중"
 *     }
 */
