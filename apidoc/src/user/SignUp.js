/**
 * @api {post} /Users/SignUp 3-1.회원가입
 * @apiName SingUp
 * @apiGroup Users
 *
 * @apiHeader {String} user_Email 사용자 이메일
 * @apiHeader {String} user_Passwd 사용자 비밀번호
 * @apiHeader {String} user_Name 사용자 이름
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
*           "signup_result": "success",
 *     }
 *
 * @apiError EmailAlreadyExists 이메일이 이미 사용 중
 *
 * @apiErrorExample {json} EmailAlreadyExists-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "이미 사용 중인 이메일입니다."
 *     }
 */